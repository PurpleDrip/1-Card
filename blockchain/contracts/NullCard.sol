// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";

contract NullCard {
    mapping(address => bytes16) public Users;              //walletAddress -> NCid
    mapping(bytes16 => PublicKey) public PublicKeys;       //NCid -> PublicKey
    mapping(bytes32 => NullCardData[]) public NullCards;   //NCid -> NullCardData[]
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function registerUser(address walletPublicAddress,bytes16 NCid, bytes32 X, bytes32 Y) external OnlyOwner {
        require(Users[walletPublicAddress] == bytes32(0), "User already registered");
        Users[walletPublicAddress] = NCid;
        PublicKeys[NCid] = PublicKey({X: X, Y: Y});
    }

    function deleteUser() external OnlyOwner {
        require(Users[msg.sender] != bytes16(0), "User not registered");
        delete Users[msg.sender];
    }

    function addNullCard(NullCardData memory nullCard) external OnlyOwner {
        require(Users[msg.sender] != bytes16(0), "User not registered");
        NullCards[Users[msg.sender]].push(nullCard);
    }
}
