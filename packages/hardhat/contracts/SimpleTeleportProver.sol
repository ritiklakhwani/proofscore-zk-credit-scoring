// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Prover} from "vlayer-0.1.0/Prover.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";

struct Erc20Token {
    address addr;
    uint256 chainId;
    uint256 blockNumber;
}

contract SimpleTeleportProver is Prover {
    Erc20Token[] public tokens;

    //USDC chain name
    // chain ID
    // 1 month block number
    constructor() {
        tokens.push(
            Erc20Token(
                0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238,
                11155111,
                6942926
            )
        ); // eth sepolia
        tokens.push(
            Erc20Token(
                0x036CbD53842c5426634e7929541eC2318f3dCF7e,
                84532,
                16712331
            )
        ); // base sepolia
        tokens.push(
            Erc20Token(
                0x5e65b6B04fbA51D95409712978Cb91E99d93aE73,
                545,
                71078531
            )
        ); // flow testnet
        tokens.push(
            Erc20Token(
                0x8d48ba6D6ABD283E672B917cdfBd6222DD1b80dB,
                59141,
                4622912
            )
        ); // linea sepolia
        tokens.push(
            Erc20Token(
                0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85,
                48899,
                11307513
            )
        ); // zircuit testnet
        tokens.push(
            Erc20Token(
                0xfe7f4BF8f35B63DD129c7827B7c3f7D9885567D3,
                25925,
                21478302
            )
        ); // bitkub testnet
    }

    function crossChainBalanceOf(
        address _owner
    ) public returns (Proof memory, address, uint256) {
        uint256 balance = 0;

        for (uint256 i = 0; i < tokens.length; i++) {
            setChain(tokens[i].chainId, tokens[i].blockNumber);
            balance += IERC20(tokens[i].addr).balanceOf(_owner);
        }

        return (proof(), _owner, balance);
    }
}
