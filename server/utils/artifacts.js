const hre = require("hardhat")


// returns ABI array
module.exports.Artifacts = {
    getABI: async (contractName) => {
        const artifact = await hre.artifacts.readArtifact(contractName)
        return artifact.abi
    },
    getBytecode: async (contractName) => {
        const artifact = await hre.artifacts.readArtifact(contractName)
        return artifact.bytecode
    }
} 