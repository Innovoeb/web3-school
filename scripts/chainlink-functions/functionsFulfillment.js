const hre = require("hardhat")
// REPLACE this with your Functions consumer address
const consumerAddress = "0x7178f4a13ff03b2bf76ae59098eb75a4fdc56e42"

let connect = async (contractName, contractAddress) => {
    // Get the ContractFactory of your smart contract
    const contractFactory = await hre.ethers.getContractFactory(contractName)

    // Connect to the deployed contract
    const contract = await contractFactory.attach(contractAddress);
    //console.log(await contract.owner())

    return contract
}


let getOwner = async () => {
    try {
        let contractConnection = await connect("WhatTime", consumerAddress)
        console.log(`Owner: ${await contractConnection.owner()}`)
        // invoke the dataTypes() method
        //console.log(`Owner: ${await contractConnection.owner()}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}



const fulfillment = async () => {
    try {
        let contractConnection = await connect("WhatTime", consumerAddress)
        let sendRequest = await contractConnection.sendRequest(1418);
        console.log(`Request sent: ${sendRequest.hash}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    setTimeout(async () => {
        //const returnType = ReturnType.string;
        //const decodedResponse = decodeResult(response.responseBytesHexstring, returnType);
        let contractConnection = await connect("WhatTime", consumerAddress)
        console.log(`Timezone: ${await contractConnection.timezone()}`)
    }, 15000) 
}

const currentTime = async () => {
    try {
        let contractConnection = await connect("WhatTime", consumerAddress)
        console.log(`Timezone: ${await contractConnection.timezone()}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

////////// INVOKE HERE! //////////
fulfillment()




  