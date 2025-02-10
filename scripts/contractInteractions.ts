import { ethers, tenderly } from "hardhat";

async function main() {
  const weatherOracleContract = await ethers.getContractFactory("WeatherOracle");

  const weatherOracleInstance=weatherOracleContract.attach("0xb52d71490448Fc14DbCEa426086e2AF1A19Ea846")
  console.log("Requesting Weather for Dhaka ......");
  const location = "Dhaka"
  await weatherOracleInstance.requestWeather(location);
  console.log("requested...")

// const requestId = await weatherOracleInstance.getUserRequests("0x82b913c26ff4af56b5cbd4c2b7f4196aa40585f3");
  
//   console.log("The request id = ",{requestId})

//   await tenderly.verify({
//     name: "WeatherOracle",
//     // address: (weatherOracleContractDeploy.target).toString(),
//     address:"0xb52d71490448fc14dbcea426086e2af1a19ea846"
//   });
//   console.log("Verified .....");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
