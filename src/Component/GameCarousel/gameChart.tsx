import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { ChartStyle } from "../Chart/chartStyle";

interface LineChartData {
  data: {
    x: string;
    y: number;
  }[];
}

const GameChart = ({ data }: LineChartData) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const options = {
        series: [
          {
            name: "Price",
            data: data,
          },
        ],
        chart: {
          type: "area",
          height: 400,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy년",
              month: "M월",
              day: "dd일",
              hour: "HH:mm",
            },
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <>
      <ChartStyle id="chart" ref={chartRef}></ChartStyle>
    </>
  );
};

export default GameChart;
