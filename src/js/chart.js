

export function renderBtcMarketCapChart(labels, data) {
  const ctx = document.querySelector(".main-canvas").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price (USD)",
          data: data,
          borderColor: "#00ff99",
          backgroundColor: "rgba(0, 255, 153, 0.2)",
          tension: 0.4,
          fill: true,
          pointRadius: 2,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 10,
          },
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

export function renderWeellyChart(data,index) {
  const ctx = document.querySelector(`.weekly-chart-${index}`);

  if (!data || !Array.isArray(data.price)) {
    console.error("Invalid data format:", data);
    return;
  }

  const prices = data.price;
  const labels = prices.map((_, index) => index + 1); 

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data: prices,
          borderColor: "#00ff99",
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}
