import { ethers, tenderly } from "hardhat";

async function main() {
  const weatherOracleContract = await ethers.getContractFactory("WeatherOracle");
  const weatherOracleContractDeploy = await weatherOracleContract.deploy();

  await weatherOracleContractDeploy.deploymentTransaction;
  console.log("Deployed ....", {weatherOracleContractDeploy});

//   await tenderly.verify({
//     name: "WeatherOracle",
//     // address: (weatherOracleContractDeploy.target).toString(),
//     address:"0xb52d71490448fc14dbcea426086e2af1a19ea846"
//   });
//   console.log("Verified .....");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
