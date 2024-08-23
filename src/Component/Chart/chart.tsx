import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import styled from "styled-components";

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

            return `
            <div style="padding: 5px; font-size: 12px;">
            <p>${xLabel}</p>
            <p>시가: ${open}</p>
            <p>고가: ${high}</p>
            <p>저가: ${low}</p>
            <p>종가: ${close}</p>
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

const ChartStyle = styled.div`
  width: 90%;
  margin-bottom: 30px;
`;

export default Chart;
