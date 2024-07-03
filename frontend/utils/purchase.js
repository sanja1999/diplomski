import { web3, simpleMarketplaceContract } from './web3';

export const handlePurchase = async (itemId, price, account, isLoggedIn) => {
    if (!isLoggedIn) {
        alert('You are not logged in. Please log in to MetaMask.');
        return;
    }

    try {
        // Pretvorba cijene u Wei
        const priceInWei = web3.utils.toWei(price.toString(), 'ether');

        // Dohvaćanje stanja računa
        const balanceInWei = await web3.eth.getBalance(account);

        // Provjera ima li račun dovoljno sredstava
        if (parseInt(balanceInWei) < parseInt(priceInWei)) {
            alert('Insufficient balance to complete the purchase.');
            return;
        }

        await simpleMarketplaceContract.methods.purchaseItem(itemId).send({
            from: account,
            value: priceInWei
        });
    } catch (error) {
        console.error("Error purchasing item:", error);
    }
};
