import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import styled from "styled-components";

const Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [
          {
            data: [
              {
                x: new Date(2016, 0, 1),
                y: [6629.81, 6650.5, 6623.04, 6633.33],
              },
              {
                x: new Date(2016, 0, 2),
                y: [6632.01, 6643.59, 6620, 6630.11],
              },
              {
                x: new Date(2016, 0, 3),
                y: [6630.71, 6648.95, 6623.34, 6635.65],
              },
              {
                x: new Date(2016, 0, 4),
                y: [6635.65, 6651, 6629.67, 6638.24],
              },
              {
                x: new Date(2016, 0, 5),
                y: [6638.24, 6640, 6620, 6624.47],
              },
              {
                x: new Date(2016, 0, 6),
                y: [6624.53, 6636.03, 6621.68, 6624.31],
              },
              {
                x: new Date(2016, 0, 7),
                y: [6624.61, 6632.2, 6617, 6626.02],
              },
              {
                x: new Date(2016, 0, 8),
                y: [6627, 6627.62, 6584.22, 6603.02],
              },
              {
                x: new Date(2016, 0, 9),
                y: [6605, 6608.03, 6598.95, 6604.01],
              },
              {
                x: new Date(2016, 0, 10),
                y: [6604.5, 6614.4, 6602.26, 6608.02],
              },
              {
                x: new Date(2016, 0, 11),
                y: [6608.02, 6610.68, 6601.99, 6608.91],
              },
              {
                x: new Date(2016, 0, 12),
                y: [6608.91, 6618.99, 6608.01, 6612],
              },
              {
                x: new Date(2016, 0, 13),
                y: [6612, 6615.13, 6605.09, 6612],
              },
              {
                x: new Date(2016, 0, 14),
                y: [6612, 6624.12, 6608.43, 6622.95],
              },
              {
                x: new Date(2016, 0, 15),
                y: [6623.91, 6623.91, 6615, 6615.67],
              },
              {
                x: new Date(2016, 0, 16),
                y: [6618.69, 6618.74, 6610, 6610.4],
              },
              {
                x: new Date(2016, 0, 17),
                y: [6611, 6622.78, 6610.4, 6614.9],
              },
              {
                x: new Date(2016, 0, 18),
                y: [6614.9, 6626.2, 6613.33, 6623.45],
              },
              {
                x: new Date(2016, 0, 19),
                y: [6623.48, 6627, 6618.38, 6620.35],
              },
              {
                x: new Date(2016, 0, 20),
                y: [6619.43, 6620.35, 6610.05, 6615.53],
              },
              {
                x: new Date(2016, 0, 21),
                y: [6615.53, 6617.93, 6610, 6615.19],
              },
              {
                x: new Date(2016, 0, 22),
                y: [6615.19, 6621.6, 6608.2, 6620],
              },
              {
                x: new Date(2016, 0, 23),
                y: [6619.54, 6625.17, 6614.15, 6620],
              },
              {
                x: new Date(2016, 0, 24),
                y: [6620.33, 6634.15, 6617.24, 6624.61],
              },
            ],
          },
        ],
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, []);

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
