const express = require("express")
const port = 3000
const app = express()
const { deployContract } = require("../utils/deployContract")
const { DB } = require("../data/db")
const { EventListener } = require("./eventListener")


app.use(express.json())
app.use(require('cors')())
app.use(require("./routes/vrf-mock"))


app.post("/deployments", async (req, res) => {
    let loggedError
    let loggedOutput
    let response
    let contractAddress
    let transactionHash

    try {
        if (await DB.contractExists(req.body.contractName, req.body.network) ) {
            res.status(400).json({
                "message": `Contract Already Exists on ${req.body.network} Network!`
            })
        } else {
            response = await deployContract(req.body.contractName, req.body.network, req.body.params)
            contractAddress = response.contractAddress
            transactionHash = response.transactionHash
        
            if (req.body.network === "local") {
                res.status(200).json({
                    "contractAddress": contractAddress,
                    "tx": transactionHash
                })
            } else if (req.body.network === "sepolia") {
                res.status(200).json({
                    "contractAddress": `https://sepolia.etherscan.io/address/${contractAddress}`,
                    "tx": `https://sepolia.etherscan.io/tx/${transactionHash}`
                })
            } else if (req.body.network === "polygon_amoy") {
                res.status(200).json({
                    "contractAddress": `https://amoy.polygonscan.com/address/${contractAddress}`,
                    "tx": `https://amoy.polygonscan.com/tx/${transactionHash}`
                })
            } else if (req.body.network === "arbitrum_sepolia") {
                res.status(200).json({
                    "contractAddress": `https://sepolia.arbiscan.io/address/${contractAddress}`,
                    "tx": `https://sepolia.arbiscan.io/tx/${transactionHash}`
                })
            }} 
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": loggedError
        })
    }
})


app.listen(port, async () => {
    console.log(`Server Initiated On Port ${port}`)
    console.log(`Worker PID: ${process.pid}`)
    //EventListener.Events()
    //EventListener.listenNativeTransactions()
})

