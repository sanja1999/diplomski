import { web3, simpleMarketplaceContract } from './web3';

export const purchaseItem = async (itemId, price) => {
    const connection = await checkMetaMaskConnection();
    if (!connection) {
        setError("MetaMask is not installed or not connected");
        console.log("MetaMask is not installed or not connected");
        setLoading(false);
        return;
    }
};
