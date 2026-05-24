const axios = require("axios");

const COLLECTION =
  "EQBAr8-kH8Z0R0K9H8iH0ndgVGslQY4pb4EeYRx_fHId9cxA";

async function checkNFT(wallet) {

  try {

    console.log("Checking wallet:", wallet);

    const url =
      `https://tonapi.io/v2/accounts/${wallet}/nfts?limit=100`;

    const res = await axios.get(url);

    const nfts = res.data.nft_items || [];

    console.log("NFT COUNT:", nfts.length);

    if (!nfts.length) {
      console.log("No NFTs returned from API");
      return false;
    }

    for (const nft of nfts) {

      const col =
        nft.collection?.address ||
        nft.collection_address ||
        nft.collection?.owner_address ||
        null;

      console.log("NFT COLLECTION:", col);

      if (
        col &&
        col.toLowerCase() === COLLECTION.toLowerCase()
      ) {
        console.log("MATCH FOUND");
        return true;
      }
    }

    console.log("NO MATCH FOUND");
    return false;

  } catch (err) {

    console.log(
      "TON API ERROR:",
      err.response?.data || err.message
    );

    return false;
  }
}

module.exports = { checkNFT };
