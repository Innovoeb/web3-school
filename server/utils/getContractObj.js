const hre = require("hardhat")
const { DB } = require("../../data/db")
const { Artifacts } = require("./artifacts")
const { Wallet } = require("./wallets")

// should be used for writing to the chain (signer)
module.exports.getContractObj = async (contractName, network) => {
    // if network...
    switch (network) {
        // === "local"
        case "local":
            return new hre.ethers.Contract(
                await DB.getContractAddress(contractName, network),
                await Artifacts.getABI(contractName), 
                Wallet.local
            )
        case "sepolia":
            return new hre.ethers.Contract(
                await DB.getContractAddress(contractName, network),
                await Artifacts.getABI(contractName), 
                Wallet.sepolia
            )
        case "polygon_amoy":
            return new hre.ethers.Contract(
                await DB.getContractAddress(contractName, network),
                await Artifacts.getABI(contractName), 
                Wallet.polygon_amoy
            )
        case "arbitrum_sepolia":
            return new hre.ethers.Contract(
                await DB.getContractAddress(contractName, network),
                await Artifacts.getABI(contractName), 
                Wallet.arbitrum_sepolia
            )
    }
}