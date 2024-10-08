// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Owner {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Must Be Called By Owner!");
        _;
    }
}