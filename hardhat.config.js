
require("@nomicfoundation/hardhat-toolbox")
//require("@chainlink/hardhat-chainlink")
//require('./scripts/chainlink-vrf/getVRFSubscription.js')
//require('./scripts/chainlink-vrf/drawNumbers.js')
//require('./scripts/chainlink-functions/getFunctionsSubscription.js')
const INFURA_API_KEY = vars.get("INFURA_API_KEY")
const DEV_WALLET = vars.get("DEV_WALLET")




/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.6"
      },
      {
        version: "0.8.7"
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.24"
      },
      {
        version: "0.8.25"
      },
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337 // We set 1337 to make interacting with MetaMask simpler
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEV_WALLET],
      gas: 6000000
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEV_WALLET],
      gas: 6000000
    }
  }
};











