const express = require("express")
const port = 3000
const app = express()
const { deployContract } = require("./logic/deployContract")
const { DB } = require("../../data/db")
const { EventListener } = require("./eventListener")


app.use(express.json())
app.use(require('cors')())
app.use(require("./routes/vrf-mock"))


app.post("/deployments", async (req, res) => {
    let loggedError, loggedOutput, response
    
    try {
        if (await DB.contractExists(req.body.contractName, req.body.network) ) {
            res.status(400).json({
                "message": `Contract Already Exists on ${req.body.network} Network!`
            })
        } else {
            response = await deployContract(req.body.contractName, req.body.network, req.body.params)

            if (response == undefined) {
                res.status(500).json({
                    "error": "Dun Goofed, Check Logs!"
                })
            }
        
            if (response !== undefined && req.body.network === "local") {
                res.status(200).json({
                    "contractAddress": response.contractAddress,
                    "tx": response.hash
                })
            } else if (response !== undefined && req.body.network === "sepolia") {
                res.status(200).json({
                    "contractAddress": `https://sepolia.etherscan.io/address/${response.contractAddress}`,
                    "tx": `https://sepolia.etherscan.io/tx/${response.hash}`
                })
            } else if (response !== undefined && req.body.network === "polygon_amoy") {
                res.status(200).json({
                    "contractAddress": `https://amoy.polygonscan.com/address/${response.contractAddress}`,
                    "tx": `https://amoy.polygonscan.com/tx/${response.hash}`
                })
            } else if (response !== undefined && req.body.network === "arbitrum_sepolia") {
                res.status(200).json({
                    "contractAddress": `https://sepolia.arbiscan.io/address/${contractAddress}`,
                    "tx": `https://sepolia.arbiscan.io/tx/${transactionHash}`
                })
            }}
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": "Error w/ API Request!"
        })
    }
})

app.delete("/local", async (req, res) => {
    let loggedError, loggedOutput

    try {
        switch (req.body.arrayName) {
            case "local-deployments":
                await DB.deleteLocal("http://localhost:3001/local-deployments")
                res.status(200).json({
                    "message": "Local Deployments Deleted From DB!"
                })
                break
            case "local-events":
                await DB.deleteLocal("http://localhost:3001/local-events")
                res.status(200).json({
                    "message": "Local Events Deleted From DB!"
                })
                break
            default:
                res.status(400).json({
                    "message": "Invalid Array Name!"
                })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": "Error w/ API Request!"
        })
    }
})


app.listen(port, async () => {
    console.log(`Server Initiated On Port ${port}`)
    console.log(`Worker PID: ${process.pid}`)
    //EventListener.Events()
    //EventListener.listenNativeTransactions()

    // BUILDING ONLY! uncomment only after vrf mock coordinator has been deployed
    EventListener.VRF_Mock.SubscriptionCreated()
    EventListener.VRF_Mock.SubscriptionFunded()
    EventListener.VRF_Mock.SubscriptionConsumerAdded()
})

