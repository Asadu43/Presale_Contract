/* eslint-disable prettier/prettier */
import { Signer } from "ethers/lib/ethers";
import hre, { ethers } from "hardhat";




async function verify(address: string, args: any[]) {
  try {
    return await hre.run("verify:verify", {
      address: address,
      constructorArguments: args,
      contract: "contracts/OganessonToken.sol:OganessonToken"
    });
  } catch (e) {
    console.log(address, args, e);
  }
}
// sleep function
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {

  const signers: Signer[] = await ethers.getSigners()
    const OganessonToken = await ethers.getContractFactory(
        "OganessonToken",
        signers[1]
      );
      const oganessonToken = await OganessonToken.deploy();

      await oganessonToken.deployTransaction.wait(5);
      console.log("Ognnn",oganessonToken.address);

      await verify(oganessonToken.address, []);


      // npx hardhat verify  --contract "contracts/OganessonToken.sol:OganessonToken"  --network sepolia 0xa6aA33Cdf55B49eaA9b6f3E91D4eD4747b791379

      // npx hardhat run ./scripts/contract/deploy.ts --network sepolia
    }
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
