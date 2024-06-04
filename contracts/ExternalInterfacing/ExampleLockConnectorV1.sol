pragma solidity ^0.8.0;

/*
UNCX Liquidity locker addresses

-- Ethereum
- Uniswap V2: 0x663A5C229c09b049E36dCc11a9B0d4a8Eb9db214 (v1)
- Sushiswap V1: 0xED9180976c2a4742C7A57354FD39d8BEc6cbd8AB (v1)

-- Binance Smart Chain
- Pancakeswap V2: 0xC765bddB93b0D1c1A88282BA0fa6B2d00E3e0c83 (v1)
*/
interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

interface IERCBurn {
    function burn(uint256 _amount) external;
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

interface UncxV2LpLocker {
  function gFees() external view returns (uint256 ethFee, IERCBurn secondaryFeeToken, uint256 secondaryTokenFee, uint256 secondaryTokenDiscount, uint256 liquidityFee, uint256 referralPercent, IERCBurn referralToken, uint256 referralHold, uint256 referralDiscount);
  function lockLPToken (address _lpToken, uint256 _amount, uint256 _unlock_date, address payable _referral, bool _fee_in_eth, address payable _withdrawer) external payable;
}

contract ExampleLockConnectorV1 {
  UncxV2LpLocker UncxLpLocker;

  constructor() {
    // Set this to the correct value depending on the AMM and chain. Reference values are at the top of this file
    UncxLpLocker = UncxV2LpLocker(0x663A5C229c09b049E36dCc11a9B0d4a8Eb9db214);
  }

  function lockLps (address lpToken, uint256 amount, uint256 unlock_date) public {
    IERC20(lpToken).approve(address(UncxLpLocker), amount);
    address lockOwner = msg.sender;

    // This fee changes from time to time as ETH's value to USD changes. 
    // Dont hardcode it. Be sure to fetch it 
    // and show the live value to your customers on your UI.

    (uint256 ethFee, , , , , , , , ) = UncxLpLocker.gFees();

    UncxLpLocker.lockLPToken{value: ethFee}(
      lpToken, // Lp token address
      amount, // Amount Lp tokens to lock
      unlock_date, // In seconds since epoch
      payable(address(0)), // ignore
      true, // Fee in ETH
      payable(lockOwner) // Lock Owner
    );
  }
}