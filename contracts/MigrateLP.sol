// SPDX-License-Identifier: UNLICENSED

// This contract locks uniswap v2 liquidity tokens. Used to give investors piece of mind a token team has locked liquidity
// and that the univ2 tokens cannot be removed from uniswap until the specified unlock date has been reached.

pragma solidity ^0.8.0;

import {TransferHelper} from "./TransferHelper.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract MigrateLP {
    using EnumerableSet for EnumerableSet.AddressSet;
    
    address public sender;
    address public lockOwner;
    
    address public uniswapV2Locker;
    
    struct TokenLock {
      uint256 lockDate; // the date the token was locked
      uint256 amount; // the amount of tokens still locked (initialAmount minus withdrawls)
      uint256 initialAmount; // the initial lock amount
      uint256 unlockDate; // the date the token can be withdrawn
      uint256 lockID; // lockID nonce per uni pair
      address owner;
    }
    
    EnumerableSet.AddressSet private lockedTokens;
    mapping(address => TokenLock[]) public tokenLocks; //map univ2 pair to all its locks
    
    constructor(address _uniswapV2Locker) public {
      uniswapV2Locker = _uniswapV2Locker;
    }
    
    function migrate(address _lpToken, uint256 _amount, uint256 _unlockDate, address payable _owner) external returns (bool) {
      require(msg.sender == uniswapV2Locker, 'OWNER NOT LOCKER');
      TransferHelper.safeTransferFrom(_lpToken, address(msg.sender), address(this), _amount);
      sender = msg.sender;
      lockOwner = _owner;
      
      TokenLock memory token_lock;
      token_lock.lockDate = block.timestamp;
      token_lock.amount = _amount;
      token_lock.initialAmount = _amount;
      token_lock.unlockDate = _unlockDate;
      token_lock.lockID = tokenLocks[_lpToken].length;
      token_lock.owner = _owner;

      // record the lock for the univ2pair
      tokenLocks[_lpToken].push(token_lock);
      lockedTokens.add(_lpToken);
    
      return true;
    }
    
    function getNumLocksForToken (address _lpToken) external view returns (uint256) {
      return tokenLocks[_lpToken].length;
    }
}