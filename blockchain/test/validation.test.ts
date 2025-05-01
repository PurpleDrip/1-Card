const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Document Validation", function () {
  async function deployContractsFixture() {
    const [owner] = await ethers.getSigners();
    const PANValidator = await ethers.getContractFactory("PANValidator");
    
    const panValidator = await PANValidator.deploy();

    return {  panValidator, owner };
  }

  it("Should validate correct PAN", async function () {
    const { panValidator } = await loadFixture(deployContractsFixture);
    expect(await panValidator.validatePAN("ABCDE1234F")).to.be.true;
    expect(await panValidator.validatePAN("ABCD51234F")).to.be.false;
  });
});
