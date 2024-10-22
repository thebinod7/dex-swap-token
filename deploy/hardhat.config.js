require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log("PRIVATE_KEY", PRIVATE_KEY);

const NEXT_PUBLIC_HOLESKY_RPC_URL = "https://rpc.ankr.com/eth_holesky";
const NEXT_PUBLIC_PRIVATE_KEY = PRIVATE_KEY;
module.exports = {
    solidity: "0.8.0",
    defaultNetwork: "holesky",
    networks: {
        hardhat: {},
        polygon_mumbai: {
            url: NEXT_PUBLIC_HOLESKY_RPC_URL,
            accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
        },
        holesky: {
            url: NEXT_PUBLIC_HOLESKY_RPC_URL,
            accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
        },
    },
};
