// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
struct IndianOfficialDocs {
    bool hasAadhar;
    bool hasPassport;
    bool hasVoter;
    bool hasPancard;
    bool hasRation;
    bool hasDrivingLicense;
}
struct GeneralData {
    bool isAgedAbove18;
    bool isMarried;
}

enum DocType {
    AADHAR,
    PASSPORT,
    VOTER,
    PANCARD,
    RATION,
    DRIVING_LICENSE
}

enum statusType{
    PENDING,
    ACTIVE,
    BLOCKED
}