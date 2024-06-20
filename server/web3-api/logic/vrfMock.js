const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { getABI } = require("../../utils/getABI")
const { DB } = require("../../data/db")




module.exports.VRF_Mock = {
    createSubscription: async (address) => {
        try {
            let coordinator = await mockCoordinator(address)
            return (await coordinator.createSubscription()).hash
        } catch (error) {
            console.error(error)
        }
    },
    // returns array of subscription ids
    getActiveSubscriptionIds: async () => {
        try {
            let coordinator = await mockCoordinator(await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"))
            return await coordinator.getActiveSubscriptionIds(0, 25)
        } catch (error) {
            console.error(error)
        }
    },
    fundSubscription: async (subId, linkAmount) => {
        try {
            let coordinator = await mockCoordinator(await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"))
            //let x = hre.ethers.BigNumber.from(subId.toString())
            //let y = hre.ethers.BigNumber.from(linkAmount.toString())

            return (await coordinator.fundSubscription(subId, linkAmount)).hash
        } catch (error) {
            console.error(error)
        }
    },
    getSubscription: async (subId) => {

        try {
            let coordinator = await mockCoordinator(await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"))
            // should return an obj
            let response = await coordinator.getSubscription(subId)
            let responseObj = {
                balance: `${hre.ethers.utils.formatEther(response.balance)} LINK`,
                nativeBalance: `${hre.ethers.utils.formatEther(response.nativeBalance)} HardhatETH`,
                reqCount: hre.ethers.BigNumber.from(response.reqCount).toNumber(),
                subOwner: response.subOwner,
                consumers: response.consumers
            }
            return responseObj
        } catch (error) {
            console.error(error)
        }
    }
}


// mock coordinator Contract obj
const mockCoordinator = async (address) => {
    return new hre.ethers.Contract(
        address,
        await getABI("VRFCoordinatorV2_5Mock"), 
        Wallet.local
    )
}
