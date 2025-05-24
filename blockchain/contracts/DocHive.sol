// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DocHive is Ownable {
    enum DocType { AADHAR, PASSPORT, VOTER, PANCARD, RATION, DRIVING_LICENSE }
    enum Status { PENDING, ACTIVE, BLOCKED }

    struct Documents {
        uint8 bitmask; 
    }

    struct User {
        Documents docs;
        bytes32 pubKeyHash;
        Status status;
    }

    mapping(bytes32 => User) public users; // userId -> User
    mapping(address => bytes32) public walletToUserId; // wallet -> userId
    mapping(bytes32 => address) public userIdToWallet; // userId -> wallet

    event UserRegistered(bytes32 indexed userId, address wallet, Status status);
    event DocumentAdded(bytes32 indexed userId, DocType docType);
    event DocumentRemoved(bytes32 indexed userId, DocType docType);
    event StatusChanged(bytes32 indexed userId, Status oldStatus, Status newStatus);

    modifier onlyActiveUser(bytes32 userId) {
        require(users[userId].status == Status.ACTIVE, "User not active");
        _;
    }

    modifier onlyUserOrOwner(bytes32 userId) {
        require(msg.sender == owner() || msg.sender == userIdToWallet[userId], "Not authorized");
        _;
    }

    function registerUser(address userWallet, bytes32 userId, bytes32 pubKeyHash, Status initialStatus) external onlyOwner {
        require(userWallet != address(0), "Invalid wallet");
        require(userId != bytes32(0), "Invalid userId");
        require(walletToUserId[userWallet] == bytes32(0), "Wallet already registered");
        require(users[userId].status == Status(uint8(3)), "User already exists");

        users[userId] = User({ docs: Documents(0), pubKeyHash: pubKeyHash, status: initialStatus });
        walletToUserId[userWallet] = userId;
        userIdToWallet[userId] = userWallet;

        emit UserRegistered(userId, userWallet, initialStatus);
    }

    function _setDocumentBit(Documents storage docs, DocType docType, bool value) internal {
        uint8 bit = uint8(1) << uint8(docType);
        if (value) {
            docs.bitmask |= bit;
        } else {
            docs.bitmask &= ~bit;
        }
    }

    function _hasDocument(Documents storage docs, DocType docType) internal view returns (bool) {
        return (docs.bitmask & (uint8(1) << uint8(docType))) != 0;
    }

    function addDocument(bytes32 userId, DocType docType) external onlyOwner onlyActiveUser(userId) {
        require(!_hasDocument(users[userId].docs, docType), "Document already added");
        _setDocumentBit(users[userId].docs, docType, true);
        emit DocumentAdded(userId, docType);
    }

    function removeDocument(bytes32 userId, DocType docType) external onlyOwner onlyActiveUser(userId) {
        require(_hasDocument(users[userId].docs, docType), "Document not present");
        _setDocumentBit(users[userId].docs, docType, false);
        emit DocumentRemoved(userId, docType);
    }

    function batchAddDocuments(bytes32 userId, DocType[] calldata docTypes) external onlyOwner onlyActiveUser(userId) {
        for (uint i = 0; i < docTypes.length; i++) {
            if (!_hasDocument(users[userId].docs, docTypes[i])) {
                _setDocumentBit(users[userId].docs, docTypes[i], true);
                emit DocumentAdded(userId, docTypes[i]);
            }
        }
    }

    function getUserData(bytes32 userId) external view onlyUserOrOwner(userId) returns (uint8, bytes32, Status) {
        User memory u = users[userId];
        return (u.docs.bitmask, u.pubKeyHash, u.status);
    }

    function hasDocument(bytes32 userId, DocType docType) external view onlyUserOrOwner(userId) returns (bool) {
        return _hasDocument(users[userId].docs, docType);
    }

    function changeStatus(bytes32 userId, Status newStatus) public onlyOwner {
        Status oldStatus = users[userId].status;
        require(oldStatus != newStatus, "No status change");
        users[userId].status = newStatus;
        emit StatusChanged(userId, oldStatus, newStatus);
    }

    function getWalletFromUserId(bytes32 userId) public view onlyOwner returns (address) {
        return userIdToWallet[userId];
    }

    function getUserIdFromWallet(address userWallet) public view returns (bytes32) {
        return walletToUserId[userWallet];
    }
}
