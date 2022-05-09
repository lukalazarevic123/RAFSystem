const RAFSystem = artifacts.require("RAFSystem");
const RAFOcene = artifacts.require("RAFOceneNFT");

module.exports = async function(deployer){
    await deployer.deploy(RAFOcene);

    const NFT = await RAFOcene.deployed();

    await deployer.deploy(RAFSystem, NFT.address);

    const SYSTEM = await RAFSystem.deployed();

    await NFT.authorize(SYSTEM.address);
}