const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("MathModule", (m) => {
  const math = m.contract("Math", [])
  return { math }
})