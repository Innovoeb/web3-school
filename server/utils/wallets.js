const hre = require("hardhat")
const { vars } = require("hardhat/config")
const { Provider } = require("./provider.js")




module.exports.Wallet = {
    local: new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", Provider.local),
    sepolia: new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.sepolia),
    polygon_amoy: new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.polygon_amoy),
    arbitrum_sepolia: new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.arbitrum_sepolia)
}
