const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { DB } = require("../../../data/db")




module.exports.deployContract = async (contractName, network, params) => {
    let response

    switch (network) {
        case "local":
            response = await handleParamLength(
                await hre.ethers.getContractFactory(contractName, Wallet.local),
                params
            )
            DB.post("http://localhost:3001/local-deployments", {
                contractName: contractName,
                contractAddress: response.contractAddress,
                tx: response.hash,
                time: new Date().toISOString()
            })
            return response
        case "sepolia":
            response = await handleParamLength(
                await hre.ethers.getContractFactory(contractName, Wallet.local),
                params
            )
            DB.post("http://localhost:3001/testnet-deployments", {
                contractName: contractName,
                network: network,
                contractAddress: `https://sepolia.etherscan.io/address/${response.contractAddress}`,
                tx: `https://sepolia.etherscan.io/tx/${response.hash}`,
                time: new Date().toISOString()
            })
            return response
        case "polygon_amoy":
            response = await handleParamLength(
                await hre.ethers.getContractFactory(contractName, Wallet.local),
                params
            )
            DB.post("http://localhost:3001/testnet-deployments", {
                contractName: contractName,
                network: network,
                contractAddress: `https://amoy.polygonscan.com/address/${response.contractAddress}`,
                tx: `https://amoy.polygonscan.com/tx/${response.hash}`,
                time: new Date().toISOString()
            })
            return response
        case "arbitrum_sepolia":
            response = await handleParamLength(
                await hre.ethers.getContractFactory(contractName, Wallet.local),
                params
            )
            DB.post("http://localhost:3001/testnet-deployments", {
                contractName: contractName,
                network: network,
                contractAddress: `https://sepolia.arbiscan.io/address/${response.contractAddress}`,
                tx: `https://sepolia.arbiscan.io/tx/${response.hash}`,
                time: new Date().toISOString()
            })
            return response
    }
}

// handle contract constructor params then deploy
const handleParamLength = async (contractFactory, params) => {
    let contract

    switch (params.length) {
        case 0:
            contract = await contractFactory.deploy()
            return await contract.deploymentTransaction().wait(1)
        case 1:
            contract = await contractFactory.deploy(params[0])
            return await contract.deploymentTransaction().wait(1)
        case 2:
            contract = await contractFactory.deploy(params[0], params[1])
            return await contract.deploymentTransaction().wait(1)
        case 3:
            contract = await contractFactory.deploy(params[0], params[1], params[2])
            return await contract.deploymentTransaction().wait(1)

    }
}



