import { rendertrending } from "./ui.js";
import {rnderBtcMarketCap} from "./chart.js"
export async function trendingCoinsApi() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/search/trending",
      config
    );
    // console.log(data.coins);
    const elm = document.querySelector(".trending-coins");
    data.coins.forEach((data, index) =>
      rendertrending(data.item, elm, index)
    );
    const mmad =document.querySelector(".all-crypto-container");
       data.coins.forEach((data, index) =>
      rendertrending(data.item, mmad, index)
    );
  } catch (error) {
    console.log(error);
  }
}
trendingCoinsApi();

export async function trendingDifeApi() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=50&page=1&sparkline=false",
      config
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
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const { data } = await axios(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30",
      config
    );
    console.log(data);
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
