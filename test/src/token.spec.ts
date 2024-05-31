/* eslint-disable node/no-missing-import */
/* eslint-disable prettier/prettier */
import { expect, use } from "chai";
import { Contract, BigNumber, Signer } from "ethers";
import hre, { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("DEX", function () {
  let owner: any;
  let user: SignerWithAddress;
  let user1: SignerWithAddress;

  let token: Contract;
  let dex: Contract;
  let usdt: Contract;

  before(async () => {
    [owner, user, user1] = await ethers.getSigners();

    // signer = await Impersonate("0x5C549Af8293F7F79Dc2cf817aA270099e3432830");

    const OganessonToken = await ethers.getContractFactory(
      "OganessonToken",
      owner
    );
    token = await OganessonToken.deploy();

    const USDT = await ethers.getContractFactory(
      "USDT",
      owner
    );
    usdt = await USDT.deploy();

    const Dex = await ethers.getContractFactory("Dex", owner);

    dex = await Dex.deploy(token.address, usdt.address);
  });

  it("Functions", async function () {
    console.log(owner.address);
    // console.log(dex.functions);
    // console.log(usdt.functions);
    // console.log(await usdt.balanceOf(owner.address));
    // await token.transfer(dex.address, parseEther("1000000000000"));
  

    // console.log(await dex.getETHForUSDT())
    // await dex.connect(user).buy({ value: parseEther("0.000416301562458152")});
    // await dex.connect(user).buy({ value: parseEther("0.1") });

    // console.log(await dex.connect(user).checkAmountToken({ value: parseEther("1") }));

    // await dex.connect(owner).withdrawOGNN();
  });

  it("Buy Token without transfer token to contract", async function () {
    await expect(
      dex.connect(user).buy({ value: parseEther("3") })
    ).to.be.revertedWith("Not enough tokens in the reserve");
  });
  // it("Buy Token without Amount", async function () {
  //   await expect(
  //     dex.connect(user).buy({ value: parseEther("0.01") })
  //   ).to.be.revertedWith("You need to send some ether");
  // });

  it("should Transfer Token to DEX Contract", async function () {
    await token.approve(dex.address, parseEther("1000000"));
    await token.transfer(dex.address, parseEther("1000000000000"));
    await usdt.transfer(user.address, 2000000000);
    // console.log(token.functions);
    // console.log(dex.functions);
  });

  it("Dex Token Balance", async function () {
    expect(await dex.getBalanceOfToken()).to.be.equal(parseEther("1000000000000"));
  });

  it("Buy Token", async function () {
    await dex.connect(user).buy({ value: parseEther("0.56") });
  });

  it("User Token Balance", async function () {
    console.log(await token.balanceOf(user.address));
    console.log(await dex.getBalance());
    // expect(await token.balanceOf(user.address)).to.be.equal(parseEther("130"))
  });

  it("Check Contract Balance", async function () {
    console.log(await token.balanceOf(user.address));
    console.log(await dex.getBalance());
    expect(await dex.getBalance()).to.be.equal(parseEther("0.56"));
  });

  it("Ownable: caller is not the owner", async function () {
    await expect(dex.connect(user).withdrawMoney()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it(" Withdraw Balance OnlyOwner ", async function () {
    await dex.connect(owner).withdrawMoney();
  });


  it("Buy USDT without Approve", async function () {
    // await usdt.connect(owner).approve(dex.address, 1223000000)
    await expect(dex.connect(owner).buyWithUSDT(1223000000)).to.be.revertedWith(
      "ERC20: insufficient allowance"
    );
  });

  it("Approve USDT  ", async function () {
    await usdt.connect(owner).approve(dex.address, 2000000000)
    await usdt.connect(user).approve(dex.address, 2000000000)
  });

  it("Buy USDT with Less Amount", async function () {
    // await usdt.connect(owner).approve(dex.address, 1223000000)
    await expect(dex.connect(owner).buyWithUSDT(12230)).to.be.revertedWith(
      "You need to send at least 1 USDT"
    );
  });

  it("Buy USDT", async function () {
    await dex.connect(owner).buyWithUSDT(2000000000);
    await dex.connect(user).buyWithUSDT(2000000000);
  });

  it("User Token Balance", async function () {
    console.log(await token.balanceOf(owner.address));
    console.log(await dex.getBalance());
    console.log(await dex.getBalanceOfUSDTToken());
    
    // expect(await oganessonToken.balanceOf(user.address)).to.be.equal(parseEther("130"))
  });

});
