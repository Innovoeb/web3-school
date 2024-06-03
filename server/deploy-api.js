const express = require("express")
const port = 3000
const app = express()
const { deployContract } = require("./utils/deployContract")


app.use(express.json())
app.use(require('cors')())




app.post("/deploy", async (req, res) => {
    let loggedError
    let loggedOutput
    let response
    let contractAddress
    let transactionHash

    
    try {
        response = await deployContract(req.body.contractName, req.body.network)
        contractAddress = response.contractAddress
        transactionHash = response.transactionHash
        
        if (req.body.network === "local") {
            res.status(200).json({
                "message": "Contract Deployment Successful!",
                "contractAddress": contractAddress,
                "transactionHash": transactionHash
            })
        } else if (req.body.network === "sepolia") {
            res.status(200).json({
                "message": "Contract Deployment Successful!",
                "contractAddress": `https://sepolia.etherscan.io/address/${contractAddress}`,
                "transactionHash": `https://sepolia.etherscan.io/tx/${transactionHash}`
            })
        } else if (req.body.network === "polygon_amoy") {
            res.status(200).json({
                "message": "Contract Deployment Successful!",
                "contractAddress": `https://amoy.polygonscan.com/address/${contractAddress}`,
                "transactionHash": `https://amoy.polygonscan.com/tx/${transactionHash}`
            })
        } else if (req.body.network === "arbitrum_sepolia") {
            res.status(200).json({
                "message": "Contract Deployment Successful!",
                "contractAddress": `https://sepolia.arbiscan.io/address/${contractAddress}`,
                "transactionHash": `https://sepolia.arbiscan.io/tx/${transactionHash}`
            })
        } 
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "message": "Contract Deployment Failed!",
            "error": loggedError
        })
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`worker pid=${process.pid}`)
})

