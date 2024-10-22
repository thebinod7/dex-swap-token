import { BigNumber, ethers } from "ethers";
import { tokenContract, dexContract } from "./contract";
import { toEth, toWei } from "./utils";
import { CONTRACT_ADDRESS } from "../constants";

function parseErrorMsg(err) {
    const json = JSON.parse(JSON.stringify(err));
    return json?.reason || json?.error?.message || json?.message || "Unknown error";
}

export async function swapEthToToken(tokenName, amount) {
    try {
        const tx = { value: toWei(amount) };
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const data = await contractObj.swapEthToToken(tokenName, tx);
        const receipt = await data.wait();
        return receipt;
    } catch (err) {
        return parseErrorMsg(err);
    }
}

// Check if DexContract has allowance to spend token
export async function hasVallidAllowance(owner, tokenName, amount) {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const address = await contractObj.getTokenAddress(tokenName);

        const tokenContractObj = await tokenContract(address);
        const data = await tokenContractObj.allowance(owner, CONTRACT_ADDRESS);

        const result = BigNumber.from(data.toString()).gte(BigNumber.from(toWei(amount)));

        return result;
    } catch (err) {
        return parseErrorMsg(err);
    }
}

export async function swapTokenToEth(tokenName, amount) {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const data = await contractObj.swapTokenToEth(tokenName, toWei(amount));
        const receipt = await data.wait();
        return receipt;
    } catch (err) {
        return parseErrorMsg(err);
    }
}

export async function swapTokenToToken(tokenFrom, tokenTo, amount) {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const data = await contractObj.swapTokenToToken(tokenFrom, tokenTo, toWei(amount));
        const receipt = await data.wait();
        return receipt;
    } catch (err) {
        return parseErrorMsg(err);
    }
}

export async function getTokenBalance(tokenName, walletAddress) {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const data = await contractObj.getBalance(tokenName, walletAddress);
        return toEth(data);
    } catch (err) {
        return parseErrorMsg(err);
    }
}

export async function getTokenAddress(tokenName) {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const data = await contractObj.getTokenAddress(tokenName);
        return data;
    } catch (err) {
        return parseErrorMsg(err);
    }
}

export async function increaseAllowance(tokenName, amount) {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const address = await contractObj.getTokenAddress(tokenName);

        const tokenContractObj = await tokenContract(address);
        const data = await tokenContractObj.approve(CONTRACT_ADDRESS, toWei(amount));

        const receipt = await data.wait();
        return receipt;
    } catch (err) {
        return parseErrorMsg(err);
    }
}

export async function getAllHistory() {
    try {
        const contractObj = await dexContract(CONTRACT_ADDRESS);
        const data = await contractObj.getAllHistory();

        if (!data.length) return [];

        const historyTxn = data.map((txn) => {
            return {
                historyId: txn.historyId.toNumber(),
                tokenA: txn.tokenA,
                tokenB: txn.tokenB,
                inputValue: toEth(txn.inputValue),
                outputValue: toEth(txn.outputValue),
                userAddress: txn.userAddress,
            };
        });

        return historyTxn;
    } catch (err) {
        return parseErrorMsg(err);
    }
}
