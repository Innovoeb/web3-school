const ContractFactory = require('./contractFactory.js')


const dataTypes = async () => {
    try {
        const contract = await ContractFactory.connect(ContractFactory.name, ContractFactory.address)
        // invoke the dataTypes() method
        await contract.printDataTypes();
        console.log("✅ Check Localhost Console! ✅")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

///// INVOKE HERE /////
dataTypes()