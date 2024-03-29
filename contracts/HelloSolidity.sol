// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;
import "hardhat/console.sol";

contract HelloSolidity
{
    // TYPES
    uint256 favoriteNumber = 1337; // unsigned integer (not positive or negative)
    int256 favoriteInt = -5; // positive or negative
    bool favoriteBool = true;
    string favoriteString = "Beovonni";
    address myAddress = 0x55CAe218C9cDD54E3f07F363d52ED7506DC1B1ae;
    bytes32 favoriteBytes = "cat"; // 32 bytes in variable (max is 32 bytes)

    // mapping = dictionary but can't be iterated and can't get size
    // first param = key, second param = value
    mapping(string => uint256) public nameToFavoriteNumber;

    function dataTypes() public view {
        console.log("My name is %s", favoriteString);
        console.log("My favorite number is %s", favoriteNumber);
        console.log("My wallet address is %s", myAddress);
        //console.logInt(favoriteInt); // as of march2024 cannot add label to int256
    }
}