// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../types/structDeclaration.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DocHive is ReentrancyGuard {
    struct UserData {
        IndianOfficialDocs indianOfficialDocs;
        GeneralData generalData;
        string publicKey;
        statusType status;
    }

    event UserRegistered(address indexed userWallet, string docId, statusType status);
    event DocumentAdded(string indexed docId, DocType docType);
    event DocumentRemoved(string indexed docId, DocType docType);
    event UserStatusChanged(string indexed docId, statusType oldStatus, statusType newStatus);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    address payable public owner;
    mapping(address => string) public userIdStore;
    mapping(string => UserData) public userDataStore;
    mapping(string => address) public docIdToWallet;

    mapping(string => bool) private isUserRegistered;
    uint256 public totalUsers;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier registeredUser(string memory docId) {
        require(userDataStore[docId].status == statusType.ACTIVE, "User is not active");
        _;
    }

    modifier onlyUserOrOwner(string memory docId) {
        require(
            msg.sender == owner || msg.sender == docIdToWallet[docId],
            "Not authorized"
        );
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = payable(newOwner);
    }

    function getUserCount() public view returns (uint256) {
        return totalUsers;
    }

    function isWalletRegistered(address userWallet) public view returns (bool) {
        return bytes(userIdStore[userWallet]).length > 0;
    }

    function isDocIdRegistered(string memory docId) public view returns (bool) {
        return isUserRegistered[docId];
    }

    function registerUser(
        address userWallet,
        string memory docId,
        string memory publicKey,
        statusType initialStatus
    ) public onlyOwner nonReentrant {
        require(userWallet != address(0), "Invalid wallet");
        require(bytes(docId).length > 0, "Document ID required");
        require(bytes(publicKey).length > 0, "Public key required");
        require(!isWalletRegistered(userWallet), "Wallet already registered");
        require(!isDocIdRegistered(docId), "Document ID already exists");

        userIdStore[userWallet] = docId;
        docIdToWallet[docId] = userWallet;
        userDataStore[docId].publicKey = publicKey;
        userDataStore[docId].status = initialStatus;

        isUserRegistered[docId] = true;
        totalUsers++;

        emit UserRegistered(userWallet, docId, initialStatus);
    }

    function _updateDocumentState(
        IndianOfficialDocs storage docs,
        DocType docType,
        bool value
    ) internal {
        if (docType == DocType.AADHAR) docs.hasAadhar = value;
        else if (docType == DocType.PASSPORT) docs.hasPassport = value;
        else if (docType == DocType.VOTER) docs.hasVoter = value;
        else if (docType == DocType.PANCARD) docs.hasPancard = value;
        else if (docType == DocType.RATION) docs.hasRation = value;
        else if (docType == DocType.DRIVING_LICENSE) docs.hasDrivingLicense = value;
    }

    function _hasDocument(IndianOfficialDocs memory docs, DocType docType) internal pure returns (bool) {
        if (docType == DocType.AADHAR) return docs.hasAadhar;
        if (docType == DocType.PASSPORT) return docs.hasPassport;
        if (docType == DocType.VOTER) return docs.hasVoter;
        if (docType == DocType.PANCARD) return docs.hasPancard;
        if (docType == DocType.RATION) return docs.hasRation;
        if (docType == DocType.DRIVING_LICENSE) return docs.hasDrivingLicense;
        return false;
    }

    function addDocument(string memory docId, DocType docType)
        public
        onlyOwner
        registeredUser(docId)
    {
        IndianOfficialDocs storage docs = userDataStore[docId].indianOfficialDocs;
        require(!_hasDocument(docs, docType), "Document already exists");
        _updateDocumentState(docs, docType, true);

        emit DocumentAdded(docId, docType);
    }

    function removeDocument(string memory docId, DocType docType)
        public
        onlyOwner
        registeredUser(docId)
    {
        IndianOfficialDocs storage docs = userDataStore[docId].indianOfficialDocs;
        require(_hasDocument(docs, docType), "Document does not exist");
        _updateDocumentState(docs, docType, false);

        emit DocumentRemoved(docId, docType);
    }

    function getMyData()
        public
        view
        returns (
            IndianOfficialDocs memory,
            GeneralData memory,
            string memory,
            statusType
        )
    {
        string memory docId = userIdStore[msg.sender];
        require(bytes(docId).length > 0, "User not registered");
        return getUserData(docId);
    }

    function getUserData(string memory docId)
        public
        view
        onlyUserOrOwner(docId)
        returns (
            IndianOfficialDocs memory,
            GeneralData memory,
            string memory,
            statusType
        )
    {
        require(isDocIdRegistered(docId), "User not found");
        UserData storage data = userDataStore[docId];
        return (data.indianOfficialDocs, data.generalData, data.publicKey, data.status);
    }

    function hasDocument(string memory docId, DocType docType)
        public
        view
        onlyUserOrOwner(docId)
        returns (bool)
    {
        return _hasDocument(userDataStore[docId].indianOfficialDocs, docType);
    }

    function changeUserStatus(string memory docId, statusType newStatus) public onlyOwner {
        require(isDocIdRegistered(docId), "User not found");
        statusType oldStatus = userDataStore[docId].status;
        require(oldStatus != newStatus, "Already in desired status");

        userDataStore[docId].status = newStatus;
        emit UserStatusChanged(docId, oldStatus, newStatus);
    }

    function activateUser(string memory docId) public onlyOwner {
        changeUserStatus(docId, statusType.ACTIVE);
    }

    function blockUser(string memory docId) public onlyOwner {
        changeUserStatus(docId, statusType.BLOCKED);
    }

    function setPendingUser(string memory docId) public onlyOwner {
        changeUserStatus(docId, statusType.PENDING);
    }

    function getWalletFromDocId(string memory docId)
        public
        view
        onlyOwner
        returns (address)
    {
        return docIdToWallet[docId];
    }
}
