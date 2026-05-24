const axios = require("axios");

const COLLECTION =
  "EQBAr8-kH8Z0R0K9H8iH0ndgVGslQY4pb4EeYRx_fHId9cxA";

async function checkNFT(wallet) {

  try {

    const url =
      `https://tonapi.io/v2/accounts/${wallet}/nfts?limit=100`;

    const res = await axios.get(url);

    const nfts = res.data.nft_items || [];

    console.log("NFT COUNT:", nfts.length);

    for (const nft of nfts) {

      console.log(
        "NFT:",
        nft.address
      );

      console.log(
        "COLLECTION:",
        nft.collection?.address
      );
    }

    // TEMP TEST
    return nfts.length > 0;

  } catch (err) {

    console.log(
      "NFT ERROR:",
      err.response?.data || err.message
    );

    return false;
  }
}

module.exports = { checkNFT };
