const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SimpleMarketplaceModule = buildModule("SimpleMarketplaceModule", (m) => {
  const marketplace = m.contract("SimpleMarketplace");

  return { marketplace };
});

module.exports = SimpleMarketplaceModule;
