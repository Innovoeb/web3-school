const hre = require("hardhat")
const { DB } = require("./data/db.js")
const localEventsAddress = DB.getContract("Events", "local")



//const sepoliaContractAddress = "0x08810ED231bca4241fd757291F7Ecf2f02C0c8bF"





// listen for the Deposit events on the Events contract

module.exports.EventListener = {
    listen: async () => {
        const ABI = await getABI()
        const provider = new hre.ethers.providers.JsonRpcProvider()
        const localContract = new hre.ethers.Contract(await localEventsAddress, ABI, provider)
        //const sepoliaContract = new hre.ethers.Contract(sepoliaContractAddress, ABI, sepoliaProvider)
        const startBlockNumber = await provider.getBlockNumber()
    
        try {
            localContract.on("Deposit", async (user, depositAmount, newBalance, blockNumber) => {
                if (blockNumber <= startBlockNumber) {
                    return
                } else {
                    let Deposit = {
                        type: "event",
                        contractName: "Events",
                        contractAddress: `${await localEventsAddress}`,
                        network: "local",
                        user: user,
                        depositAmount: `${await hre.ethers.utils.formatEther(depositAmount)} ETH`,
                        newBalance: `${await hre.ethers.utils.formatEther(newBalance)} ETH`,
                        time: new Date().toISOString()
                    }
                    // POST to db.json here!
                    DB.postLocal("http://localhost:3001/local", Deposit)
                }
            })
        } catch (error) {
            console.log(error)
        }
        
        // sepoliaContract.on("Deposit", async (user, etherAmount) => {
        //     console.log(`--- 📟 Event Emitted! 📟 ---`)
        //     console.log(`--- Sepolia ---`)
        //     console.log(`User: ${user}`)
        //     const etherAmountFormated = await hre.ethers.utils.formatEther(etherAmount)
        //     console.log(`Ether Amount: ${etherAmountFormated}`)
        //     console.log(`Time: ${new Date().toISOString()}`)
        //     console.log(`--------------------------`)
        // }) 
    }
}

const getABI = async () => {
    const artifact = await hre.artifacts.readArtifact("Events")
    return artifact.abi
}














