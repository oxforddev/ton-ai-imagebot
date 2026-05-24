const axios = require("axios");

const COLLECTION =
  "0:40afcfa41fc6744742bd1fc887d27760546b25418e296f811e611c7f7c721df5";

async function checkNFT(wallet) {

  try {

    const url =
      `https://tonapi.io/v2/accounts/${wallet}/nfts?limit=100`;

    const res = await axios.get(url);

    const nfts = res.data.nft_items || [];

    for (const nft of nfts) {

      const address =
        nft.collection?.address;

      if (
        address &&
        address.toLowerCase() ===
        COLLECTION.toLowerCase()
      ) {
        return true;
      }
    }

    return false;

  } catch (err) {

    console.log(
      "NFT ERROR:",
      err.response?.data || err.message
    );

    return false;
  }
}

module.exports = { checkNFT };
