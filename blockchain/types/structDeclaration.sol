// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

enum DocType {AADHAR, PASSPORT, VOTER, PANCARD, RATION, DRIVING_LICENSE}
struct Date{
    uint16 year;
    uint8 month;
    uint8 day;
}
struct NullCardData{
    DocType docType;
    string verifiedBy;
    Date verifiedAt;
}