<template>
  <div class='main'>
    <div class='chart'>
      <canvas id="myChart" width="750" height="450"></canvas>
    </div>
    <h1>{{this.$route.params.stockName}} closing price, 12 months period</h1>
  </div>
</template>

<script>
import { getChart } from "@/api/api";
import Chart from "chart.js";
export default {
  name: "Chart1Y",

  data() {
    return {
      history: null,
      stock: Array
    };
  },
  computed: {
    latestUpdate: function() {
      return new Date(parseInt(this.price.latestUpdate));
    }
  },
  created() {
    getChart(this.$route.params.stockName).then(response => {
      this.history = response;
      let prices = response.map(day => day.close);
      let dates = response.map(day => day.date);
      let ctx = document.getElementById("myChart");
      Chart.defaults.global.defaultFontColor = "black";
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "closing price",
              data: prices,
              backgroundColor: ["rgba(241, 252, 244, 0.72)"],
              borderColor: ["#8bc34a"],
              borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                gridLines: {
                  display: true,
                  color: "#f3f3f3"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: "#f3f3f3"
                }
              }
            ]
          },
          tooltips: {
            enabled: true
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 3
            }
          }
        }
      });
    });
  }
};
</script>

<style scoped>
.market-stats {
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: center;
  align-items: center;
}
.indicators {
  margin-top: 5vh;
  margin-left: 1vw;
  font-size: 1.4em;
}
.indicators p {
  margin-bottom: 12px;
}
.chart {
  color: black;
  margin-right: 100px;
}
h1 {
  font-size: 1.6em;
  font-weight: 600;
  margin: 0px;
  margin-top: 15px;
  font-style: italic;
}
</style>
