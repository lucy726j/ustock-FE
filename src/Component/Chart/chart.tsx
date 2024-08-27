import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { ChartStyle } from "./chartStyle"; // Assuming you have the styles defined in this file
import { formatPrice } from "../../util/util";
import ModalOpen from "../Modal/modal";
import { Colors } from "../../Styles/Colors";

interface CandleData {
  data: {
    x: string;
    y: [number, number, number, number];
    z: { title: string; url: string }[];
  }[];
}

const Chart = ({ data }: CandleData) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newsHtml, setNewsHtml] = useState<string>("");

  const onRequestClose = () => {
    setIsOpen(!isOpen);
  };

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
          type: "candlestick",
          height: 350,
          events: {
            click: function (event: any, chartContext: any, opts: any) {
              // Update state to show modal when chart is clicked
              setIsOpen(true);
            },
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
        tooltip: {
          custom: function ({ seriesIndex, dataPointIndex, w }: any) {
            const close = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            const low = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            const open = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const high = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            const news = w.globals.seriesZ[seriesIndex][dataPointIndex];
            var newsHtml = "";

            if (Array.isArray(news)) {
              // newsHtml = `<ul>`;

              news.forEach((newItem) => {
                newsHtml += `<li><a href=${newItem.url} target="_blank" rel="noopener noreferrer nofollow">${newItem.title}</a></li>`;
              });

              newsHtml += `</ul>`;
            }

            setNewsHtml(newsHtml);

            const xLabel = new Date(
              w.globals.seriesX[seriesIndex][dataPointIndex]
            ).toLocaleDateString("ko-KR");

            const color = close > open ? "#FF5759" : "#615EFC";

            return `
            <div style="padding: 5px; font-size: 12px; width: 200px; height: 200px;text-align : center">
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
            </div>`;
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

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChartStyle id="chart" ref={chartRef}></ChartStyle>
      {isOpen && (
        <ModalOpen
          isOpen={isOpen}
          showConfirmButton="확인"
          showCancelButton={false}
          onConfirm={handleConfirm}
          onRequestClose={onRequestClose}
          confirmLabel="확인"
        >
          <p>
            그땐 그랬지 뉴-우스
            <span style={{ paddingLeft: "1rem", color: `${Colors.main}` }}>
              <div dangerouslySetInnerHTML={{ __html: newsHtml }} />
            </span>
          </p>
        </ModalOpen>
      )}
    </>
  );
};

export default Chart;
