import React, { useState, useEffect } from 'react';
import { web3 } from '../../../utils/web3';
import Link from 'next/link';

export default function NavBar() {
    const [account, setAccount] = useState('');
    const [network, setNetwork] = useState('');

    const checkMetaMask = () => {
        if (typeof window.ethereum !== 'undefined') {
            return true;
        } else {
            alert('Please install MetaMask to use this feature!');
            return false;
        }
    };

    const connectMetaMask = async () => {
        if (checkMetaMask()) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                const networkId = await web3.eth.net.getId();
                setNetwork(getNetworkName(networkId));
                console.log('Connected to network:', getNetworkName(networkId));
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        }
    };

    const getNetworkName = (networkId) => {
        switch (networkId) {
            case 1: return 'Ethereum Mainnet';
            case 3: return 'Ropsten Testnet';
            case 4: return 'Rinkeby Testnet';
            case 5: return 'Goerli Testnet';
            case 42: return 'Kovan Testnet';
            case 1337: return 'Localhost';
            case 5777: return 'Ganache';
            case 10: return 'Bitcoin Mainnet';
            case 11: return 'Bitcoin Testnet';
            default: return 'Unknown Network';
        }
    };

    useEffect(() => {
        const getAccount = async () => {
            if (checkMetaMask()) {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    const networkId = await web3.eth.net.getId();
                    setNetwork(getNetworkName(networkId));
                }
            }
        };
        getAccount();
    }, []);

    const disconnectMetaMask = () => {
        setAccount('');
        setNetwork('');
    };

    return (
        <section className="bg-white">
            <div className="relative px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between h-16" aria-label="Global">
                    <div className="flex items-center">
                        <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</Link>
                        {account && (
                            <Link href="/my-account" className="font-medium mr-8 text-gray-500 hover:text-gray-900">My Account</Link>
                        )}
                    </div>
                    <div className="flex items-center">
                        {!account ? (
                            <span
                                onClick={connectMetaMask}
                                className="px-4 py-2 border rounded-md text-base font-medium text-white bg-custom-blue-400 hover:bg-custom-blue-300 cursor-pointer"
                            >
                                Connect
                            </span>
                        ) : (
                            <>
                                <span className="font-medium mr-8 text-custom-blue-400">
                                    Connected: {account.slice(0, 6)}...{account.slice(-4)}
                                </span>
                                <span
                                    onClick={disconnectMetaMask}
                                    className="font-medium ml-4 text-custom-blue-400 hover:text-custom-blue-300 cursor-pointer"
                                >
                                    Log Out
                                </span>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </section>
    );
}
