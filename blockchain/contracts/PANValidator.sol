// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PANValidator {
    function validatePAN(string memory pan) public pure returns (bool) {
        bytes memory panBytes = bytes(pan);
        require(panBytes.length == 10, "Invalid PAN length");
        
        // Validate PAN structure: ABCDE1234F
        for(uint i = 0; i < 5; i++) {
            require(_isUpperAlpha(panBytes[i]), "First 5 must be uppercase");
        }
        for(uint i = 5; i < 9; i++) {
            require(_isDigit(panBytes[i]), "Positions 6-9 must be digits");
        }
        require(_isUpperAlpha(panBytes[9]), "Last must be uppercase");
        
        return true;
    }
    
    function _isUpperAlpha(bytes1 c) private pure returns (bool) {
        return (c >= 0x41 && c <= 0x5A); // A-Z
    }
    
    function _isDigit(bytes1 c) private pure returns (bool) {
        return (c >= 0x30 && c <= 0x39); // 0-9
    }
}
