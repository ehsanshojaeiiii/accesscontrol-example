// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract Box {
    uint256 public counter = 0;

    function incr() external {
        counter += 1;
    }
}
