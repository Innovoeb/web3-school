const { task } = require("hardhat/config");
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
      gas: 6000000
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEV_WALLET],
      gas: 6000000
    }
  }
};

////////// TASKS //////////

const functionsRouterAddress = '0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C';  
const subscriptionId = 1418;

task("getFunctionsSubscription", "Get the details of a Chainlink Functions subscription")
.setAction(async (taskArgs, hre) => {
  const result = await hre.chainlink.functions.getSubscriptionDetails(functionsRouterAddress, subscriptionId)
  console.log(result)
})

const vrfCoordinator = '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625' // hardcoded sepolia VRF coordinator address
const vrfSubscriptionId = 10730;

task('getVRFSubscription', 'Get the details of a Chainlink VRF subscription')
.setAction(async (taskArgs, hre) => {
  const result = await hre.chainlink.vrf.getSubscriptionDetails(vrfCoordinator, vrfSubscriptionId)
  console.log(result)
})




