const express = require('express')
const router = express.Router()
const hre = require('hardhat')
const { VRF_Mock } = require('../logic/vrfMock')



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

module.exports = router