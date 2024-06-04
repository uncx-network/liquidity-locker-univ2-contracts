
// Set this to true to use a non forked rpc url (for deployments)
const DEPLOY_MODE = false

var provider
if (DEPLOY_MODE) {
  provider = ethers.provider // Use this for deployment on mainnets
} else {
  provider = new ethers.JsonRpcProvider(hre.network.config.forking.url) // use this for local & fork testing
}

var n = await provider.getNetwork()
var CHAIN = String(n.chainId)

const SETTINGS = {
  '1': { // eth mainnet
    V2_AMM: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Uniswap V2
    // V2_AMM: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac', // Sushiswap V2
    CountryList: '0x9720526C803aeee9c7558dBD19A4d6b512a49B94',
  },
  '56': { // BSC mainnet
    V2_AMM: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // Pancakeswap V2
    CountryList: '0x7600265b6713503A52C1D6db31F4c70f8863F994',
  },
  '42161': { // arbitrum
    V2_AMM: '0x6EcCab422D763aC031210895C81787E87B43A652', // Camelot V2
    CountryList: '0xBAB21591d9f4FE88912F2FAA4E502C7D5A00FF76',
  },
  '137': { // polygon
    V2_AMM: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4', // Sushiswap V2
    CountryList: '0x1A5281580b65fCadE3979d027B27C089e2aAc50a',
  },
  '8453': { // base
    V2_AMM: '0x71524B4f93c58fcbF659783284E38825f0622859', // Sushiswap V2
    CountryList: '0xfA104eb3925A27E6263E05acc88F2e983A890637',
  },
  '5': { // goerli
    V2_AMM: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Uniswap V2
    CountryList: '0x7D75876e0af45437c0ba5b7B59CA099d908f4BBE',
  },
}

var contracts = SETTINGS[CHAIN]

const Self = {
  contracts: contracts,
  chainId: n.chainId,
}

console.log('Chain', CHAIN)

export default Self