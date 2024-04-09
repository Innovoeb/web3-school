const { task } = require("hardhat/config")
const chalk = require('chalk')
const vrfCoordinatorAddress = '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625';
const subscriptionId = 10730;


task('testnet:drawNumbers', 'Draw numbers from VRF consumer contract')
.setAction(async (taskArgs, hre) => {
    const bool = await hre.chainlink.vrf.isPendingRequestExists(vrfCoordinatorAddress, subscriptionId)
    if (bool) {
        console.log(chalk.green(`✅ There is a pending request for subscription ID ${subscriptionId}! ✅`))
    } else {
        console.log(chalk.red(`❌ There is no pending request for subscription ID ${subscriptionId}! ❌`))
    }
})


