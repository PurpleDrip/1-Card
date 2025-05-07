// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";

contract OneCard{

    struct userData{
        indianOfficialDocs indianOfficialDocs;
        msritDocs msritDocs;
        generalData generalData;
        string publicKey;
    }

    address public owner;
    mapping (string => userData) public userDataStore; // ocId -> userData

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier verifiedUser(ocId){
        string randomText=generateRandomText();
        string publicKey=userDataStore[ocId].publicKey;

        string encryptedText=encrypt(randomText,publicKey);

        // this encrypted text is sent to be decrypted using the private key stored in the extension of the user to confirm that the user is legit.
        _;
    }

    modifier registeredUser(ocId){
        require(userDataStore[ocId] to exist,"No account found for this Id");
        _;
    }




    function viewDataStore view onlyOwner return(userDataStore){
        return userDataStore;
    }

    
    function registerUser (address user){


    }

    function addDocument onlyOwner registeredUser (string ocId){

    }

    function verifyDocument onlyOwner registeredUser (string ocId){

    }

}
