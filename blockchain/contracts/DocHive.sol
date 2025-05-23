// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";

contract DocHive {

    struct UserData {
        IndianOfficialDocs indianOfficialDocs;
        GeneralData generalData;
        string publicKey;
        statusType status;
    }
    // Events for transparency and off-chain monitoring
    event UserRegistered(address indexed userWallet, string ocId,statusType status);
    event DocumentAdded(string indexed ocId, DocType docType);
    event DocumentRemoved(string indexed ocId, DocType docType);
    event UserStatusChanged(string indexed ocId, statusType oldStatus, statusType newStatus);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    address payable public owner;
    mapping(address => string) public userIdStore; // user wallet -> ocID
    mapping(string => UserData) public userDataStore; // ocID -> user data
    mapping(string => address) public ocIdToWallet; // ocID -> wallet 
    
    string[] public registeredUsers;
    uint256 public totalUsers;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier registeredUser(string memory ocId) {
        require(userDataStore[ocId].status == statusType.ACTIVE, "No active account found for this Id");
        _;
    }

    modifier onlyUserOrOwner(string memory ocId) {
        require(
            msg.sender == owner || msg.sender == ocIdToWallet[ocId],
            "Not authorized to access this user's data"
        );
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = payable(newOwner);
    }

    function getUserCount() public view returns (uint256) {
        return totalUsers;
    }

    function getUserByIndex(uint256 index) public view onlyOwner returns (string memory) {
        require(index < totalUsers, "Index out of bounds");
        return registeredUsers[index];
    }

    function isWalletRegistered(address userWallet) public view returns (bool) {
        return bytes(userIdStore[userWallet]).length > 0;
    }

    function isOcIdRegistered(string memory ocId) public view returns (bool) {
        return userDataStore[ocId].status == statusType.ACTIVE;
    }

    function registerUser(
        address userWallet, 
        string memory ocId, 
        string memory publicKey,
        statusType initialStatus
    ) public onlyOwner {
        require(userWallet != address(0), "Invalid wallet address");
        require(bytes(ocId).length > 0, "OcId cannot be empty");
        require(bytes(publicKey).length > 0, "Public key cannot be empty");
        require(!isWalletRegistered(userWallet), "User already registered");
        require(!isOcIdRegistered(ocId), "OcId already exists");

        userIdStore[userWallet] = ocId;
        ocIdToWallet[ocId] = userWallet;
        userDataStore[ocId].publicKey = publicKey;
        userDataStore[ocId].status = initialStatus;
        
        registeredUsers.push(ocId);
        totalUsers++;

        emit UserRegistered(userWallet, ocId, initialStatus);
    }

    function addDocument(
        string memory ocId,
        DocType docType
    ) public onlyOwner registeredUser(ocId) {
        UserData storage userData = userDataStore[ocId];
        
        if (docType == DocType.AADHAR) {
            require(!userData.indianOfficialDocs.hasAadhar, "Aadhar already exists");
            userData.indianOfficialDocs.hasAadhar = true;
        } else if (docType == DocType.PASSPORT) {
            require(!userData.indianOfficialDocs.hasPassport, "Passport already exists");
            userData.indianOfficialDocs.hasPassport = true;
        } else if (docType == DocType.VOTER) {
            require(!userData.indianOfficialDocs.hasVoter, "Voter ID already exists");
            userData.indianOfficialDocs.hasVoter = true;
        } else if (docType == DocType.PANCARD) {
            require(!userData.indianOfficialDocs.hasPancard, "PAN card already exists");
            userData.indianOfficialDocs.hasPancard = true;
        } else if (docType == DocType.RATION) {
            require(!userData.indianOfficialDocs.hasRation, "Ration card already exists");
            userData.indianOfficialDocs.hasRation = true;
        } else if (docType == DocType.DRIVING_LICENSE) {
            require(!userData.indianOfficialDocs.hasDrivingLicense, "Driving license already exists");
            userData.indianOfficialDocs.hasDrivingLicense = true;
        }

        emit DocumentAdded(ocId, docType);
    }

    function removeDocument(
        string memory ocId,
        DocType docType
    ) public onlyOwner registeredUser(ocId) {
        UserData storage userData = userDataStore[ocId];
        
        if (docType == DocType.AADHAR) {
            require(userData.indianOfficialDocs.hasAadhar, "Aadhar doesn't exist");
            userData.indianOfficialDocs.hasAadhar = false;
        } else if (docType == DocType.PASSPORT) {
            require(userData.indianOfficialDocs.hasPassport, "Passport doesn't exist");
            userData.indianOfficialDocs.hasPassport = false;
        } else if (docType == DocType.VOTER) {
            require(userData.indianOfficialDocs.hasVoter, "Voter ID doesn't exist");
            userData.indianOfficialDocs.hasVoter = false;
        } else if (docType == DocType.PANCARD) {
            require(userData.indianOfficialDocs.hasPancard, "PAN card doesn't exist");
            userData.indianOfficialDocs.hasPancard = false;
        } else if (docType == DocType.RATION) {
            require(userData.indianOfficialDocs.hasRation, "Ration card doesn't exist");
            userData.indianOfficialDocs.hasRation = false;
        } else if (docType == DocType.DRIVING_LICENSE) {
            require(userData.indianOfficialDocs.hasDrivingLicense, "Driving license doesn't exist");
            userData.indianOfficialDocs.hasDrivingLicense = false;
        }

        emit DocumentRemoved(ocId, docType);
    }

    // // Batch add multiple documents
    // function addMultipleDocuments(
    //     string memory ocId,
    //     DocType[] memory docTypes
    // ) public onlyOwner registeredUser(ocId) {
    //     for (uint256 i = 0; i < docTypes.length; i++) {
    //         addDocument(ocId, docTypes[i]);
    //     }
    // }

    function getMyData() public view returns (
        IndianOfficialDocs memory,
        GeneralData memory,
        string memory,
        statusType
    ) {
        string memory ocId = userIdStore[msg.sender];
        require(bytes(ocId).length > 0, "User not registered");
        return getUserData(ocId);
    }

    function getUserData(string memory ocId) public view onlyUserOrOwner(ocId) returns (
        IndianOfficialDocs memory,
        GeneralData memory,
        string memory,
        statusType
    ) {
        require(isOcIdRegistered(ocId), "User not found");
        return (
            userDataStore[ocId].indianOfficialDocs,
            userDataStore[ocId].generalData,
            userDataStore[ocId].publicKey,
            userDataStore[ocId].status
        );
    }

    function hasDocument(string memory ocId, DocType docType) public view onlyUserOrOwner(ocId) returns (bool) {
        UserData memory userData = userDataStore[ocId];
        
        if (docType == DocType.AADHAR) return userData.indianOfficialDocs.hasAadhar;
        if (docType == DocType.PASSPORT) return userData.indianOfficialDocs.hasPassport;
        if (docType == DocType.VOTER) return userData.indianOfficialDocs.hasVoter;
        if (docType == DocType.PANCARD) return userData.indianOfficialDocs.hasPancard;
        if (docType == DocType.RATION) return userData.indianOfficialDocs.hasRation;
        if (docType == DocType.DRIVING_LICENSE) return userData.indianOfficialDocs.hasDrivingLicense;
        
        return false;
    }

    function changeUserStatus(string memory ocId, statusType newStatus) public onlyOwner {
        require(isOcIdRegistered(ocId), "User not found");
        statusType oldStatus = userDataStore[ocId].status;
        require(oldStatus != newStatus, "Status is already set to this value");
        
        userDataStore[ocId].status = newStatus;
        emit UserStatusChanged(ocId, oldStatus, newStatus);
    }

    function activateUser(string memory ocId) public onlyOwner {
        changeUserStatus(ocId, statusType.ACTIVE);
    }

    // Block user (convenience function)
    function blockUser(string memory ocId) public onlyOwner {
        changeUserStatus(ocId, statusType.BLOCKED);
    }

    // Set user to pending (convenience function)
    function setPendingUser(string memory ocId) public onlyOwner {
        changeUserStatus(ocId, statusType.PENDING);
    }

    function getWalletFromOcId(string memory ocId) public view onlyOwner returns (address) {
        return ocIdToWallet[ocId];
    }
}