import { useState, useEffect } from 'react';
import { web3 } from './web3';
import { useRouter } from 'next/router';

export const useAccount = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [network, setNetwork] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
    const router = useRouter();

    const getNetworkName = (networkId) => {
        switch (networkId) {
            case 1: return 'Ethereum Mainnet';
            case 3: return 'Ropsten Testnet';
            case 4: return 'Rinkeby Testnet';
            case 5: return 'Goerli Testnet';
            case 42: return 'Kovan Testnet';
            case 31337: return 'Hardhat Localhost';
            case 5777: return 'Ganache';
            case 10: return 'Optimistic Ethereum';
            case 11: return 'Optimistic Kovan';
            default: return `Unknown Network (${networkId})`;
        }
    };

    const getAccountDetails = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsLoggedIn(true); // User is logged in
                    const balance = await web3.eth.getBalance(accounts[0]);
                    setBalance(web3.utils.fromWei(balance, 'ether'));
                    const networkId = await web3.eth.net.getId();
                    setNetwork(getNetworkName(Number(networkId)));
                }
            } else {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsLoggedIn(true); // User is logged in
                    const balance = await web3.eth.getBalance(accounts[0]);
                    setBalance(web3.utils.fromWei(balance, 'ether'));
                    const networkId = await web3.eth.net.getId();
                    setNetwork(getNetworkName(Number(networkId)));
                } else {
                    setIsLoggedIn(false); // User is not logged in
                    router.push('/');
                }
            }
        } catch (error) {
            console.error("Error getting account details:", error);
            setNetwork("Error fetching network");
        }
    };

    useEffect(() => {
        getAccountDetails();
    }, [router]);

    return { account, balance, network, isLoggedIn, getAccountDetails };
};
