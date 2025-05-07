// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

enum DocumentTypes {aadhar,passport,voter,pancard,ration,drivinglicense}

struct indianOfficialDocs {
    bool hasAadhar;
    bool isAadharVerified;

    bool hasPassport;
    bool isPassportVerified;
    
    bool hasVoter;
    bool isVoterVerified;
    
    bool hasPancard;
    bool isPancardVerified;

    bool hasRation;
    bool isRationVerified;

    bool hasDrivingLicense;
    bool isDrivingLicenseVerified;
}

enum DepartmentTypes { CSE, ME, CY, BM }

struct msritDocs {
    bool hasUSN;
    DepartmentTypes department;
    int256 yearOfAdmission;
}

struct generalData {
    bool isAgedAbove18;
    bool isMarried;
}
