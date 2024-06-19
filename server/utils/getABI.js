const hre = require("hardhat")

// returns ABI array
module.exports.getABI = async (contractName) => {
    const artifact = await hre.artifacts.readArtifact(contractName)
    return artifact.abi
}
