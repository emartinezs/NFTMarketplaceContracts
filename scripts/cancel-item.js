const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/moveBlocks")

const TOKEN_ID = 3

async function cancelItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    const tx = await nftMarketplace.cancelListing(basicNft.address, TOKEN_ID)
    await tx.wait(1)
    console.log("NFT Canceled")

    if (network.config.chainId == "31337") {
        await moveBlocks(1, (sleepAmount = 1000))
    }
}

cancelItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
