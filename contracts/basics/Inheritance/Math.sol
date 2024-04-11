// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Math {

    function add(uint x, uint y) public pure returns(uint) {
        return x + y;
    }

    function subtraction(uint x, uint y) public pure returns(uint) {
        return x - y;
    }
}