import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
    
    return (
        <section className="bg-white">
            <div className="relative px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between h-16" aria-label="Global">
                    <div className="flex items-center">
                        <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</Link>
                        { 
                            <Link href="/my-account" className="font-medium mr-8 text-gray-500 hover:text-gray-900">My Account</Link>
                        }
                    </div>
                    <div className="flex items-center">
                       
                            <span
                                className="px-4 py-2 border rounded-md text-base font-medium text-white bg-custom-blue-400 hover:bg-custom-blue-300 cursor-pointer"
                            >
                                Connect
                            </span>
                            <>
                                <span className="font-medium mr-8 text-custom-blue-400">
                                    Connected: 
                                </span>
                                <span
                                    
                                    className="font-medium ml-4 text-custom-blue-400 hover:text-custom-blue-300 cursor-pointer"
                                >
                                    Log Out
                                </span>
                            </>
                        
                    </div>
                </nav>
            </div>
        </section>
    );
}
