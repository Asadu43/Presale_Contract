// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OganessonToken is ERC20 {
    constructor() ERC20("Oganesson Token", "OGNN") {
        _mint(msg.sender, 10000000000000 * 10 ** 18);
    }
    
}