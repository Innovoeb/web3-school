// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ConfirmedOwner} from "node_modules/@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "./PickOne_Mock.sol";
import "hardhat/console.sol";

contract PolicyBank_Mock is ConfirmedOwner {
    
    PickOne_Mock public pickOne; // Address of the deployed PickOne VRF consumer

    ///// PROPS /////
    uint256 public latestDrawnNumber;
    uint256 public vig;
    uint256 public jackpot; 
    uint256 public drawingID;
    // true if no winner
    bool public gameIsActive;
    // if winner...
    address[] public winners;
    uint256 public winningNumber = 777;

    struct PolicySlip {
        address payable player;
        uint playedNumber;
        uint drawingID;
        bool isWinningNumber;
    }
    // an array of Ticket structs
    PolicySlip[] public policySlips;

    struct Drawing {
        uint drawingID;
        uint vrfRequestID;
        uint drawnNumber;
        bool isWinningDraw;
    }
    Drawing[] public drawings;

    ///// EVENTS /////

    constructor(
        address _pickoneAddress
    ) ConfirmedOwner(msg.sender) {
        pickOne = PickOne_Mock(_pickoneAddress);
        gameIsActive = true;
    }


    function purchase(uint _selectedNumber) external payable {
        require (_selectedNumber <= 99, "Must Select a Number Between 0 and 99");

        vig = vig + (msg.value / 2);
        jackpot = address(this).balance - vig;
        policySlips.push(PolicySlip(payable(msg.sender), _selectedNumber, drawingID, false));
    }

    function drawNumber() external onlyOwner {
        // call the VRF Consumer
        pickOne.requestRandomWords();
        drawingID += 1;
    }

    
    function checkForWinners() external onlyOwner returns (string memory) {
        latestDrawnNumber = pickOne.latestDrawnNumber();
        // loop through all policy slips and check for a matching winner
        for (uint i = 0; i < policySlips.length; i++) {
            // winner winner
            if (policySlips[i].playedNumber == pickOne.latestDrawnNumber() && drawingID - 1 == policySlips[i].drawingID) {
                gameIsActive = false;
                // payout 
                policySlips[i].player.transfer(jackpot);
                pickOne.admin().transfer(vig);
                // set the isWinner flag on the policy slip to true
                policySlips[i].isWinningNumber = true;
                // add the player to the winners array
                winners.push(policySlips[i].player);
                // update winning number prop
                winningNumber = pickOne.latestDrawnNumber();
                return "Winner Winner!";
            }
        }
        return "No Winning Numbers!";
    }

    ////////////// DEV //////////////
    function changeConsumer(address _to) external onlyOwner {
        pickOne = PickOne_Mock(_to);
    }

}