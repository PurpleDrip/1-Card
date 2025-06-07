// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";

contract NullCard {
    mapping(address => User) public Users;                      //walletAddress -> NCid,isVerified
    mapping(bytes16 => PublicKey) public PublicKeys;            //NCid -> PublicKey
    mapping(bytes16 => string) private userDataStore;           //NCid -> CID (Pinata)
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function getUser(address walletPublicAddress) external view returns (User memory){
        return Users[walletPublicAddress];
    }

    function registerUser(address walletPublicAddress,bytes16 NCid, bytes32 X, bytes32 Y) external payable {
        require(msg.value == 0.00001 ether, "Registration fee is 0.00001 ETH");
        require(Users[walletPublicAddress].NCid == bytes32(0), "User already registered");
        Users[walletPublicAddress].NCid = NCid;
        PublicKeys[NCid] = PublicKey({X: X, Y: Y});
    }

    function getUserInfo(bytes16 NCid) external view returns (string memory){
        return userDataStore[NCid];
    }
}
