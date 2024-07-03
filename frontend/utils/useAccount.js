import { useState, useEffect } from 'react';
import { web3 } from './web3';
import { useRouter } from 'next/router';

export const useAccount = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [network, setNetwork] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Novo stanje za status prijave
    const router = useRouter();

    // Funkcija za dohvaćanje imena mreže prema ID-u mreže
    const getNetworkName = (networkId) => {
        const networkNames = {
            1: 'Ethereum Mainnet',
            3: 'Ropsten Testnet',
            4: 'Rinkeby Testnet',
            5: 'Goerli Testnet',
            42: 'Kovan Testnet',
            31337: 'Hardhat Localhost',
            5777: 'Ganache',
            10: 'Optimistic Ethereum',
            11: 'Optimistic Kovan'
        };
        return networkNames[networkId] || `Unknown Network (${networkId})`;
    };

    // Funkcija za dohvaćanje detalja o računu
    const getAccountDetails = async () => {
        try {
            const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' }) ?? await web3.eth.getAccounts();
            if (accounts.length > 0) {
                const account = accounts[0];
                const balanceInWei = await web3.eth.getBalance(account);
                const networkId = await web3.eth.net.getId();

                setAccount(account);
                setBalance(web3.utils.fromWei(balanceInWei, 'ether'));
                setNetwork(getNetworkName(Number(networkId)));
                setIsLoggedIn(true); // Korisnik je prijavljen
            } else {
                setIsLoggedIn(false); // Korisnik nije prijavljen
                router.push('/');
            }
        } catch (error) {
            console.error("Error getting account details:", error);
            setNetwork("Error fetching network");
        }
    };

    // Korištenje useEffect za dohvaćanje detalja o računu prilikom promjene router-a
    useEffect(() => {
        getAccountDetails();
    }, [router]);

    return { account, balance, network, isLoggedIn, getAccountDetails };
};
