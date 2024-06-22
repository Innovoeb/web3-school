const hre = require("hardhat")
const { vars } = require("hardhat/config")
const { DB } = require("../data/db.js")
const { Provider } = require("../utils/providers.js") 
const { getABI } = require("../utils/artifacts.js")
const { VRF_Mock } = require("./logic/vrfMock.js")




//const sepoliaContractAddress = "0x08810ED231bca4241fd757291F7Ecf2f02C0c8bF"


module.exports.EventListener = {
    VRF_Mock: {
        SubscriptionCreated: async () => {
            try {
                if (await DB.contractExists("VRFCoordinatorV2_5Mock", "local")) {
                    let provider = Provider.local

                    const contract = await VRF_Mock.coordinator()
                    // returns the block number (or height) of the most recently mined block
                    const startBlockNumber = await provider.getBlockNumber()

                    contract.on("SubscriptionCreated", async (subscriptionID, sender, blockNumber) => {
                        // only listen for new events
                        if (blockNumber <= startBlockNumber) {
                            return
                        } else {
                            let SubscriptionCreated = {
                                type: "event",
                                contractName: "VRFCoordinatorV2_5Mock",
                                eventName: "SubscriptionCreated",
                                contractAddress: await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"),
                                network: "local",
                                subscriptionID: hre.ethers.BigNumber.from(subscriptionID).toString(),
                                sender: sender,
                                time: new Date().toISOString()
                            }
                            // POST to db.json here!
                            await DB.postLocal("http://localhost:3001/local", SubscriptionCreated)
                        }
                    })
                }

            } catch (error) {
                console.log(error)
            }

        },
        SubscriptionFunded: async () => {
            try {
                if (await DB.contractExists("VRFCoordinatorV2_5Mock", "local")) {
                    let provider = Provider.local

                    const contract = await VRF_Mock.coordinator()
                    // returns the block number (or height) of the most recently mined block
                    const startBlockNumber = await provider.getBlockNumber()

                    contract.on("SubscriptionFunded", async (subId, oldBalance, newBalance, blockNumber) => {
                        // only listen for new events
                        if (blockNumber <= startBlockNumber) {
                            return
                        } else {
                            let bigOldBalance = await hre.ethers.BigNumber.from(oldBalance)
                            let bigNewBalance = await hre.ethers.BigNumber.from(newBalance)

                            let SubscriptionFunded = {
                                type: "event",
                                contractName: "VRFCoordinatorV2_5Mock",
                                eventName: "SubscriptionFunded",
                                contractAddress: await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"),
                                network: "local",
                                subscriptionID: await hre.ethers.BigNumber.from(subId).toString(),
                                oldBalance: `${await hre.ethers.utils.formatEther(bigOldBalance)} LINK`,
                                newBalance: `${await hre.ethers.utils.formatEther(bigNewBalance)} LINK`,
                                time: new Date().toISOString()
                            }
                            // POST to db.json here!
                            DB.postLocal("http://localhost:3001/local", SubscriptionFunded)
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        SubscriptionConsumerAdded: async () => {
            try {
                if (await DB.contractExists("VRFCoordinatorV2_5Mock", "local")) {
                    let provider = Provider.local

                    const contract = await VRF_Mock.coordinator()
                    // returns the block number (or height) of the most recently mined block
                    const startBlockNumber = await provider.getBlockNumber()

                    contract.on("SubscriptionConsumerAdded", async (subId, consumer, blockNumber) => {
                        // only listen for new events
                        if (blockNumber <= startBlockNumber) {
                            return
                        } else {
                            let SubscriptionConsumerAdded = {
                                type: "event",
                                contractName: "VRFCoordinatorV2_5Mock",
                                eventName: "SubscriptionConsumerAdded",
                                contractAddress: await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"),
                                network: "local",
                                subscriptionID: await hre.ethers.BigNumber.from(subId).toString(),
                                consumer: consumer,
                                time: new Date().toISOString()
                            }
                            // POST to db.json here!
                            await DB.postLocal("http://localhost:3001/local", SubscriptionConsumerAdded)
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
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
















