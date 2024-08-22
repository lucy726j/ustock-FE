import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import styled from "styled-components";
interface CandleData {
  data: { x: string; y: [number, number, number, number] }[];
}

const Chart = ({ data }: CandleData) => {
  const chartRef = useRef<HTMLDivElement>(null);
  console.log("chart : ", data);

  useEffect(() => {
    console.log(data);
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
        },
        yaxis: {
          tooltip: {
            enabled: true,
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
