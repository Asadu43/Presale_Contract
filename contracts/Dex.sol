pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Dex is Ownable {
    event Bought(uint256 amount);
    event Sold(uint256 amount);
    IERC20 public token;
    IERC20 public usdt;
    uint256 public rate = 1000000000000000000000000; // 1 Million
    AggregatorV3Interface internal priceFeed;

    constructor(IERC20 _tokenAddress, IERC20 _usdt) {
        token = _tokenAddress;
        usdt = _usdt;
        // mainnet Address for ETH/USD price feed =
        priceFeed = AggregatorV3Interface(
            address(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419)
        );
    }

    function buy() public payable {
        uint256 minimumPrice = getETHForUSDT();
        require(msg.value >= minimumPrice, "You need to send some ether");
        uint256 amountTobuy = (msg.value * rate) / minimumPrice;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function buyWithUSDT(uint256 amount) public {
        require(amount >= 1000000, "You need to send some USDT");
        uint256 amountTobuy = amount * 1000000000000000000;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        usdt.transferFrom(msg.sender, address(this), amount);
        // Send amount tokens to msg.sender
        token.transfer(msg.sender, amountTobuy);
    }

    function getBalanceOfToken() public view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function getBalanceOfUSDTToken() public view returns (uint256) {
        return IERC20(usdt).balanceOf(address(this));
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawMoney() public onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
    }

    function withdrawUSDT() public onlyOwner {
        IERC20(usdt).approve(address(this), getBalanceOfUSDTToken());
        IERC20(usdt).transferFrom(
            address(this),
            msg.sender,
            getBalanceOfUSDTToken()
        );
    }

    function withdrawOGNN() public onlyOwner {
        token.approve(address(this), getBalanceOfToken());
        token.transferFrom(address(this), msg.sender, getBalanceOfToken());
    }

    function getLatestETHPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function getETHForUSDT() public view returns (uint256) {
        int price = getLatestETHPrice();
        return (100000000 * 1e18) / uint256(price);
    }
}
