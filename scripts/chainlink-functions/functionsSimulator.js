// See: https://github.com/smartcontractkit/hardhat-chainlink/blob/main/SANDBOX.md#service-alias-functionssimulation


const hre = require("hardhat")
const fs = require("fs")
const path = require("path")
const functionsSimulation = hre.chainlink.sandbox.functionsSimulation
const {
    SubscriptionManager,
    simulateScript,
    ResponseListener,
    ReturnType,
    decodeResult,
    FulfillmentCode,
  } = require("@chainlink/functions-toolkit");
const source = fs
    .readFileSync(path.resolve(__dirname, "source.js"))
    .toString()
const args = []
const bytesArgs = []

const runSimulation = async () => {
    const returnType = ReturnType.string
    const response = await functionsSimulation.simulateRequest(source, args, bytesArgs)
    const decodedResponse = decodeResult(response.responseBytesHexstring, returnType)
    const errorString = response.errorString

    if (errorString) {
        console.log(`❌ Error during simulation: `, errorString)
    } else {
        console.log(`✅ Decoded response to ${returnType}: ${decodedResponse}`)
    }
}
runSimulation()


