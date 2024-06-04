pragma solidity ^0.8.0;

// This document is not yet complete. Use ExampleLockConnectorV1 as reference

/*
UNCX Liquidity locker addresses
ToDo enter the values here as seen in ExampleLockConnectorV1
*/
interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

interface UncxV2LpLocker {
  function lockLPToken (address _lpToken, uint256 _amount, uint256 _unlock_date, address payable _referral, bool _fee_in_eth, address payable _withdrawer, uint16 _countryCode) external payable;
}

contract ExampleLockConnectorV2 {
  address UncxLpLocker;

  // function lockLps (address lpToken, uint256 amount, uint256 unlock_date) public {
  //   IERC20(lpToken).approve(UncxLpLocker, amount);
  //   address lockOwner = msg.sender;
  //   // ToDo add fees here
  //   UncxV2LpLocker.lockLPToken{value: lpFee}(
  //     lpToken, 
  //     amount, 
  //     unlock_date, // In seconds since epoch
  //     payable(address(0)), 
  //     true, // Fee in ETH
  //     lockOwner, 
  //     0 // CountryCode
  //   );
  // }
}