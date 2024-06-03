// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20 {
    constructor() ERC20("Tether USD", "USDT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals()))); // Initial supply of 1,000,000 tokens
    }

    function decimals() public view virtual override returns (uint8) {
        return 6; // USDT uses 8 decimal places
    }
}