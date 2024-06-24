const hre = require('hardhat')
const { Wallet } = require('./wallets')
const { Artifacts } = require('./artifacts')

module.exports.getContractFactory = async (contractName, network) => {
    switch (network) {
        case "local":
            return new hre.ethers.ContractFactory(
                await Artifacts.getABI(contractName), 
                await Artifacts.getBytecode(contractName), 
                Wallet.local
            )
        case "sepolia":
            return new hre.ethers.ContractFactory(
                await Artifacts.getABI(contractName), 
                await Artifacts.getBytecode(contractName), 
                Wallet.sepolia
            )
        case "polygon_amoy":
            return new hre.ethers.ContractFactory(
                await Artifacts.getABI(contractName), 
                await Artifacts.getBytecode(contractName), 
                Wallet.polygon_amoy
            )
        case "arbitrum_sepolia":
            return new hre.ethers.ContractFactory(
                await Artifacts.getABI(contractName), 
                await Artifacts.getBytecode(contractName), 
                Wallet.arbitrum_sepolia
            )
    }
}