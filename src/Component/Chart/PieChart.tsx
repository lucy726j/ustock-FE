import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StockProps } from "../../constants/interface";

interface PieChartProps{
    stockData: StockProps[];
}

const PieChart:React.FC<PieChartProps> = ({stockData}) => {
  const series = stockData.map((item) => item.quantity);
  const labels = stockData.map((item) => item.name);

  const options: ApexOptions = {
    chart: {
      type: "donut"
    },
    labels: labels,
    legend: {
        position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
           width: 200
          },
        },
      },
    ],
  };

  return (
    <div id="chart" style={{width: "450px", marginTop: "6rem", marginBottom: "10rem"}}>
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default PieChart;
