# Innovoeb's Web3 School

This project goes over the fundamentals of the Solidity programming language; used to create smart contracts on Ethereum Virtual Machine (EVM) blockchain networks and the Hardhat.js framwork; used to build, test, and deploy decentralized applications (dApps)

Common Shell Commands

**Update Hardhat to its Latest Version**

`npm update hardhat`

**Bring up the Hardhat help menu**

`npx hardhat help`

**Initiate a local blockchain network**

`npx hardhat node`

**Compile all smart contract within the /contracts directory**

`npx hardhat compile`

---

### Hardhat-Chainlink Plugins

Common Shell Commands

List all Chainlink subtasks

```
npx hardhat chainlink:{product}:subtasks

ENUMS
- dataFeed
- dataFeedProxy
- feedRegistry
- l2Sequencer
- ens
- automationRegistry
- automationRegistrar
- vrf
- functions

https://www.npmjs.com/package/@chainlink/hardhat-chainlink#usage
```

---

### Custom Hardhat Tasks

Create your own Hardhat tasks by creating methods within the `hardhat.config.js` file.

example:
```
task("foobar", "writing my own hardhat tasks")
  // param1 == argument name
  // param2 == argument description; will display with npx hardhat help foobar
  .addParam("arg1", "This is a description of arg1")
  .addParam("arg2", "This is a description of arg2")
  .setAction(async (taskArgs) => {
    console.log(taskArgs)
  })

initialize task
npx hardhat foobar --arg1 {value} --arg2 {value}

initialize definition of task
npx hardhat help foobar
```


TODO:
```
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
