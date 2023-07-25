// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Box is AccessControl {
    uint256 public counter = 0;

    bytes32 public constant EHSAN_ROLE = keccak256("EHSAN_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(EHSAN_ROLE, msg.sender);
    }

    function incr() external onlyRole(EHSAN_ROLE) {
        counter += 1;
    }

    function testAdmin() external onlyRole(DEFAULT_ADMIN_ROLE) {
        counter += 4;
    }

    function testAdminAndEhsan() external onlyRole(EHSAN_ROLE) {
        counter += 2;
    }
}
