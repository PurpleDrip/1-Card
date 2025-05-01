async function main() {
    const PANValidator = await ethers.getContractFactory("PANValidator");
    const panValidator = await PANValidator.deploy();
    await panValidator.waitForDeployment();
  
    console.log("PANValidator deployed to:", await panValidator.getAddress());
}
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
  