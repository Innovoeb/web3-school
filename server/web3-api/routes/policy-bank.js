const express = require('express')
const router = express.Router()
const hre = require('hardhat')
const { PolicyBank } = require('../logic/policyBank')

// purchase a policy slip
router.post("/policy-bank/policy-slip", async (req, res) => {
    let response, loggedError, loggedOutput

    try {
        response = await PolicyBank.purchase(req.body.selectedNumber)

        if (response !== undefined) {
            res.status(200).json({
                "tx": response
            })
        } else {
            res.status(502).json({
                "message": "Goofed, Check Logs!"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            "error": error
        })
    }
})

// get all policy slips
router.get("/policy-bank/policy-slip", async (req, res) => {
    let response, loggedError, loggedOutput

    try {
         // returns an array of objects
        response = await PolicyBank.getPolicySlips()

        if (response !== undefined) {
            res.status(200).json({
                "policySlips": response
            })
        } else {
            res.status(502).json({
                "message": "Goofed, Check Logs!"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            "error": error
        })
    }
})


module.exports = router