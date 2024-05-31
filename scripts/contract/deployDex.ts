/* eslint-disable prettier/prettier */
import { Signer } from "ethers/lib/ethers";
import hre, { ethers } from "hardhat";




async function verify(address: string, args: any[]) {
  try {
    return await hre.run("verify:verify", {
      address: address,
      constructorArguments: args,
      contract: "contracts/Dex.sol:Dex"
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
  const Dex = await ethers.getContractFactory("Dex", signers[1]);
  const dexToken = await Dex.deploy("0xFeC72a81bd609df200787B8bb97A1b8f39178203","0x7169D38820dfd117C3FA1f22a697dBA58d90BA06");


      await dexToken.deployTransaction.wait(5);
      console.log("dexToken",dexToken.address);
      

      await verify(dexToken.address, ["0xFeC72a81bd609df200787B8bb97A1b8f39178203","0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"]);


      // npx hardhat verify  --contract "contracts/OganessonToken.sol:OganessonToken"  --network sepolia 0xa6aA33Cdf55B49eaA9b6f3E91D4eD4747b791379

      // npx hardhat run ./scripts/contract/deploy.ts --network sepolia
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
