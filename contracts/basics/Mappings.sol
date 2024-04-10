// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
import "hardhat/console.sol";

// mapping = dictionary but can't be iterated and can't get size
// first param = key, second param = value
contract Mapping
{
    mapping(address => uint) public myMap;
    mapping(address => mapping(uint => bool)) public nested;

    function get(address _addr) external view returns (uint) {
        // mapping always returns a value
        // if key/value pair is invalid, then it returns a default value
        return myMap[_addr];
    }
    

    function set(address _addr, uint _id) external {
        // update the value at this address
        myMap[_addr] = _id;
    }

    function remove(address _addr) external {
        // reset the value of the key to the default value
        delete myMap[_addr];
    }

    
    function getNested(address _addr, uint _id) external view returns(bool) {
        // get value from nested mapping
        return nested[_addr][_id];
    }

    function setNested(
        address _addr,
        uint _id,
        bool _bool
    ) external {
        nested[_addr][_id] = _bool;
    }

    function removeNested(
        address _addr,
        uint _id
    ) external {
        delete nested[_addr][_id];
    }
    
}