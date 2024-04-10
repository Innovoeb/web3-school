// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract Arrays 
{
    // serveral ways to init an array
    string[] public arr;
    uint[] public arr2 = [1, 2, 3];
    // fixed sized array, all elements init to 0
    uint[10] public myFixedSizeArr;

    constructor() {
        arr.push("Doc");
        arr.push("Sleepy");
        arr.push("Happy");
        arr.push("Dopey");
        arr.push("Sneezy");
        arr.push("Bashful");
        arr.push("Grumpy");
    }

    // same as string[] public arr
    function get(uint _i) external view returns(string memory) {
        return arr[_i];
    }

    // solidity can return the entire array
    // Note: should be avoided for arrays that can grow
    // due to high gas cost
    function getArr() external view returns(string[] memory) {
        return arr;
    }

    function push(uint _number) external {
        // append to array
        arr2.push(_number);
    }

    function pop() external {
        // remove last element from arr
        arr2.pop();
    }

    function getLength() external view returns(uint) {
        return arr.length;
    }

    function remove(uint _i) external {
        // resets the index to a default value but length size of arr stays the same
        delete arr[_i];
    }

    /*
    function examples() external pure {
        // create an arr in memory, should always be fixed size
        // uint[] memory = define memory data type
        // new uint[](5) = new memory array with a fixed size
        uint[] memory a = new uint[](5);
    }
    */


    function loop(string memory _name) external view returns(string memory message, uint index) {
        for (uint256 i = 0; i < arr.length; i++) {
            //console.log(arr[i]);
            // gas efficient string comparison in solidity
            if (keccak256(bytes(arr[i])) == keccak256(bytes(_name))) {
                message = "Dwarf Found!";
                index = i;
                return (message, index);
            }
        }
        message = "Dwarf Not Found!";
        index = 1337;
        return (message, index);
    }


}