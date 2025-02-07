import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import * as tenderly from "@tenderly/hardhat-tenderly";

tenderly.setup({ automaticVerifications: false });
// console.log(process.env);
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
  networks: {
    tenderly: {
      // npm run spawn-devnet-to-hardhat project-slug devnet-template-slug
      // or spawn in Dashboard and copy manually
      url: "https://virtual.gnosis.rpc.tenderly.co/ec5a3bb8-25f2-465b-b038-e3fc43b11f60",
      chainId: 100, // Gnosis
      accounts: [PRIVATE_KEY],
    },
    tenderlyPolygon: {
      url: `https://polygon-amoy.gateway.tenderly.co/50lAO5HXu1R3RfGkzJeE51`,
      chainId: 80002, // Polygon Amoy testnet chain ID
      accounts: [PRIVATE_KEY],
    },
  },
  // // point to your project

  // tenderly: {
  //   project: "testCCP",
  //   username: "Suvadra",
  //   accessKey: process.env.TENDERLY_ACCESS_KEY,
  //   privateVerification: process.env.TENDERLY_PUBLIC_VERIFICATION !== "true",
  // },

  solidity: {
    compilers: [{ version: "0.8.18" }],
    overrides: {
      // indicate the exact settings used by OZ for compiling the contracts you're using
      "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol": {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol":
        {
          version: "0.8.9",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
          },
        },

      "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol": {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol": {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  mocha: {
    timeout: 4 * 60 * 1000,
  },
};

export default config;
