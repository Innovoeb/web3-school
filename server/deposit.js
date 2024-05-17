const hre = require("hardhat");


const ContractFactory = {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // hardcoded for hardhat local network
    name: 'Events', // START HERE!
    connect: async (contractName, contractAddress) => {
        // Get the ContractFactory of your smart contract
        const contractFactory = await hre.ethers.getContractFactory(contractName)
        // Connect to the deployed contract
        const contract = await contractFactory.attach(contractAddress);
        return contract
    }
}

const invokeDeposit = async () => {
    try {
        const contract = await ContractFactory.connect(ContractFactory.name, ContractFactory.address)
        // invoke the dataTypes() method
        const value = hre.ethers.utils.parseEther("0.01")
        await contract.deposit({value});
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
invokeDeposit()

