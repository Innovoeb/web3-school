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
        
        res.status(200).json({
            "message": "Contract Deployment Successful!",
            "contractAddress": contractAddress,
            "transactionHash": transactionHash
        })
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

