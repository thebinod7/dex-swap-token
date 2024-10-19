// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }
}

contract CustomDex {
    // Custom tokens initialized
    string[] public tokens = ["Tether USD", "BNB", "USD Coin", "stETH", "TRON", "Matic Token", "SHIBA INU", "Uniswap"];

    mapping(string => ERC20) public tokenInstanceMap;

    uint256 ethValue = 1000000000000000000;

    struct History {
        uint256 historyId;
        string tokenA;
        string tokenB;
        uint256 inputValue;
        uint256 outputValue;
        address userAddress;
    }

    uint256 public _historyIndex;

    mapping(uint256 => History) private histories;

    constructor() {
        // Deploy custom tokens on contract deployment and store them in a map
        for (uint256 i = 0; i < tokens.length; i++) {
            CustomToken token = new CustomToken(tokens[i], tokens[i]);
            tokenInstanceMap[tokens[i]] = token;
        }
    }

    function getBalance(string memory tokenName) public view returns (uint256) {
        return tokenInstanceMap[tokenName].balanceOf(address(this));
    }

    function getTotalSupply(string memory tokenName) public view returns (uint256) {
        return tokenInstanceMap[tokenName].totalSupply();
    }

    function getName(string memory tokenName) public view returns (string memory) {
        return tokenInstanceMap[tokenName].name();
    }

    function getTokenAddress(string memory tokenName) public view returns (address) {
        return address(tokenInstanceMap[tokenName]);
    }

    // Return balance of user
    function getEtherBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _transactionHistory(
        string memory tokenName,
        string memory etherToken,
        uint256 inputValue,
        uint256 outputValue
    ) internal {
        _historyIndex++;
        uint256 historyId = _historyIndex;
        History storage history = histories[historyId];
        history.historyId = historyId;
        history.userAddress = msg.sender;
        history.tokenA = tokenName;
        history.tokenB = etherToken;
        history.inputValue = inputValue;
        history.outputValue = outputValue;
    }

    function swapEthToToken(string memory tokenName) public payable returns (uint256) {
        require(msg.value > 0, "Invalid amount");
        // require(tokenInstanceMap[tokenName] != ERC20(0), "Invalid token");

        uint256 inputValue = msg.value;
        uint256 outputValue = (inputValue / ethValue) * 10 ** 18;

        require(tokenInstanceMap[tokenName].transfer(msg.sender, outputValue), "Transfer failed");
        string memory etherToken = "Ether";
        _transactionHistory(tokenName, etherToken, inputValue, outputValue);
        return outputValue;
    }

    function swapTokenToEth(string memory tokenName, uint256 amount) public returns (uint256) {
        require(amount > 0, "Invalid amount");
        require(tokenInstanceMap[tokenName].balanceOf(msg.sender) >= amount, "Insufficient balance");

        uint256 exactAmount = amount / 10 ** 18;
        uint256 ethToBeTransferred = exactAmount * ethValue;

        payable(msg.sender).transfer(ethToBeTransferred);
        require(tokenInstanceMap[tokenName].transferFrom(msg.sender, address(this), amount), "Transfer failed");

        string memory etherToken = "Ether";
        _transactionHistory(tokenName, etherToken, exactAmount, ethToBeTransferred);

        return ethToBeTransferred;
    }

    function swapTokenToToken(string memory srcToken, string memory destToken, uint256 amount)
        public
        returns (uint256)
    {
        require(amount > 0, "Invalid amount");
        require(tokenInstanceMap[srcToken].balanceOf(msg.sender) >= amount, "Insufficient balance");

        require(tokenInstanceMap[srcToken].transferFrom(msg.sender, address(this), amount), "Transfer failed");
        require(tokenInstanceMap[destToken].transfer(msg.sender, amount), "Transfer failed");

        _transactionHistory(srcToken, destToken, amount, amount);

        return amount;
    }

    function getAllHistory() public view returns (History[] memory) {
        uint256 itemCount = _historyIndex;
        uint256 currentIndex = 0;

        History[] memory allHistories = new History[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            History storage currenItem = histories[currentId];
            allHistories[currentIndex] = currenItem;
            currentIndex++;
        }
        return allHistories;
    }
}