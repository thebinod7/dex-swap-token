import { ethers } from "ethers";
import CustomDexABI from "./CustomDex.json";
import CustomTokenABI from "./CustomToken.json";

export const tokenContract = async (contractAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;

    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(contractAddress, CustomTokenABI.abi, signer);
        return contractReader;
    }
};

export const dexContract = async (contractAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;

    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(contractAddress, CustomDexABI.abi, signer);
        return contractReader;
    }
};
