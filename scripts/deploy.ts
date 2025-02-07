import { ethers, tenderly } from "hardhat";

async function main() {
  const weatherOracleContract = await ethers.getContractFactory("WeatherOracle");
//   const weatherOracleContractDeploy = await weatherOracleContract.deploy();

//   await weatherOracleContractDeploy.deploymentTransaction;
//   console.log("Deployed ....");

  // const [_, secondSigner] = await ethers.getSigners();

  const weatherOracleInstance=weatherOracleContract.attach("0xb52d71490448fc14dbcea426086e2af1a19ea846")
  console.log("Requesting Weather for Dhaka ......");
  const location = "Dhaka"
  await weatherOracleInstance.requestWeather(location);

const requestId = await weatherOracleInstance.getUserRequests("0xaF095dbbe97221FB16DD517b52f1Ee69d8F3728c");
  
  console.log("The request id = ",{requestId})

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
