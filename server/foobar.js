const hre = require("hardhat")
const { DB } = require("../data/db.js") 
const { Provider } = require("./utils/providers.js")


const foobar = async () => {
    const contract = await hre.ethers.getContractAt(
        "VRFCoordinatorV2_5Mock", 
        await DB.getContractAddress("VRFCoordinatorV2_5Mock", "local"),
        Provider.local
    )

    console.log(await contract.listenerCount())
}

foobar()