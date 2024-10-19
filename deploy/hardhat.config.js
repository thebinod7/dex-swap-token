require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const NEXT_PUBLIC_HOLESKY_RPC_URL = "https://rpc.ankr.com/eth_holesky";
const NEXT_PUBLIC_PRIVATE_KEY = "";
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
