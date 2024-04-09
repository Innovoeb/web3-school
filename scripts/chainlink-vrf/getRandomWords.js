const hre = require("hardhat")
const chalk = require('chalk');


const vrfConsumer = {
    address: '0x341879382F51eB013Fb993757877CAcAd400e3B6', // hardcoded for hardhat local network
    name: 'VRFv2Consumer', // START HERE!
    connect: async (contractName, contractAddress) => {
        // Get the ContractFactory of your smart contract
        const contractFactory = await hre.ethers.getContractFactory(contractName)
        // Connect to the deployed contract
        const contract = await contractFactory.attach(contractAddress);
        return contract
    }
}


const getWinningNubers = async () => {
    try {
        const contract = await vrfConsumer.connect(vrfConsumer.name, vrfConsumer.address)
        // invoke the dataTypes() method
        let winningNumber1 = await contract.winningNumber1();
        let winningNumber2 = await contract.winningNumber2();
        console.log(`✅ The winning numbers are ${chalk.green(winningNumber1)} and ${chalk.green(winningNumber2)}! ✅`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
getWinningNubers()

