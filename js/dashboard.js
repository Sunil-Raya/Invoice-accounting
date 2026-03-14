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
      labels: ["💰 Total", "✅ Received", "⏳ Pending"],
      datasets: [
        {
          label: "RS",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(54, 162, 235)",
            "rgb(120, 255, 86)",
            "rgb(199, 0, 43)",
          ],
          hoverOffset: 7,
        },
      ],
    },
    options: {
      responsive: true, // allows chart to adapt
      maintainAspectRatio: false,
    },
  });

  // --- Bar Chart ---
  const barCanvas = document.getElementById("bar");
  if (!barCanvas) return;
  const barCtx = barCanvas.getContext("2d");

  // Destroy previous bar chart if exists
  if (window.barChart) window.barChart.destroy();

  window.barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // X-axis
      datasets: [
        {
          label: "Revenue (NPR)",
          data: [5000, 7000, 4000, 8000, 6000, 4500, 15000], // manual values
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 20000,
          ticks: {
            callback: function (value) {
              return "NPR " + value.toLocaleString();
            },
          },
        },
        x: {
          ticks: {
            color: "#000",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const lineCanvas = document.getElementById("line");
  if (!lineCanvas) return;
  const lineCtx = lineCanvas.getContext("2d");

  // Destroy previous chart if exists
  if (window.lineChart) window.lineChart.destroy();

  window.lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: [
        // 12 months
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue (NPR)",
          data: [
            5000, 7000, 4000, 8000, 6000, 4500, 15000, 12000, 9000, 13000,
            11000, 14000,
          ], // manual values
          fill: false,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "rgb(54, 162, 235)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 20000, // set upper limit
          ticks: {
            callback: function (value) {
              return "NPR " + value.toLocaleString();
            },
          },
        },
        x: {
          ticks: { color: "#000" },
        },
      },
      plugins: {
        legend: {
          labels: { font: { size: 14 } },
        },
      },
    },
  });
}
