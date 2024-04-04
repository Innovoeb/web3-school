// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;
import "hardhat/console.sol";

contract Mappings {
    // mapping = dictionary but can't be iterated and can't get size
    // first param = key, second param = value
    mapping(string => uint256) public nameToFavoriteNumber;
}