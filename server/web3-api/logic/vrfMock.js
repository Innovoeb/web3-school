const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { Provider } = require("../../utils/providers")
const { Artifacts } = require("../../utils/artifacts")
const { DB } = require("../../../data/db")
const { getContractObj } = require("../../utils/getContractObj")


module.exports.VRF_Mock = {
    deployCoordinator: async (contractName, params) => {
        let contractFactory, response

        contractFactory = new hre.ethers.ContractFactory(
            await Artifacts.getABI(contractName), 
            await Artifacts.getBytecode(contractName), 
            Wallet.local
        )
        let contract = await contractFactory.deploy(params[0], params[1], params[2])
        response = await contract.deploymentTransaction().wait(1)
        DB.post("http://localhost:3001/local-deployments", {
            "contractName": contractName,
            "contractAddress": response.contractAddress,
            "tx": response.hash,
            "time": new Date().toISOString()
        })
        return response
    },
    createSubscription: async () => {
        try {
            return (await (await getContractObj("VRFCoordinatorV2_5Mock", "local")).createSubscription()).hash
        } catch (error) {
            console.error(error)
        }
    },
    // returns array of subscription ids
    getActiveSubscriptionIds: async () => {
        try {
            return await (await getContractObj("VRFCoordinatorV2_5Mock", "local")).getActiveSubscriptionIds(0, 50)
        } catch (error) {
            console.error(error)
        }
    },
    fundSubscription: async (subId, linkAmount) => {
        try {
            return (await (await getContractObj("VRFCoordinatorV2_5Mock", "local")).fundSubscription(subId, linkAmount)).hash
        } catch (error) {
            console.error(error)
        }
    },
    getSubscription: async (subId) => {
        try {
            // should return an obj
            let response = await (await getContractObj("VRFCoordinatorV2_5Mock", "local")).getSubscription(subId)
            return {
                "balance": `${hre.ethers.formatEther(response.balance)} LINK`,
                "nativeBalance": `${hre.ethers.formatEther(response.nativeBalance)} HardhatETH`,
                "reqCount": hre.ethers.toNumber(response.reqCount),
                "subOwner": response.subOwner,
                "consumers": response.consumers
            }
        } catch (error) {
            console.error(error)
        }
    },
    addConsumer: async (subId, consumerAddress) => {
        try {
            return (await (await getContractObj("VRFCoordinatorV2_5Mock", "local")).addConsumer(subId, consumerAddress)).hash
        } catch (error) {
            console.error(error)
        }
    },
}


