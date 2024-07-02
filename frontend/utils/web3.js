// utils/web3.js

import Web3 from 'web3';
import simpleMarketplaceArtifact from '../../ignition/deployments/chain-31337/artifacts/SimpleMarketplaceModule#SimpleMarketplace.json';

let web3;
let simpleMarketplaceContract;

const getContractAddress = async () => {
  // Contract address is directly available in the artifact
  return simpleMarketplaceArtifact.address;
};

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and MetaMask is running.
  web3 = new Web3(window.ethereum);
  // Request access to the user's MetaMask account.
  window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
    getContractAddress().then(contractAddress => {
      simpleMarketplaceContract = new web3.eth.Contract(simpleMarketplaceArtifact.abi, contractAddress);
      console.log(`Contract instance created: ${contractAddress}`);
    });
  }).catch(err => console.error(err));
} else {
  // We are on the server *OR* the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545'); // Hardhat
  web3 = new Web3(provider);

  getContractAddress().then(contractAddress => {
    simpleMarketplaceContract = new web3.eth.Contract(simpleMarketplaceArtifact.abi, contractAddress);
    console.log(`Contract instance created: ${contractAddress}`);
  });
}

export { web3, simpleMarketplaceContract };
