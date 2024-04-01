const hre = require("hardhat")
const functions = hre.chainlink.functions
const chalk = require('chalk');
const subscriptionId = 1418;
const callbackGasLimit = 30000;
const gasPriceWei = 1000000000;
// hardcoded for Polygon Mumbai
const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C"
const donId = "fun-polygon-mumbai-1";



const estimateFulfillment = async () => {
    const requestCost = await functions.estimateRequestCost(
        routerAddress, 
        donId, 
        subscriptionId, 
        callbackGasLimit, 
        gasPriceWei)

    console.log(
        // Use the ethers.utils.formatEther utility function to convert the output to LINK.
        `${chalk.green('Fulfillment cost estimated to')} ${chalk.green(hre.ethers.utils.formatEther(requestCost))} ${chalk.green('LINK')}`
    )
}
estimateFulfillment()







