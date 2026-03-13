function initDashboard() {
  if (window.myChart) {
    window.myChart.destroy();
  }

  const canvasElement = document.getElementById("mychart");
  if (!canvasElement) return;

  const ctx = canvasElement.getContext("2d");

  window.myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Total", "Received", "Pending"],
      datasets: [{
        label: "Total Money",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(120, 255, 86)",
          "rgb(199, 0, 43)"
        ],
        hoverOffset: 4
      }]
    }
  });
}