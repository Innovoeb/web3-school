const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


// 1stParam = module ID, 2ndParam = module definition, m param within callback = ModuleBuilder object
module.exports = buildModule("DataTypesModule", (m) => {
  // dataTypes = Future object; result of an execution step that Hardhat Ignition 
  // needs to run to deploy a contract instance or interact with an existing one
  // 1st param = contract name, 2nd param = contract constructor arguments
  const dataTypes = m.contract("DataTypes", [])
  
  // another Future object
  // execute the "launch" method of the "Rocket" contract
  //m.call(dataTypes, "foobar", [])
  
  // return the Future object representing the contract instance, to make it accessible 
  // to other modules and tests as well
  return { dataTypes }
})
