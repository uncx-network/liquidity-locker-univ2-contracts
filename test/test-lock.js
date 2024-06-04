import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-network-helpers"
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import SETTINGS from '../settings.js'

describe("Uniswap V2.1 Lockers", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, alice, bob] = await ethers.getSigners();

      const SimpleERC20 = await ethers.getContractFactory("Erc20Simple");
      const weth = await SimpleERC20.deploy('Wrapped Ether', 'WETH');
      const uncx = await SimpleERC20.deploy('UNCX', 'UNCX');
      // var [tokenA, tokenB] = sortTokens(weth, uncx)

      // Deploy Locker and initialize pool
      const UniV2Locker = await ethers.getContractFactory("UniswapV2Locker");
      const univ2locker = await UniV2Locker.deploy(SETTINGS.contracts.V2_AMM, SETTINGS.contracts.CountryList, bob.address);

      return { owner, alice, bob, weth, uncx, univ2locker };
  }

  describe("UniV2Locker testing", function () {

      it("Perform a lock", async function () {
          const { univ2locker, owner, uncx, bob } = await loadFixture(deployFixture);

      });

  });

});

