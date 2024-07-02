import React from 'react';
import Link from 'next/link';
import { useAccount } from '../../../utils/useAccount';

export default function NavBar() {
    const { account, setAccount, network, setNetwork, getAccountDetails } = useAccount();

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
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                getAccountDetails(); // Update account details after connecting
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        }
    };

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
