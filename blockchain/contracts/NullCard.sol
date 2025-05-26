// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";

contract NullCard {
    mapping(address => bytes32) public Users;
    mapping(bytes32 => NullCardData[]) public NullCards;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function registerUser(bytes32 NCid) external OnlyOwner {
        require(Users[msg.sender] == bytes32(0), "User already registered");
        Users[msg.sender] = NCid;
    }

    function deleteUser() external OnlyOwner {
        require(Users[msg.sender] != bytes32(0), "User not registered");
        delete Users[msg.sender];
    }

    function addNullCard(NullCardData memory nullCard) external OnlyOwner {
        require(Users[msg.sender] != bytes32(0), "User not registered");
        NullCards[Users[msg.sender]].push(nullCard);
    }
}
