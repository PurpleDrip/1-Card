// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

enum DocType {AADHAR, PASSPORT, VOTER, PANCARD, RATION, DRIVING_LICENSE}
enum StatusType {PENDING, APPROVED, REJECTED}
struct Date{
    uint16 year;
    uint8 month;
    uint8 day;
}

struct PublicKey {
    bytes32 X; 
    bytes32 Y;     
}

struct User{
    bytes16 NCid;
    bool isVerified;
}

struct NullCardData{
    DocType docType;
    string verifiedBy;
    Date verifiedAt;
}
struct ActivityLogs{
    string activityName;
    Date activityTime;
}

struct UsageLogs{
    string VerifiedAt;
    Date verificatonTime;
}

struct UserDataStore{
    NullCardData[] nullCardData;
    ActivityLogs[] activityLogs;
    UsageLogs[] usageLogs;
}