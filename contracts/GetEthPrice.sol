// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GetETHPrice {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        // Sepolia Testnet address for ETH/USD price feed
        // Replace with Mainnet address or other network address as needed
        priceFeed = AggregatorV3Interface(address(0x694AA1769357215DE4FAC081bf1f309aDC325306));
    }

    function getLatestETHPrice() public view returns (int256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return price;
    }

    function getETHForUSDT(uint256 usdtAmount) public view returns (uint256) {
        int price = getLatestETHPrice();
        return (usdtAmount * 1e18) / uint256(price);
    }
}
