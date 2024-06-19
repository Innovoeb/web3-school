const hre = require("hardhat")
const { vars } = require("hardhat/config")
const { DB } = require("../data/db.js")
const { Provider } = require("../utils/providers.js") 
const { getABI } = require("../utils/getABI.js")




//const sepoliaContractAddress = "0x08810ED231bca4241fd757291F7Ecf2f02C0c8bF"





// listen for the Deposit events on the Events contract
module.exports.EventListener = {
    Events: async () => {
        try {
            if (await DB.contractExists("Events", "local")) {
                let address, abi, provider
                address = await DB.getContractAddress("Events", "local")
                abi = await getABI("Events")
                provider = Provider.local
                const contract = new hre.ethers.Contract(address, abi, provider)
                // returns the block number (or height) of the most recently mined block
                const startBlockNumber = await provider.getBlockNumber()

                contract.on("Deposit", async (user, depositAmount, newBalance, blockNumber) => {
                    // only listen for new events
                    if (blockNumber <= startBlockNumber) {
                        return
                    } else {
                        let Deposit = {
                            type: "event",
                            contractName: "Events",
                            contractAddress: `${await address}`,
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
            }
            
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
    },
    NativeTransactions: async () => {
        try {
            const filter = {
                topics: [
                    // from, to, amount
                    hre.ethers.utils.id("Transfer(address,address,uint256)"),
                    [
                        hre.ethers.utils.hexZeroPad(`${vars.get("DEV_WALLET")}`, 32)
                    ]
                ]
            }

            Provider.sepolia.on(filter, async (data) => {
                console.log(await data)
            
            })
        } catch (error) {
            console.log(error)
        }
    }
}
















