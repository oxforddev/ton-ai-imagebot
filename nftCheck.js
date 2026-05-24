const axios = require("axios");

async function checkNFT(wallet) {

  try {

    const url =
      `https://tonapi.io/v2/accounts/${wallet}/nfts?limit=100`;

    const res = await axios.get(url);

    const nfts = res.data.nft_items || [];

    console.log("========== NFT DEBUG ==========");

    console.log(
      JSON.stringify(nfts, null, 2)
    );

    console.log("========== END DEBUG ==========");

    // TEMP: allow any NFT
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
