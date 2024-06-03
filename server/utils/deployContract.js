const hre = require("hardhat")
const { Wallet } = require("./wallets")


module.exports.deployContract = async (contractName, network) => {
    let signer
    let contractFactory
    const artifacts = await hre.artifacts.readArtifact(contractName)


    if (network === "local") {
        const provider = new hre.ethers.providers.JsonRpcProvider()
        signer = provider.getSigner()
        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, signer)
    } else {
        contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, Wallet.network)
    }
    const contract = await contractFactory.deploy()
    const response = await contract.deployTransaction.wait()
    
    return response

}
