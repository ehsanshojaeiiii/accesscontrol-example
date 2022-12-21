import { expect } from "chai";
import { ethers } from "hardhat";

describe("Akka", function () {

  describe("Deployment", function () {

    it("Should should return string", async function () {
      const Akka = await ethers.getContractFactory("Akka");
      const akka = await Akka.deploy();

      await akka.deployed();
      await expect(await akka.helloDeFi()).equal('Akka Finance')
    });
  });
});
