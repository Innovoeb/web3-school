require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/hardhat-chainlink");
const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const DEV_WALLET = vars.get("DEV_WALLET");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.25",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEV_WALLET],
    },
  }
};
