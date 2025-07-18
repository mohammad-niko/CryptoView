const main = document.querySelector("main");

export function renderHomeViwe() {
  rendertrendingPart();

const allCrypto = document.createElement("div");
allCrypto.classList.add("all-crypto-container");
main.appendChild(allCrypto);








}
renderHomeViwe();

export function rendertrendingPart() {
  const parentContainer = document.createElement("div");
  parentContainer.classList.add("parent-container");
  main.appendChild(parentContainer);
  //---------------------Trending coin
  const trendingCoinsCard = document.createElement("div");
  trendingCoinsCard.classList.add("main-card", "trending-coins");
  parentContainer.appendChild(trendingCoinsCard);

  const coinsHeaderContainer = document.createElement("div");
  coinsHeaderContainer.classList.add("header-container");
  trendingCoinsCard.appendChild(coinsHeaderContainer);

  const coinsHeader = document.createElement("h5");
  coinsHeader.classList.add("header-title");
  coinsHeader.textContent = "Trending Coins";
  coinsHeaderContainer.appendChild(coinsHeader);

  const coinsIcon = document.createElement("i");
  coinsIcon.classList.add("header-icon", "bi", "bi-chevron-right");
  coinsHeaderContainer.appendChild(coinsIcon);

  const trendingCoinsContent = document.createElement("div");
  trendingCoinsContent.classList.add("trending-content");
  trendingCoinsCard.appendChild(trendingCoinsContent);

  //---------------------Trending DeFi
  const trendingDefiCard = document.createElement("div");
  trendingDefiCard.classList.add("main-card", "trending-defi");
  parentContainer.appendChild(trendingDefiCard);

  const defiHeaderContainer = document.createElement("div");
  defiHeaderContainer.classList.add("header-container");
  trendingDefiCard.appendChild(defiHeaderContainer);

  const defiHeader = document.createElement("h5");
  defiHeader.classList.add("header-title");
  defiHeader.textContent = "Trending DeFi";
  defiHeaderContainer.appendChild(defiHeader);

  const defiIcon = document.createElement("i");
  defiIcon.classList.add("header-icon", "bi", "bi-chevron-right");
  defiHeaderContainer.appendChild(defiIcon);

  const trendingDefiContent = document.createElement("div");
  trendingDefiContent.classList.add("trending-content");
  trendingDefiCard.appendChild(trendingDefiContent);

  //---------------------BTC Market Cap
  const btcMarketCapCard = document.createElement("div");
  btcMarketCapCard.classList.add("main-card", "btc-market-cap");
  parentContainer.appendChild(btcMarketCapCard);

  const canvas = document.createElement("canvas");
  canvas.classList.add("main-canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  btcMarketCapCard.appendChild(canvas);
}

export function rendertrending(data, elm, index) {
  const coinCard = document.createElement("div");
  coinCard.classList.add("coin-card-item");
  elm.appendChild(coinCard);

  const coinInfoContainer = document.createElement("div");
  coinInfoContainer.classList.add("coin-info");
  coinCard.appendChild(coinInfoContainer);

  const coinIndex = document.createElement("span");
  coinIndex.classList.add("coin-info-index");
  coinIndex.textContent = index + 1;
  coinInfoContainer.appendChild(coinIndex);

  const coinLogo = document.createElement("img");
  coinLogo.classList.add("coin-info-logo");
  if (data?.thumb) {
    coinLogo.src = data.thumb;
  } else {
    coinLogo.src = data.image;
  }
  coinLogo.alt = "Coin Logo";
  coinInfoContainer.appendChild(coinLogo);

  const coinSymbol = document.createElement("span");
  coinSymbol.classList.add("coin-info-symbol");
  coinSymbol.textContent = data.symbol;
  coinInfoContainer.appendChild(coinSymbol);

  const coinPrice = document.createElement("div");
  coinPrice.classList.add("coin-price");
  if (data?.data?.price) {
    coinPrice.textContent =
      data.data.price < 1
        ? data.data.price.toFixed(5)
        : data.data.price.toFixed(2)
  } else {
    coinPrice.textContent =
      data.current_price < 1
        ? data.current_price.toFixed(5)
        : data.current_price.toFixed(2)
  }

  coinCard.appendChild(coinPrice);
}
