// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;
import "hardhat/console.sol";

contract DataTypes
{
    // TYPES
    uint256 Number = 1337; // unsigned integer (not positive or negative
    int256 Int256 = -5; // positive or negative
    bool Bool = true;
    string String = "Beovonni";
    address Address = 0x55CAe218C9cDD54E3f07F363d52ED7506DC1B1ae;
    bytes32 Bytes32 = "cat"; // 32 bytes in variable (max is 32 bytes)

    function printDataTypes() external view {
        console.log("My name is %s", String);
        console.log("My wallet address is %s", Address);
        console.log("Am I a bad mothafucka?: %s", Bool);
        console.log("My favorite number is %s", Number);
        consoleDivider();
        console.log("Below is an int256:");
        console.logInt(Int256);
        consoleDivider();
        console.log("Below is a bytes32:");
        console.logBytes32(Bytes32);
    }

    function consoleDivider() private view {
        console.log("----------");
    }

}