import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"

import * as dotenv from "dotenv";

dotenv.config()

const privateKey =
  process.env.PRIVATE_KEY_1;
const privateKey2 =process.env.PRIVATE_KEY_2;
const ertherScanApiKey =process.env.ETHER_SCAN_API_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork:"hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: "https://rpc.ankr.com/bsc",
        enabled:false
      },
    },
    mainnet:{
      url: "https://rpc.ankr.com/eth",
      chainId: 1,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    bsc:{
      url: "https://rpc.ankr.com/bsc",
      chainId: 56,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    ftm:{
      url: "https://rpc.ankr.com/fantom",
      chainId: 250,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    bscTestnet: {
      url: "http://data-seed-prebsc-2-s2.binance.org:8545/",
      chainId: 97,
      accounts: [`${privateKey}`, `${privateKey2}`],
    },
    ftmTestnet:{
      url: "https://rpc.ankr.com/fantom_testnet",
      chainId: 4002,
      accounts: [`${privateKey}`, `${privateKey2}`],
    },
    rinkeby:{
      url: "https://rpc.ankr.com/eth_rinkeby",
      chainId: 4,
      accounts: [`${privateKey}`, `${privateKey2}`],
    },
    ropsten:{
      url: "https://rpc.ankr.com/eth_ropsten",
      chainId: 3,
      accounts: [`${privateKey}`, `${privateKey2}`],
    },
    mumbai:{
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
      accounts: [`${privateKey}`, `${privateKey2}`],
    },
    bitgert:{
      url: "https://rpc.icecreamswap.com",
      chainId: 32520,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    wan:{
      url: "https://gwan-ssl.wandevs.org:56891",
      chainId: 888,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    telos:{
      url: "https://mainnet.telos.net/evm",
      chainId: 40,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    aurora:{
      url: "https://mainnet.aurora.dev",
      chainId: 1313161554,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    celo:{
      url: "https://rpc.ankr.com/celo",
      chainId: 42220,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    doge:{
      url: "https://rpc.dogechain.dog",
      chainId: 2000,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    okc:{
      url: "https://exchainrpc.okex.org",
      chainId: 66,
      accounts:[`${privateKey}`, `${privateKey2}`],
    },
    goerli:{
      url: "https://goerli.infura.io/v3/22d4e358842e4541bd9618b325b5385e",
      chainId: 5,
      accounts:[`${privateKey}`, `${privateKey2}`],
      verify:{
        etherscan:{
          apiKey:ertherScanApiKey,
          apiUrl:""
        }
      }
    },
  },
  namedAccounts:{
    deployer:{
      default:0
    }
  }
};

export default config;
