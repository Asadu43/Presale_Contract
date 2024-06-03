// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

interface IDEX {
    function buy() external payable;

    function buyWithUSDT(uint256 amount) external;

    function getBalanceOfToken() external view returns (uint256);

    function getBalance() external view returns (uint);

}
