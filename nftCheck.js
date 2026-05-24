const axios = require("axios");

const COLLECTION =
  "EQBAr8-kH8Z0R0K9H8iH0ndgVGslQY4pb4EeYRx_fHId9cxA";

async function checkNFT(wallet) {

  try {

    console.log("Checking wallet:", wallet);

    const response = await axios.get(
      `https://tonapi.io/v2/accounts/${wallet}/nfts`
    );

    const nfts = response.data.nft_items || [];

    console.log("NFT count:", nfts.length);

    for (const nft of nfts) {

      const address =
        nft.collection?.address;

      console.log("NFT collection:", address);

      if (
        address &&
        address.trim().toLowerCase() ===
        COLLECTION.trim().toLowerCase()
      ) {

        console.log("NFT VERIFIED");

        return true;
      }
    }

    console.log("NFT NOT FOUND");

    return false;

  } catch (err) {

    console.log(
      "NFT CHECK ERROR:",
      err.response?.data || err.message
    );

    return false;
  }
}

module.exports = { checkNFT };
