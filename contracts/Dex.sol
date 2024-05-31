pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Dex is Ownable, ReentrancyGuard {
    event Bought(uint256 amount);
    event Sold(uint256 amount);
    IERC20 public token;
    IERC20 public usdt;
    uint256 public rate = 1000000 ether; // 1 Million
    AggregatorV3Interface internal priceFeed;

    constructor(IERC20 _tokenAddress, IERC20 _usdt) {
        token = _tokenAddress;
        usdt = _usdt;
        // mainnet Address for ETH/USD price feed =
        priceFeed = AggregatorV3Interface(
            address(0x694AA1769357215DE4FAC081bf1f309aDC325306)
        );
    }

    function buy() public payable nonReentrant {
        uint256 minimumPrice = getETHForUSDT();
        require(msg.value >= minimumPrice, "You need to send some ether");
        uint256 amountTobuy = (msg.value * rate) / minimumPrice;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function buyWithUSDT(uint256 amount) public nonReentrant {
        // Assuming amount is in smallest USDT unit (like wei for ETH)
        require(amount >= 1000000, "You need to send at least 1 USDT");

        // Amount to buy in token's smallest unit
        uint256 amountTobuy = amount * 10 ** 18; // Ensure this multiplication makes sense for your token

        // Check the contract's token balance
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");

        // Transfer USDT from the sender to the contract
        require(
            usdt.transferFrom(msg.sender, address(this), amount),
            "USDT transfer failed"
        );

        // Transfer the tokens to the sender
        require(
            token.transfer(msg.sender, amountTobuy),
            "Token transfer failed"
        );
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
