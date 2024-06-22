const hre = require("hardhat")
const { Wallet } = require("../../utils/wallets")
const { getABI } = require("../../utils/artifacts")
const { DB } = require("../../data/db")
const { response } = require("express")


module.exports.PolicyBank = {
    policybankContract: async () => {
        return new hre.ethers.Contract(
            await DB.getContractAddress("PolicyBank_Mock", "local"),
            await getABI("PolicyBank_Mock"),
            Wallet.local
        )
    },
    purchase: async (selectedNumber) => {
        try {
            let contract = await this.PolicyBank.policybankContract()
            return (await contract.purchase(selectedNumber)).hash
        } catch (error) {
            console.error(error)
        }
    },
    getPolicySlips: async () => {
        try {
            let response = await (await this.PolicyBank.policybankContract()).getPolicySlips()
            //console.log(response[0].player)
            let arr = []

            for (let i = 0; i < response.length; i++) {
                arr.push({
                    player: response[i].player,
                    selectedNumber: hre.ethers.BigNumber.from(response[i].playedNumber).toNumber(),
                    drawingId: hre.ethers.BigNumber.from(response[i].drawingID).toNumber(),
                    isWinningNumber: response[i].isWinningNumber
                
                })
            }
            return arr
        } catch (error) {
            console.error(error)
        }
    }
}