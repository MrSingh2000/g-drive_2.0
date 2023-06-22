require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/59ad491c517c444daafca3b6c64663f5",
      accounts: ['28bcd28eb8dfbf42763e0785c3a8f6f76b5aad29a7fb9f38c3d4b560c33ec9ad']
    }
  }
};
