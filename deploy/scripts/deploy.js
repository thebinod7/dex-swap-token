const hre = require("hardhat");

async function main() {
    // Deploying the contract
    const CustomDex = await hre.ethers.getContractFactory("CustomDex");
    const contract = await CustomDex.deploy();
    await contract.deployed();
    console.log("CustomDex deployed to:", contract.address);
}

main().catch((error) => {
    console.error("DeployError=>", error);
    process.exitCode = 1;
});
