const ethers = require('ethers');
const RAFSystem = require('./contract-abis/RAFSystem.json');

export const getProvider = () => {
    if(window.ethereum && window.ethereum.isMetaMask){
        return new ethers.providers.InfuraProvider(process.env.NETWORKS, process.env.ENDPOINT_KEY);
    }
}


export const getContract = async () => {
    const provider = await getProvider();
    let wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
    
    wallet = wallet.connect(provider);
    
    const contractAddress = RAFSystem.networks["4"].address;

    return new ethers.Contract(contractAddress, RAFSystem.abi, wallet);
}

export const userInfo = async () => {
    const RAFContract = await getContract();

    const name = RAFContract.isProfessor()
}