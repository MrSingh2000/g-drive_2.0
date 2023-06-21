require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./client/src/artifacts",
  }
};
