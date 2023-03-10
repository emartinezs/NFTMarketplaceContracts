const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/moveBlocks")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")

    console.log("Minting...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId

    console.log("Approving Nft...")
    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)

    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("Listed")

    console.log("----------------------------------")
    const events = await nftMarketplace.queryFilter({
        address: nftMarketplace.address,
        topics: [],
    })
    events.forEach((event) => {
        console.log(event.event)
        if (event.event == "ItemListed") {
            console.log("Seller: " + event.args.seller)
            console.log("NFT Addresss: " + event.args.nftAddress)
            console.log("Token ID: " + event.args.tokenId.toString())
            console.log("Price: " + event.args.price.toString())
        }
        console.log("----------------------------------")
    })

    if (network.config.chainId == 31337) {
        await moveBlocks(1, (sleepAmount = 1000))
    }
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
