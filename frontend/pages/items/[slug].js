import { useState } from 'react';
import Image from 'next/image';
import { getAllItems } from '@/app/components/content/fetch';
import { handlePurchase } from '../../utils/purchase';
import { useAccount } from '../../utils/useAccount';
import React from 'react';


const Item = ({ item }) => {
    const { account, isLoggedIn } = useAccount(); // Korištenje hook-a za dobivanje računa i statusa prijave

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md relative">
            <div className="uppercase tracking-wide text-custom-blue-300 font-semibold mb-2">{item.type}</div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{item.title}</h1>
            <Image
                src={item.coverImage}
                alt={item.title}
                width={800}
                height={450}
                className="w-full h-auto mb-4 rounded-md"
            />
            <p className="text-lg text-gray-700 mb-4">{item.description}</p>
            <p className="text-2xl font-bold text-custom-blue-500 mb-4">Price: {item.price} ETH</p>
            <a href={item.link} className="text-custom-blue-500 hover:underline mb-4 block">Learn more</a>
            <h2 className="text-2xl font-bold text-custom-blue-300 mb-2">Advantages</h2>
            <ul className="list-disc pl-5 mb-4">
                {item.pros.map((pro, index) => (
                    <li key={index} className="text-lg text-gray-700">{pro}</li>
                ))}
            </ul>
            <button 
                onClick={() => handlePurchase(item.id, item.price, account, isLoggedIn)} 
                className="absolute bottom-8 right-8 bg-custom-blue-400 text-white px-4 py-2 rounded-md hover:bg-custom-blue-300">
                Purchase
            </button>
        </div>
    );
};

export async function getStaticPaths() {
    const { data: items } = getAllItems(); // Dohvaćanje svih stavki
    const paths = items.map(item => ({
        params: { slug: item.slug },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { data: items } = getAllItems(); // Dohvaćanje svih stavki
    const item = items.find(item => item.slug === params.slug);
    return { props: { item } };
}

export default Item;
