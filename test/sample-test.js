const { expect } = require("chai");
const { ethers } = require("hardhat");

// Test from https://github.com/fireship-io/web3-nft-dapp-tutorial/blob/main/test/sample-test.js
describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Dropit = await ethers.getContractFactory("Dropit");
    const contract = await Dropit.deploy();
    await contract.deployed();

    const recipient = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';
    const metadataURI = 'cid/test.png';

    let balance = await contract.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await contract.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await contract.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await contract.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await contract.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});
