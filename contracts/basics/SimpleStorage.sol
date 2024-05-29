// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


contract SimpleStorage {

    uint256 public number;

    function store(uint256 _number) external {
        number = _number;
    }

}