import React,{useEffect} from 'react'
const Chart = require('chart.js')

const PieChart = ({investedAmt,estReturns}) => {

    useEffect(() => {
      const ctx = document.getElementById("myChart");
      var myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Invested Amount", "Est Returns"],
          datasets: [
            {
              data: [investedAmt, estReturns],
              backgroundColor: ["blue", "green"],
              
            },
          ],
        },
        options: {},
      });
    });
    
    return <canvas id="myChart" width="400" height="400"></canvas>;
}

export default PieChart
