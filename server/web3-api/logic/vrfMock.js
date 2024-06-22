const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { getABI } = require("../../utils/artifacts")
const { DB } = require("../../data/db")




module.exports.VRF_Mock = {
    // mock coordinator Contract obj
    coordinator: async () => {
        return new hre.ethers.Contract(
            await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"),
            await getABI("VRFCoordinatorV2_5Mock"), 
            Wallet.local
        )
    },
    deployCoordinator: async (contractName, network, params) => {
        let signer, contractFactory, response

        const artifacts = await hre.artifacts.readArtifact(contractName)
        const provider = new hre.ethers.providers.JsonRpcProvider()
        signer = provider.getSigner()

        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, signer)
        let contract = await contractFactory.deploy(hre.ethers.BigNumber.from("100000000000000000"), params[1], params[2])
        response = await contract.deployTransaction.wait()
        DB.postLocal("http://localhost:3001/local", responseOBJ(contractName, response, network))
        return response
    },
    createSubscription: async (address) => {
        try {
            return (await (await this.VRF_Mock.coordinator()).createSubscription()).hash
        } catch (error) {
            console.error(error)
        }
    },
    // returns array of subscription ids
    getActiveSubscriptionIds: async () => {
        try {
            return await (await this.VRF_Mock.coordinator()).getActiveSubscriptionIds(0, 25)
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
    },
    deployPickOne: async (contractName, network, params) => {
        let signer, contractFactory, response

        const artifacts = await hre.artifacts.readArtifact(contractName)
        const provider = new hre.ethers.providers.JsonRpcProvider()
        signer = provider.getSigner()

        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, signer)
        let contract = await contractFactory.deploy(params[0], params[1], params[2]) // TODO: add params
        response = await contract.deployTransaction.wait()
        DB.postLocal("http://localhost:3001/local", responseOBJ(contractName, response, network))
        return response
    },
    addConsumer: async (subId, consumerAddress) => {
        try {
            return (await (await this.VRF_Mock.coordinator()).addConsumer(subId, consumerAddress)).hash
        } catch (error) {
            console.error(error)
        }
    },
    deployPolicyBank: async (contractName, network, params) => {
        let signer, contractFactory, response

        const artifacts = await hre.artifacts.readArtifact(contractName)
        const provider = new hre.ethers.providers.JsonRpcProvider()
        signer = provider.getSigner()

        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, signer)
        let contract = await contractFactory.deploy(params[0]) 
        response = await contract.deployTransaction.wait()
        await DB.postLocal("http://localhost:3001/local", responseOBJ(contractName, response, network))
        return response
    }
}


const responseOBJ = (contractName, response, network) => {
    return {
        type: "contract-deployment",
        contractName: contractName,
        contractAddress: `${response.contractAddress}`,
        tx: `${response.transactionHash}`,
        network: network,
        time: new Date().toISOString()
    }
}
