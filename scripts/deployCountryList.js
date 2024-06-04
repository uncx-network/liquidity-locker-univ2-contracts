// 

import hre from "hardhat"
import SETTINGS from '../settings.js'

async function main() {

  const CountryList = await hre.ethers.getContractFactory("CountryList")
  const countryList = await CountryList.deploy()
  await countryList.waitForDeployment()

  console.log('CountryList.sol', countryList.target)

  var secondsToSleep = 10
  for (var i = 0; i < secondsToSleep; i++) {
    console.log(`Sleeping for ${secondsToSleep - i} seconds`)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await hre.run("verify:verify", {
    address: countryList.target,
    constructorArguments: [
    ],
  });

  // Or manual verification
  // npx hardhat verify --contract contracts/UniswapV2Locker.sol:UniswapV2Locker --network base --constructor-args scripts/arguments.cjs 0x6D2f0031e0cD73f2F0b608451B8e7457e52C0da2
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
