## Provider

Provider: read permissions for an EVM network
- https://docs.ethers.org/v5/api/providers/provider/#Provider

### Get a Contract/Wallet Balance

**Reference: /client/src/routes/Contracts.jsx**

```
const provider = new ethers.providers.Web3Provider(provider)

const balance = await provider.getBalance(address)
```
- https://docs.ethers.org/v5/api/providers/provider/#Provider-getBalance

### Get a Network's Latest Block Number

**Reference: /server/eventListener.js**

```
const provider = new hre.ethers.providers.JsonRpcProvider()

// returns the block number (or height) of the most recently mined block
const startBlockNumber = await provider.getBlockNumber()
```
- https://docs.ethers.org/v5/api/providers/provider/#Provider-getBlockNumber
- https://ethereum.stackexchange.com/questions/91388/ethers-js-filters-events-only-new-events
    - only filter for new contract events




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

## Errors

### Overflow
```
[
  {
    message: "Contract Deployment Failed!",
    error: {
      reason: "overflow",
      code: "NUMERIC_FAULT",
      fault: "overflow",
      operation: "BigNumber.from",
      value: 100000000000000000,
    },
  }
];
```
- https://docs.ethers.org/v5/troubleshooting/errors/#help-NUMERIC_FAULT-overflow


### Deploy a Smart Contract w/ a Balance

```
const initialBalance = ethers.utils.parseEther("0.1")
const myContract = await ethers.getContractFactory('MyContract')
const deployedContract = await myContract.deploy({ value: initialBalance })
```

### Contract Events Callback Params

```
targetContract.on("targetMethod", (...parameters) => {
  console.log(parameters);
})
```
- returns everything from blockNumber, transactionHash that triggered the event, and the event object itself









