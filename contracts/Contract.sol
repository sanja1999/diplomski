// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleMarketplace {
    struct Item {
        uint id;
        uint price;
        address seller;
        address buyer;
    }

    mapping(uint => Item) public items;
    uint public itemCount;

    event ItemPurchased(uint indexed id, address indexed buyer, uint256 price);

    constructor() {
        // Initial items for demonstration purposes
        listItem(1 ether);
        listItem(2 ether);
        listItem(3 ether);
    }

    function listItem(uint price) public {
        itemCount++;
        items[itemCount] = Item({
            id: itemCount,
            price: price,
            seller: msg.sender,
            buyer: address(0)
        });
    }

    function purchaseItem(uint itemId) external payable {
        Item storage item = items[itemId];
        require(item.seller != address(0), "Item does not exist");
        require(item.price == msg.value, "Incorrect price sent");
        require(item.buyer == address(0), "Item already sold");

        item.buyer = msg.sender;

        // Transfer funds to the seller
        (bool success, ) = item.seller.call{value: msg.value}("");
        require(success, "Transfer to seller failed.");

        emit ItemPurchased(itemId, msg.sender, msg.value);
    }
}
