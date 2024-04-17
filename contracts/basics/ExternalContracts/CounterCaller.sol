// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./Counter.sol";


contract CounterCaller {

    Counter public myCounter;

    constructor(address counterAddress) {
        myCounter = Counter(counterAddress);
    }

    function counterIncrement() external {
        myCounter.increment();
    }

}