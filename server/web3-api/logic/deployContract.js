const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { DB } = require("../../../data/db")
const { Artifacts } = require("../../utils/artifacts")


module.exports.deployContract = async (contractName, network, params) => {
    let contractFactory, response

    if (network === "local") {
        contractFactory = new hre.ethers.ContractFactory(
            await Artifacts.getABI(contractName), 
            await Artifacts.getBytecode(contractName), 
            Wallet.local
        )
        response = await deploy(contractFactory, params)
        DB.post("http://localhost:3001/local-deployments", {
            contractName: contractName,
            contractAddress: response.contractAddress,
            tx: response.hash,
            time: new Date().toISOString()
        })
    } else if (network === "sepolia") {
        contractFactory = new hre.ethers.ContractFactory(
            await Artifacts.getABI(contractName), 
            await Artifacts.getBytecode(contractName), 
            Wallet.sepolia
        )
        response = await deploy(contractFactory, params)
        DB.post("http://localhost:3001/testnet-deployments", {
            contractName: contractName,
            contractAddress: response.contractAddress,
            tx: response.hash,
            network: network,
            time: new Date().toISOString()
        })
    } else if (network === "polygon_amoy") {
        contractFactory = new hre.ethers.ContractFactory(
            await Artifacts.getABI(contractName), 
            await Artifacts.getBytecode(contractName), 
            Wallet.polygon_amoy
        )
        response = await deploy(contractFactory, params)
        DB.post("http://localhost:3001/testnet-deployments", {
            contractName: contractName,
            contractAddress: response.contractAddress,
            tx: response.hash,
            network: network,
            time: new Date().toISOString()
        })
    } else if (network === "arbitrum_sepolia") {
        contractFactory = new hre.ethers.ContractFactory(
            await Artifacts.getABI(contractName),
            await Artifacts.getBytecode(contractName), 
            Wallet.arbitrum_sepolia
        )
        response = await deploy(contractFactory)
        DB.post("http://localhost:3001/testnet-deployments", {
            contractName: contractName,
            contractAddress: response.contractAddress,
            tx: response.hash,
            network: network,
            time: new Date().toISOString()
        })
    }
    return response
}

// handle contract constructor params during deployment
const deploy = async (contractFactory, params) => {
    if (params.length == 0) {
        const contract = await contractFactory.deploy()
        const response = await contract.deploymentTransaction().wait(1)
        return response
    } else if (params.length == 1) {
        const contract = await contractFactory.deploy(params[0])
        const response = await contract.deploymentTransaction().wait(1)
        return response
    } else if (params.length == 2) {
        const contract = await contractFactory.deploy(params[0], params[1])
        const response = await contract.deploymentTransaction().wait(1)
        return response
    } else if (params.length == 3) {
        const contract = await contractFactory.deploy(params[0], params[1], params[2])
        const response = await contract.deploymentTransaction().wait(1)
        return response
    }
}



