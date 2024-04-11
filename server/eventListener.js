const hre = require("hardhat")
// defaults to localhost:8545 if no value provided
const localProvider = new hre.ethers.providers.JsonRpcProvider()
const { vars } = require("hardhat/config");
const INFURA_API_KEY = vars.get("INFURA_API_KEY")
const sepoliaProvider = new hre.ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`)
const localContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const sepoliaContractAddress = "0x08810ED231bca4241fd757291F7Ecf2f02C0c8bF"




const getABI = async () => {
    const artifact = await hre.artifacts.readArtifact("Events")
    //console.log(artifact.abi)
    return artifact.abi
}

const listen = async () => {
    const ABI = await getABI()
    //console.log(provider)
    const localContract = new hre.ethers.Contract(localContractAddress, ABI, localProvider)
    const sepoliaContract = new hre.ethers.Contract(sepoliaContractAddress, ABI, sepoliaProvider)

    
    localContract.on("Deposit", async (user, etherAmount) => {
        console.log(`--- 📟 Event Emitted! 📟 ---`)
        console.log(`--- Local ---`)
        console.log(`User: ${user}`)
        const etherAmountFormated = await hre.ethers.utils.formatEther(etherAmount)
        console.log(`Ether Amount: ${etherAmountFormated}`)
        console.log(`Time: ${new Date().toISOString()}`)
        console.log(`--------------------------`)
    })
    sepoliaContract.on("Deposit", async (user, etherAmount) => {
        console.log(`--- 📟 Event Emitted! 📟 ---`)
        console.log(`--- Sepolia ---`)
        console.log(`User: ${user}`)
        const etherAmountFormated = await hre.ethers.utils.formatEther(etherAmount)
        console.log(`Ether Amount: ${etherAmountFormated}`)
        console.log(`Time: ${new Date().toISOString()}`)
        console.log(`--------------------------`)
    })
    
    
}
listen()

