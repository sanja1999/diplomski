import Web3 from 'web3';
import simpleMarketplaceArtifact from '../../ignition/deployments/chain-31337/artifacts/SimpleMarketplaceModule#SimpleMarketplace.json';

let web3;
let simpleMarketplaceContract;

// Postavite statičku adresu ugovora
const contractAddress = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
const contractABI = simpleMarketplaceArtifact.abi;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Nalazimo se u pregledniku i MetaMask je pokrenut.
  web3 = new Web3(window.ethereum);
  // Zatražite pristup korisnikovom MetaMask računu.
  window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
    simpleMarketplaceContract = new web3.eth.Contract(contractABI, contractAddress);
    console.log(`Contract instance created: ${contractAddress}`);

    // Dohvatite broj stavki kao provjeru
    simpleMarketplaceContract.methods.itemCount().call().then(itemCount => {
      console.log(`Item Count from contract: ${itemCount}`);
    }).catch(err => console.error('Error fetching item count:', err));
  }).catch(err => console.error(err));
} else {
  // Nalazimo se na poslužitelju *ILI* korisnik ne koristi MetaMask
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545'); // Hardhat
  web3 = new Web3(provider);
  simpleMarketplaceContract = new web3.eth.Contract(contractABI, contractAddress);
  console.log(`Contract instance created: ${contractAddress}`);

  // Dohvatite broj stavki kao provjeru
  simpleMarketplaceContract.methods.itemCount().call().then(itemCount => {
    console.log(`Item Count from contract: ${itemCount}`);
  }).catch(err => console.error('Error fetching item count:', err));
}

export { web3, simpleMarketplaceContract };
