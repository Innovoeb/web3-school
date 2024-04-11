// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract Events
{
    uint256 public balance = address(this).balance;

    
    event Deposit
    (
        // indexed = allow you to search for these events using the indexed parameters as filters.
        address indexed user,
        uint256 etherAmount,
        uint256 time
    );
    

    function deposit() public payable
    {
        balance += msg.value;
        emit Deposit(msg.sender, msg.value, block.timestamp); 
    }
}