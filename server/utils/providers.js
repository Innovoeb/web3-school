const hre = require("hardhat")
const { vars } = require("hardhat/config")



module.exports.Provider = {
    local: new hre.ethers.JsonRpcProvider(`http://localhost:8545`),
    sepolia: new hre.ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`),
    polygon_amoy: new hre.ethers.JsonRpcProvider(`https://polygon-amoy.infura.io/v3/${vars.get("INFURA_API_KEY")}`),
    arbitrum_sepolia: new hre.ethers.JsonRpcProvider(`https://arbitrum-sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`)
}