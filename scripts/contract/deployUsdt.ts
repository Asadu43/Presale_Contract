/* eslint-disable prettier/prettier */
import { Signer } from "ethers/lib/ethers";
import hre, { ethers } from "hardhat";

async function verify(address: string, args: any[]) {
  try {
    return await hre.run("verify:verify", {
      address: address,
      constructorArguments: args,
      contract: "contracts/USDT.sol:USDT",
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
  const signers: Signer[] = await ethers.getSigners();
  const USDT = await ethers.getContractFactory("USDT", signers[1]);
  const usdt = await USDT.deploy();
  await usdt.deployTransaction.wait(5);
  console.log("USDT", usdt.address);

  await verify(usdt.address, []);

  // npx hardhat verify  --contract "contracts/USDT.sol:USDT"  --network sepolia 0x5E02cB2b0f0C9243E00e31BA7C3831A02DF893b4

  // npx hardhat run ./scripts/contract/deploy.ts --network sepolia
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
