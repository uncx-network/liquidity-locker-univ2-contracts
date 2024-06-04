// 

import hre from "hardhat"
import SETTINGS from '../settings.js'

async function main() {

  // set these variables before deployment
  const metamaskOwner = '0xAA3d85aD9D128DFECb55424085754F6dFa643eb1'
  const feeAddress = '0x04bDa42de3bc32Abb00df46004204424d4Cf8287'

  const V2_FACTORY = "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C"
  const COUNTRY_LIST = "0xDffCa4B8c6DEfB2FC0fbc0a1B07D4ba34a2c1453"

  const UniV2Locker = await hre.ethers.getContractFactory("UniswapV2Locker")
  const univ2locker = await UniV2Locker.deploy(V2_FACTORY, COUNTRY_LIST, feeAddress)
  await univ2locker.waitForDeployment()
  await univ2locker.transferOwnership(metamaskOwner)

  console.log('UniV2Locker.sol', univ2locker.target)

  var secondsToSleep = 10
  for (var i = 0; i < secondsToSleep; i++) {
    console.log(`Sleeping for ${secondsToSleep - i} seconds`)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await hre.run("verify:verify", {
    address: univ2locker.target,
    constructorArguments: [
      V2_FACTORY, 
      COUNTRY_LIST,
      feeAddress
    ],
  });

  // Or manual verification -- This line below worked to verify
  // npx hardhat verify --contract contracts/UniswapV2Locker.sol:UniswapV2Locker --network base --constructor-args scripts/arguments.cjs 0x6D2f0031e0cD73f2F0b608451B8e7457e52C0da2
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
