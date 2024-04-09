const { task } = require("hardhat/config")
const functionsRouterAddress = '0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C';  
const subscriptionId = 1418;

task("testFunctionsSub", "Get the details of my testnet Chainlink Functions subscription")
.setAction(async (taskArgs, hre) => {
  const result = await hre.chainlink.functions.getSubscriptionDetails(functionsRouterAddress, subscriptionId)
  console.log(result)
})