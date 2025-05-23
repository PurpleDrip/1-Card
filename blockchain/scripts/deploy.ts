async function main() {
  const DocHive=await ethers.getContractFactory("DocHive");
  const docHive = await DocHive.deploy(); 
  await docHive.waitForDeployment();
  
  console.log("DocHive deployed to:", await docHive.getAddress());
  
  const signers = await ethers.getSigners();
  console.log("DocHive deployed by:", signers[0].address);
}
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
  