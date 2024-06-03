// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract Events
{
    
    event Deposit
    (
        // indexed = allow you to search for these events using the indexed parameters as filters.
        address indexed user,
        uint256 depositAmount,
        uint256 newBalance
    );
    

    function deposit() public payable
    {
        emit Deposit(msg.sender, msg.value, address(this).balance); 
    }
}