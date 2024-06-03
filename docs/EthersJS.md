## Provider

Provider: read permissions for an EVM network
- https://docs.ethers.org/v5/api/providers/provider/#Provider

provider.getBalance()
- get eth balance of a wallet and/or contract
- https://docs.ethers.org/v5/api/providers/provider/#Provider-getBalance

```
const balance = await provider.getBalance(contractAddress)
```



## Deploy a Smart Contract

<u>Concepts</u><br>
Provider<br>
Wallet<br>
ContractFactory

<u>Steps</u><br>
(1) Create a Wallet<br>
(2) Create a ContractFactory<br>
(3) Deploy


### (1) Wallet

Can sign transactions and messages using a private key; a reference to an externally owned address aka a wallet
- https://docs.ethers.org/v5/api/signer/#Wallet

**Reference: /server/utils/wallets.js**

```
const hre = require("hardhat")
const { vars } = require("hardhat/config")

// will determine what network the contract will be deployed on
const provider = new hre.ethers.providers.JsonRpcProvider(rpcURL)

// param1 == private key
// param2 == provider
const wallet = new hre.ethers.Wallet(vars.get("DEV_WALLET"), Provider.sepolia)
```

### (2) Contract Factory

A unique object that is used to deploy smart contracts to an EVM network. Note: ContractFactory and Contract are two different objects within Ethers.js
- https://docs.ethers.org/v5/api/contract/contract-factory/

**Reference: /server/utils/deployContract.js**

```
const hre = require("hardhat") // hardhat runtime environment
const artifacts = await hre.artifacts.readArtifact(contractName)

// param1 == interface or ABI (application binary interface)
// param2 == contract bytecode; usually kept by all solidity compilers
// param3 == signer; the address that will sign and deploy the contract
const contractFactory = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, Wallet.sepolia)

// contract *WILL* be deployed once the transaction is mined.
// https://docs.ethers.org/v5/api/contract/contract-factory/#ContractFactory-deploy
const contract = await contractFactory.deploy()

// wait until the transaction *WAS* mined
// throws on failure (the reciept is on the error)
// https://docs.ethers.org/v5/api/contract/contract-factory/#ContractFactory-deploy
const response = await contract.deployTransaction.wait()
```








