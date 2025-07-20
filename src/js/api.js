import { rendertrending, renderDataRow } from "./ui.js";
import { rnderBtcMarketCap } from "./chart.js";
export async function trendingCoinsApi() {
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    // console.log(data.coins);
    const elm = document.querySelector(".trending-coins");
    data.coins.forEach((data, index) => rendertrending(data.item, elm, index));
  } catch (error) {
    console.log(error);
  }
}
trendingCoinsApi();

export async function trendingDifeApi() {
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    // console.log(data);
    const elm = document.querySelector(".trending-defi");
    data.forEach((data, index) => rendertrending(data, elm, index));
  } catch (error) {
    console.log(error);
  }
}
trendingDifeApi();

export async function btcMarketCapApi() {
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
    );
    // console.log(data);
    const labels = data.prices.map((price) => {
      const date = new Date(price[0]);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const prices = data.prices.map((price) => price[1]);

    rnderBtcMarketCap(labels, prices);
  } catch (error) {
    console.log(error);
  }
}
btcMarketCapApi();

export async function allCryptoApi() {
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
    );
    console.log(data);
    data.forEach((data,index)=>renderDataRow(data,index))
  } catch (error) {
    console.log(error);
  }
}
allCryptoApi();
