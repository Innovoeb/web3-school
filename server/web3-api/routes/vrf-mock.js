const express = require('express')
const router = express.Router()
const hre = require('hardhat')
const { VRF_Mock } = require('../logic/vrfMock')
const { DB } = require('../../data/db')
const { EventListener } = require('../eventListener')


// deploy contracts related to mock vrf
router.post("/vrf-mock/deployments", async (req, res) => {
    let loggedError
    let loggedOutput
    let response
    let contractAddress
    let transactionHash

    // check for vrf mock coordinator deployment
    if (req.body.contractName === "VRFCoordinatorV2_5Mock") {
        try {
            if (await DB.contractExists(req.body.contractName, req.body.network) ) {
                res.status(400).json({
                    "message": `Contract Already Exists on ${req.body.network} Network!`
                })
            } else {
                response = await VRF_Mock.deployCoordinator(req.body.contractName, req.body.network, req.body.params)
                
                if (response !== undefined) {
                    contractAddress = response.contractAddress
                    transactionHash = response.transactionHash
                    // start listening for vrf mock coordinator events
                    EventListener.VRF_Mock.SubscriptionCreated()
                    EventListener.VRF_Mock.SubscriptionFunded()
                    res.status(200).json({
                        "contractAddress": contractAddress,
                        "tx": transactionHash
                    })
                } else {
                    res.status(502).json({
                        "message": "Dun Goofed, Check Logs!"
                    })
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            loggedError = error
    
            res.status(500).json({
                "error": error
            })
        }
    }

    if (req.body.contractName === "PickOne_Mock") {
        try {
            if (await DB.contractExists(req.body.contractName, req.body.network) ) {
                res.status(400).json({
                    "message": `Contract Already Exists on ${req.body.network} Network!`
                })
            } else {
                response = await VRF_Mock.deployPickOne(req.body.contractName, req.body.network, req.body.params)
                
                if (response !== undefined) {
                    contractAddress = response.contractAddress
                    transactionHash = response.transactionHash
                    res.status(200).json({
                        "contractAddress": contractAddress,
                        "tx": transactionHash
                    })
                } else {
                    res.status(502).json({
                        "message": "Dun Goofed, Check Logs!"
                    })
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            loggedError = error
    
            res.status(500).json({
                "error": error
            })
        }
    }
})


// create a subscription
router.post("/vrf-mock/subscriptions", async (req, res) => {
    let loggedError, loggedOutput, response
    
    try {
        // returns tx if successful
        response = await VRF_Mock.createSubscription(req.body.address)

        if (response === undefined) {
            res.status(502).json({
                "message": "Dun Goofed, Check Logs!"
            })
        } else {
            res.status(200).json({
                "tx": response
            })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": loggedError
        })
    }
})

// get all active subscription ids
router.get("/vrf-mock/subscriptions", async (req, res) => {
    let loggedError, loggedOutput, response

    try {
        // returns array of subscription ids if successful
        response = await VRF_Mock.getActiveSubscriptionIds(0, 25)

        if (response === undefined) {
            res.status(502).json({
                "message": "Dun Goofed, Check Logs!"
            })
        } else {
            let arr = []
            for (let i = 0; i < response.length; i++) {
                arr.push(hre.ethers.BigNumber.from(response[i]).toString())
            }
            res.status(200).json({
                "subscriptionIds": arr
            })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error
        res.status(500).json({
            "error": loggedError
        })
    }
})

// get subscription details by id
router.get("/vrf-mock/subscriptions/:subId", async (req, res) => {
    let loggedError, loggedOutput, response
    try {
        // returns obj if successful
        response = await VRF_Mock.getSubscription(req.params.subId)

        if (response === undefined) {
            res.status(502).json({
                "message": "Dun Goofed, Check Logs!"
            })
        } else {
            res.status(200).json({
                "subId": hre.ethers.BigNumber.from(req.params.subId).toString(),
                "subscriptionInfo": response
            })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": loggedError
        })
    }
    
})

// fund a subscription
router.post("/vrf-mock/subscriptions/fund", async (req, res) => {
    let loggedError, loggedOutput, response

    // TODO: check to see if the subId is valid
    try {
        // returns tx if successful
        response = await VRF_Mock.fundSubscription(req.body.subId, req.body.linkAmount)

        if (response === undefined) {
            res.status(502).json({
                "message": "Dun Goofed, Check Logs!"
            })
        } else {
            res.status(200).json({
                "tx": response
            })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": loggedError
        })
    }
})

// add a consumer to a subscription
router.post("/vrf-mock/subscriptions/consumer", async (req, res) => {
    let loggedError, loggedOutput, response

    try {
        // returns tx if successful
        response = await VRF_Mock.addConsumer(req.body.subId, req.body.consumerAddress)

        if (response === undefined) {
            res.status(502).json({
                "message": "Dun Goofed, Check Logs!"
            })
        } else {
            res.status(200).json({
                "tx": response
            })
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        loggedError = error

        res.status(500).json({
            "error": loggedError
        })
    }
})

module.exports = router