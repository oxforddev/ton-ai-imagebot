const axios = require("axios");

// YOUR NFT COLLECTION ADDRESS
const COLLECTION = "EQBAr8-kH8Z0R0K9H8iH0ndgVGslQY4pb4EeYRx_fHId9cxA";

async function checkNFT(wallet) {

  try {

    console.log("Checking wallet:", wallet);

    const url =
      `https://tonapi.io/v2/accounts/${wallet}/nfts`;

    const response = await axios.get(url);

    const nfts = response.data.nft_items || [];

    console.log("NFT COUNT:", nfts.length);

    // DEBUG ALL NFT COLLECTIONS
    nfts.forEach((nft, index) => {

      console.log(
        `NFT ${index}:`,
        nft.collection?.address
      );

    });

    const ownsNFT = nfts.some((nft) => {

      return (
        nft.collection &&
        nft.collection.address &&
        nft.collection.address.toLowerCase() ===
        COLLECTION.toLowerCase()
      );

    });

    console.log("NFT VERIFIED:", ownsNFT);

    return ownsNFT;

  } catch (error) {

    console.log(
      "NFT check error:",
      error.response?.data || error.message
    );

    return false;
  }
}

module.exports = { checkNFT };
