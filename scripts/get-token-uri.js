const { ethers, network } = require("hardhat")

async function getTokenURI() {
    const basicNft = await ethers.getContract("BasicNft")
    const uri = await basicNft.tokenURI("0")
    console.log(uri)
}

getTokenURI()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
