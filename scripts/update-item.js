const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/moveBlocks")

const TOKEN_ID = 5
const NEW_PRICE = ethers.utils.parseEther("0.2")

async function updateItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    const tx = await nftMarketplace.updateListing(basicNft.address, TOKEN_ID, NEW_PRICE)
    await tx.wait(1)
    console.log("NFT Updated")

    if (network.config.chainId == "31337") {
        await moveBlocks(1, (sleepAmount = 1000))
    }
}

updateItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
