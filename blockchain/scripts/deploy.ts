async function main() {
  const NullCard=await ethers.getContractFactory("NullCard");
  const nullCard = await NullCard.deploy(); 
  await nullCard.waitForDeployment();
  
  console.log("DocHive deployed to:", await nullCard.getAddress());
  
  const signers = await ethers.getSigners();
  console.log("NullCard deployed by:", signers[0].address);
}
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
  