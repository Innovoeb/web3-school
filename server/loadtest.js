
const express = require("express")
const hre = require("hardhat")
const { exec } = require('child_process')
const port = 3000
const app = express()
const { vars } = require("hardhat/config");
const INFURA_API_KEY = vars.get("INFURA_API_KEY")
const localContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const localProvider = new hre.ethers.providers.JsonRpcProvider()
const sepoliaContractAddress = "0x08810ED231bca4241fd757291F7Ecf2f02C0c8bF"
const sepoliaProvider = new hre.ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`)
let ABI = []
let localContract = {}
let sepoliaContract = {}
let arr = []


// simulating a CPU intensive task
app.get("/heavy", (req, res) => {
    let total = 0
    for (let i = 0; i < 50_000_000; i++) {
        total++
    }
    res.send(`The result of the CPU intensive task is ${total}\n`)
    console.log("Endpoint was hit!")
})

app.get("/deposit", (req, res) => {
    res.send("Deposit event emitted!\n")

    exec(`npx hardhat run deposit.js --network localhost`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing deployment:', error)
            return
        } else {
            console.log(stdout)
        }
    })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`worker pid=${process.pid}`)
    //depositEvent()
    //listener()
    foobar()

    
})



////////////////////
const getABI = async () => {
    const artifact = await hre.artifacts.readArtifact("Events")
    return artifact.abi
}

const foobar = async () => {
    ABI = await getABI()
    localContract = new hre.ethers.Contract(localContractAddress, ABI, localProvider)
    sepoliaContract = new hre.ethers.Contract(sepoliaContractAddress, ABI, sepoliaProvider)
    //console.log(localContract)

    localContract.on("Deposit", (user, etherAmount) => {
        console.log(`--- 📟 Event Emitted! 📟 ---`)
        console.log(`--- Local ---`)
        console.log(`User: ${user}`)
        const etherAmountFormated = hre.ethers.utils.formatEther(etherAmount)
        console.log(`Ether Amount: ${etherAmountFormated}`)
        console.log(`Time: ${new Date().toISOString()}`)
        console.log(`--------------------------`)
        arr.push({
            user: user,
            etherAmount: etherAmountFormated,
            time: new Date().toISOString()
        })
        console.log(arr)
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
