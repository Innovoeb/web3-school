// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;

contract Math 
{
    function add() public pure returns(uint) {
        return 2 + 3;
    }

    function addWithParams(uint _num1, uint _num2) public pure returns(uint) {
        return _num1 + _num2;
    }

    function subtract(uint _num1, uint _num2) public pure returns(uint) {
        return _num1 - _num2;
    }
}