<template>
  <div>
    <div class='chart'>
       <h1> {{stock.longName}} closing price evolution </h1>
      <canvas id="myChart" width="750" height="450"></canvas>
    </div>
    </div>
</template>

<script>
import { getChart } from "@/api/api";
import Chart from "chart.js";
export default {
  name: "Chart1Y",

  data() {
    return {
      history: null
    };
  },
  props: {
    stock: Object
  },
  computed: {
    latestUpdate: function() {
      return new Date(parseInt(this.price.latestUpdate));
    }
  },
  created() {
    getChart(
      this.$route.params.stockName,
      this.stock.index[0]
    ).then(response => {
      this.history = response.dataset.data.reverse();
      let prices = response.dataset.data.map(day => day[4]);
      let dates = response.dataset.data.map(day => day[0]);
      let ctx = document.getElementById("myChart");
      Chart.defaults.global.defaultFontColor = "#192b41";
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "closing price",
              data: prices,
              backgroundColor: ["rgba(241, 252, 244, 0.72)"],
              borderColor: ["#192b41"],
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
                  color: "#f9f9f9"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: "#f9f9f9"
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
  color: #192b41;
  background-color:#f9f9f9
}
h1 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0px;
  margin-bottom: 15px;
  font-style: italic;
  text-align: center;
  color:#192b41
}
@media (max-width: 768px) {
  .line-chart{
    font-size: 10px;
  }
  .chartIcon{
        font-size: 0.65REM;
  }
}
</style>
