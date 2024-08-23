import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { ChartStyle, ChartDate } from "./chartStyle";
import { formatPrice } from "../../util/util";
import { Info } from "../../Pages/home";

interface CandleData {
  data: {
    x: string;
    y: [number, number, number, number];
    z: { title: string; url: string }[];
  }[];
}

const Chart = ({ data }: CandleData) => {
  const chartRef = useRef<HTMLDivElement>(null);
  console.log("chart : ", data);

  useEffect(() => {
    console.log("차트", data);
    if (chartRef.current && data.length > 0) {
      const options = {
        series: [
          {
            name: "Price",
            data: data,
          },
        ],
        chart: {
          type: "candlestick",
          height: 350,
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy년",
              month: "M월",
              day: "d월",
              hour: "HH:mm",
            },
          },
        },
        tooltip: {
          custom: function ({ seriesIndex, dataPointIndex, w }: any) {
            const close = w.globals.seriesCandleC[seriesIndex][dataPointIndex]; // Close
            const low = w.globals.seriesCandleL[seriesIndex][dataPointIndex]; // Low
            const open = w.globals.seriesCandleO[seriesIndex][dataPointIndex]; // Open
            const high = w.globals.seriesCandleH[seriesIndex][dataPointIndex]; // High

            const xLabel = new Date(
              w.globals.seriesX[seriesIndex][dataPointIndex]
            ).toLocaleDateString("ko-KR");

            const color = close > open ? "#FF5759" : "#615EFC";

            return `
            <div style="padding: 5px; font-size: 12px; width: 120px; height: 120px;text-align : center">
            <p style="font-family: 'SCDream7';">${xLabel}</p>
            <hr style="margin-bottom : 0.5rem;margin-top : 0.2rem;"/>
            <div style="display: flex; flex-direction: column; gap: 5px;">
            <p>시가: <span style="padding-left : 1rem; color : ${color}">${formatPrice(
              open
            )}</span></p>
            <p>고가: <span style="padding-left : 1rem; color : ${color}">${formatPrice(
              high
            )}</span></p>
            <p>저가: <span style="padding-left : 1rem; color : ${color}">${formatPrice(
              low
            )}</span></p>
            <p>종가: <span style="padding-left : 1rem; color : ${color}">${formatPrice(
              close
            )}</span></p>
            </div>
            `;
          },
        },
      };

      var chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    // Logic to add the asset
    setIsOpen(false);
  };

  return (
    <>
      <ChartStyle id="chart" ref={chartRef}></ChartStyle>
    </>
  );
};

export default Chart;
