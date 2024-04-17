// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint public number;

    function increment() external {
        number += 1;
    }
}