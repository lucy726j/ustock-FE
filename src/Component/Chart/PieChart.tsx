import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { data } from "../../data/data";

const PieChart = () => {
  const series = data.map((item) => item.price);
  const labels = data.map((item) => item.name);

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
    <div id="chart" style={{width: "450px", marginTop: "6rem"}}>
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default PieChart;
