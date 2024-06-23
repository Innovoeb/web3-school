const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { Artifacts } = require("../../utils/artifacts")
const { DB } = require("../../../data/db")


module.exports.VRF_Mock = {
    // mock coordinator Contract obj
    coordinator: async () => {
        return new hre.ethers.Contract(
            await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"),
            await Artifacts.getABI("VRFCoordinatorV2_5Mock"), 
            Wallet.local
        )
    },
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
            return (await (await this.VRF_Mock.coordinator()).createSubscription()).hash
        } catch (error) {
            console.error(error)
        }
    },
    // returns array of subscription ids
    getActiveSubscriptionIds: async () => {
        try {
            return await (await this.VRF_Mock.coordinator()).getActiveSubscriptionIds(0, 50)
        } catch (error) {
            console.error(error)
        }
    },
    fundSubscription: async (subId, linkAmount) => {
        try {
            return (await (await this.VRF_Mock.coordinator()).fundSubscription(subId, linkAmount)).hash
        } catch (error) {
            console.error(error)
        }
    },
    getSubscription: async (subId) => {
        try {
            // should return an obj
            let response = await (await this.VRF_Mock.coordinator()).getSubscription(subId)
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
            return (await (await this.VRF_Mock.coordinator()).addConsumer(subId, consumerAddress)).hash
        } catch (error) {
            console.error(error)
        }
    },
}


