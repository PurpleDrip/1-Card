// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";

contract NullCard {
    mapping(address => User) public Users;                      //walletAddress -> NCid,isVerified
    mapping(bytes16 => PublicKey) private PublicKeys;           //NCid -> PublicKey
    mapping(bytes16 => string[]) private userDataStore;         //NCid -> CID (Pinata)
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

    function getUserInfo(bytes16 NCid) external view returns (string[] memory){
        return userDataStore[NCid];
    }

    function getPublicKey(bytes16 NCid) external view returns(PublicKey memory){
        return PublicKeys[NCid];
    }

    function registerUser(address walletPublicAddress,bytes16 NCid, bytes32 X, bytes32 Y) external payable {
        require(msg.value == 0.001 ether, "Registration fee is 0.001 ETH");
        require(Users[walletPublicAddress].NCid == bytes16(0), "User already registered");
        Users[walletPublicAddress].NCid = NCid;
        Users[walletPublicAddress].isVerified=false;
        PublicKeys[NCid] = PublicKey({X: X, Y: Y});
    }

    function verifyUser(address walletPublicAddress) external OnlyOwner{
        require(Users[walletPublicAddress].NCid != bytes16(0), "User does not exist.");
        require(Users[walletPublicAddress].isVerified==false,"User already verified.");
        Users[walletPublicAddress].isVerified=true;
    }

    function appendData(address walletPublicAddress,string memory cid) external OnlyOwner{
        require(Users[walletPublicAddress].NCid != bytes16(0), "User does not exist.");
        require(Users[walletPublicAddress].isVerified==true,"User not verified.");

        userDataStore[Users[walletPublicAddress].NCid].push(cid);
    }

}
