// app.js
import express from 'express';
import { config } from 'dotenv';
import { proofGenerate } from './prover-verifier.js';

config();
const app = express();
app.use(express.json());

app.get('/proof', async (req, res) => {
    const {
        walletAddress,
        chainID,
    } = req.body;
    try {
        const order = await proofGenerate(
            ZK[chainID]['config'], 
            ZK[chainID]['prover'], 
            ZK[chainID]['verifier'], 
            walletAddress
        );
        return res.json(order);
    } catch (error) {
        console.error('Bridge endpoint error:', error);
        return res.status(500).json({ error: error.message });
    }
});

const ZK = {
    // sepolia eth
    11155111: {
        'config': 1,
        'rpc': 'https://base-mainnet.g.alchemy.com/v2/9EsBGVXTmjcFNcMh2nSjdhFkFeNiY-IV',
        'prover': '0xb36b15a9d7ebf6cbbc5943218a75824f9453d581',
        'verifier': '0x54ec47075fce92a8c993f9b2005a9318b6915c54'
    },
    // base sepolia
    84532: {
        'config': 2,
        'rpc': 'https://base-sepolia.g.alchemy.com/v2/9EsBGVXTmjcFNcMh2nSjdhFkFeNiY-IV',
        'prover': '0x78858ab1ad13c0a5829e06f89a9706a9ba9a6791',
        'verifier': '0x8a2cf3f2c4e8476bc2964a81129b8201d8fa367b'
    },
    // flow testnet
    545: {
        'config': 3,
        'rpc': 'https://flow-testnet.g.alchemy.com/v2/9EsBGVXTmjcFNcMh2nSjdhFkFeNiY-IV',
        'prover': '0xD4492CaE400e2819AE9afEB7Ce83DB1eC0a4f504',
        'verifier': '0xD4492CaE400e2819AE9afEB7Ce83DB1eC0a4f504'
    },
    //zircuit
    48899: {
        'config': 4,
        'rpc': 'https://zircuit-testnet.drpc.org',
        'prover': '0xd4492cae400e2819ae9afeb7ce83db1ec0a4f504',
        'verifier': '0xd4492cae400e2819ae9afeb7ce83db1ec0a4f504'
    }
};


const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});