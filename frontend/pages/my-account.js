import React from 'react';
import { useAccount } from '../utils/useAccount';

export default function MyAccount() {
    const { account, balance, network } = useAccount();

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
                <section className="text-white bg-custom-blue-500 rounded-lg shadow-lg p-8 flex-1 h-full lg:h-96 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4">Welcome, {account}</h1>
                        <h2 className="text-2xl mb-5">I hope you're having a fantastic day!</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-end">
                        <div className="flex flex-col items-center sm:items-start mb-4">
                            <p className="text-xl">Your current balance is:</p>
                            <p className="text-3xl font-bold">{balance} ETH</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-end mt-6 sm:mt-0 mb-4">
                            <p className="text-lg">Network Status:</p>
                            <p className="text-2xl font-semibold">{network}</p>
                        </div>
                    </div>
                </section>
                <img
                    src="https://images.unsplash.com/photo-1641932269869-46d52e20d8a1?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Ethereum"
                    className="object-cover w-full h-full rounded-lg lg:w-auto lg:h-96"
                />
            </div>
        </div>
    );
}
