const hre = require("hardhat")
const { vars } = require("hardhat/config")


const Provider = {
    local: new hre.ethers.providers.JsonRpcProvider(),
    sepolia: new hre.ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`),
    polygon_amoy: new hre.ethers.providers.JsonRpcProvider(`https://polygon-amoy.infura.io/v3/${vars.get("INFURA_API_KEY")}`),
    arbitrum_sepolia: new hre.ethers.providers.JsonRpcProvider(`https://arbitrum-sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`)
}

module.exports.Wallet = {
    sepolia: new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.sepolia),
    polygon_amoy: new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.polygon_amoy),
    arbitrum_sepolia: new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.arbitrum_sepolia)
}
