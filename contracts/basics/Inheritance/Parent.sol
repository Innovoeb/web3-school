// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./Math.sol";
import "./Owner.sol";

contract MyContract is Owner, Math {
    // invoke add function from Math contract
    function plus() external pure returns(uint) {
        return Math.add(10, 15);
    }
    function minus() public view onlyOwner returns(uint) {
        return Math.subtraction(10, 5);
        //console.log(result);
    }
}
