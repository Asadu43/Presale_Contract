// /* eslint-disable node/no-missing-import */
// /* eslint-disable prettier/prettier */
// import { expect, use } from "chai";
// import { Contract, BigNumber, Signer } from "ethers";
// import hre, { ethers } from "hardhat";
// import { parseEther } from "ethers/lib/utils";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { Impersonate } from "../utils/utilities";

// const UNISWAPV2_FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
// const USDC_TOKEN = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
// const WETH_TOKEN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const ADAI_V2 = "0x028171bCA77440897B824Ca71D1c56caC55b68A3";

// const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// const HDRN = "0xF2E3A6Ba8955B345a88E5013D9a299c0E83a787e";

// const BUSD = "0x4Fabb145d64652a948d72533023f6E7A623C7C53";
// const RAI = "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919";
// const BAT = "0x7abE0cE388281d2aCF297Cb089caef3819b13448";
// const aToken = "0x030ba81f1c18d280636f32af80b9aad02cf0854e";
// const AWETH_V2 = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

// describe.only("DEX", function () {
//   let signer: SignerWithAddress;
//   let user: SignerWithAddress;
//   let user1: SignerWithAddress;

//   let dex: Contract;
//   let usdt: Contract;

//   before(async () => {

//     user = await Impersonate("0xC06f25517E906b7F9B4deC3C7889503Bb00b3370");
//     user1 = await Impersonate("0x41171B1D22a41F0Ce7F9933143Aa15B580104a31");
//     signer = await Impersonate("0xFdFB3469c4222F08Cb71446f0F4759f5C9796FbC");

//     hre.tracer.nameTags[signer.address] = "ADMIN";

//     dex = await ethers.getContractAt("IDEX", "0xd055d48795D62D1Bca8EE9789Ebf7c77c08768E0", signer);

//     usdt = await ethers.getContractAt("IERC20", USDT);

  
//   });

//   it("Functions", async () => {
//     console.log(await usdt.balanceOf(user.address))
//     console.log(await dex.functions)


//     console.log(await dex.getBalanceOfToken())

//     await dex.connect(user).buy({ value: parseEther("0.001")});

//     await usdt.connect(user).approve(dex.address, 2000000000)

//     await dex.connect(user).buyWithUSDT(1000000);


//   });
 

// });


