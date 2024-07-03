import Web3 from 'web3';
import simpleMarketplaceArtifact from '../../ignition/deployments/chain-31337/artifacts/SimpleMarketplaceModule#SimpleMarketplace.json';

let web3;
let simpleMarketplaceContract;

// Postavljanje statičke adrese ugovora
const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';
const contractABI = simpleMarketplaceArtifact.abi;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Provjera okruženja preglednika i pokretanja MetaMask-a
  web3 = new Web3(window.ethereum);
  // Zahtjev za pristup MetaMask računu korisnika
  window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
    simpleMarketplaceContract = new web3.eth.Contract(contractABI, contractAddress);

    // Dohvaćanje broja stavki kao provjera
    simpleMarketplaceContract.methods.itemCount().call().catch(err => {
      alert('Error fetching item count: ' + err.message);
    });
  }).catch(err => {
    alert('Error requesting MetaMask accounts: ' + err.message);
  });
} else {
  // Postavljanje na poslužitelju
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545'); // Hardhat
  web3 = new Web3(provider);
  simpleMarketplaceContract = new web3.eth.Contract(contractABI, contractAddress);

  // Dohvaćanje broja stavki kao provjera
  simpleMarketplaceContract.methods.itemCount().call().catch(err => {
    alert('Error fetching item count: ' + err.message);
  });
}

export { web3, simpleMarketplaceContract };
