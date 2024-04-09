
const { task } = require("hardhat/config")
const vrfCoordinator = '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625' // hardcoded sepolia VRF coordinator address
const vrfSubscriptionId = 10730;


task('testnet:vrfSub', 'Get the details of my testnet Chainlink VRF subscription')
.setAction(async (taskArgs, hre) => {
  const result = await hre.chainlink.vrf.getSubscriptionDetails(vrfCoordinator, vrfSubscriptionId)
  console.log(result)
})