// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract SimplePayable {

    // address(this).balance == get a contract's balance
    // address(contractVar).balance == get another contract's balance
    uint256 public balance = address(this).balance;

    function pay() external payable returns (string memory) {
        balance += msg.value;
        return "Payment Successful";
    }
}