// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleMarketplace {
    struct Item {
        uint id;
        uint price;
        address seller;
    }

    mapping(uint => Item) public items;
    uint public itemCount;

    event ItemPurchased(uint indexed id, address indexed buyer, uint256 price);

    constructor() {
        // Konstruktor koji hardcodira artikle iz items.json
        listItem(1, 2 ether);         // Dell XPS 13
        listItem(2, 4 ether);         // Samsung Galaxy S25
        listItem(3, 7 ether);         // Apple MacBook Pro 16
        listItem(4, 5 ether);         // Google Pixel 6
        listItem(925927, 9 ether);    // Dyson V11
        listItem(847859, 8 ether);    // HP Spectre x360
        listItem(848148, 4 ether);    // Philips Hue
        listItem(848633, 900000 ether);    // Nest Thermostat
    }

    function listItem(uint id, uint price) public {
        items[id] = Item({
            id: id,
            price: price,
            seller: msg.sender
        });
        itemCount++;
    }

    function purchaseItem(uint itemId) external payable {
        Item storage item = items[itemId];
        require(item.seller != address(0), "Item does not exist");
        require(item.price == msg.value, "Incorrect price sent");

        // Transfer sredstava prodavatelju
        (bool success, ) = item.seller.call{value: msg.value}("");
        require(success, "Transfer to seller failed.");

        emit ItemPurchased(itemId, msg.sender, msg.value);
    }
}
