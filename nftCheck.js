const axios = require("axios");

// PUT YOUR NFT COLLECTION ADDRESS HERE
const COLLECTION = "EQBAr8-kH8Z0R0K9H8iH0ndgVGslQY4pb4EeYRx_fHId9cxA";

async function checkNFT(wallet) {
  try {

    const url =
      `https://tonapi.io/v2/accounts/${wallet}/nfts`;

    const response = await axios.get(url);

    const nfts = response.data.nft_items || [];

    const ownsNFT = nfts.some(
      nft => nft.collection?.address === COLLECTION
    );

    return ownsNFT;

  } catch (error) {

    console.log("NFT check error:", error.message);

    return false;
  }
}

module.exports = { checkNFT };
