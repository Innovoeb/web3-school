const hre = require("hardhat")
const { Wallet } = require("./wallets")
const { DB } = require("../data/db")


module.exports.deployContract = async (contractName, network) => {
    let signer
    let contractFactory
    let response
    const artifacts = await hre.artifacts.readArtifact(contractName)


    if (network === "local") {
        const provider = new hre.ethers.providers.JsonRpcProvider()
        signer = provider.getSigner()
        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, signer)

        response = await deploymentResponse(contractFactory)
        DB.postLocal("http://localhost:3001/local", responseOBJ(contractName, response, network))
    } else if (network === "sepolia") {
        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, Wallet.sepolia)
        
        response = await deploymentResponse(contractFactory)
        //DB.postTestnet("http://localhost:3001/testnet-deployments", responseOBJ(contractName, response, network))
    } else if (network === "polygon_amoy") {
        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, Wallet.polygon_amoy)
        
        response = await deploymentResponse(contractFactory)
        //DB.postTestnet("http://localhost:3001/testnet-deployments", responseOBJ(contractName, response, network))
    } else if (network === "arbitrum_sepolia") {
        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, Wallet.arbitrum_sepolia)
        
        response = await deploymentResponse(contractFactory)
        //DB.postTestnet("http://localhost:3001/testnet-deployments", responseOBJ(contractName, response, network))
    }
    
    return response
}

const deploymentResponse = async (contractFactory) => {
    const contract = await contractFactory.deploy()
    const response = await contract.deployTransaction.wait()
    return response
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
