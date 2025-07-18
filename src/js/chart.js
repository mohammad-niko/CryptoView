export function rnderBtcMarketCap(labels, data) {
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
