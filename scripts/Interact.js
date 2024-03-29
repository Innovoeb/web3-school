const hre = require("hardhat");

let connect = async (contractName, contractAddress) => {
    // Get the ContractFactory of your smart contract
    const contractFactory = await hre.ethers.getContractFactory(contractName)

    // Connect to the deployed contract
    const contract = await contractFactory.attach(contractAddress);

    return contract
}

let dataTypes = async () => {
    try {
        const contract = await connect("HelloSolidity", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
        // invoke the dataTypes() method
        await contract.dataTypes();
        console.log("Check localhost console!")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
//dataTypes()

let add = async () => {
    try {
        const contract = await connect("Math", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
        // invoke the dataTypes() method
        let result = await contract.add();
        console.log(`The result of the add() method is ${result.toString()}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

let addWithParams = async (x, y) => {
    try {
        const contract = await connect("Math", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
        // invoke the dataTypes() method
        let result = await contract.addWithParams(x, y);
        console.log(`The result of the addWithParams() method is ${result.toString()}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

let subtract = async (x, y) => {
    try {
        const contract = await connect("Math", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
        // invoke the dataTypes() method
        let result = await contract.subtract(x, y);
        console.log(`The result of the subtract() method is ${result.toString()}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}



subtract(100, 50)

