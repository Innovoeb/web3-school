// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./Owner.sol";

contract MyContract is Owner {
    // invoke add function from Math contract
    function plus() external pure returns(uint) {
        
    }
    function minus() public view onlyOwner returns(uint) {
        
        //console.log(result);
    }
}
