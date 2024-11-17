import { createVlayerClient } from "@vlayer/sdk";
import { createContext } from "@vlayer/sdk/config";
import { abiProver, abiVerifier } from './abi.js';
import { createConfigForIndex } from './config-wrapper.js';

export async function proofGenerate(configIndex, prover, verifier, walletAddress) {
    const config = createConfigForIndex(configIndex);
    const { chain, ethClient, account, proverUrl, confirmations } = await createContext(config);
    const vlayer = createVlayerClient({
        url: proverUrl,
    });

    //proof
    console.log("-------GENERATING PROOF--------");
    const proofHash = await vlayer.prove({
        address: prover,
        proverAbi: abiProver,
        functionName: "crossChainBalanceOf",
        args: [account.address],
        chainId: chain.id,
    });
    const result = await vlayer.waitForProvingResult(proofHash);
    console.log("Proof:", result[0]);

    //verify
    console.log("-------VERIFY PROOF--------");

    const verificationHash = await ethClient.writeContract({
        address: verifier,
        abi: abiVerifier,
        functionName: "claim",
        args: result,
        account,
    });

    const receipt = await ethClient.waitForTransactionReceipt({
        hash: verificationHash,
        confirmations,
        retryCount: 60,
        retryDelay: 1000,
    });

    console.log(`Verification result: ${receipt.status}`);
    return receipt.status;

}