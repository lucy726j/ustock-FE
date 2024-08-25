import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { ChartStyle, ChartDate } from "./chartStyle";
import { formatPrice } from "../../util/util";
import { Info } from "../../Pages/home";
import ModalOpen from "../Modal/modal";

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
  const [click, setClick] = useState(false);

  const handlerClick = () => {
    return (
      <ModalOpen
        isOpen={isOpen}
        // onRequestClose={onRequestClose}
        showConfirmButton="확인"
        showCancelButton={true}
        // icon={newPortfolio}
        onConfirm={handleConfirm}
        confirmLabel="확인"
      />
    );
  };

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
          events: {
            // dataPointSelection: function (
            //   event: any,
            //   chartContext: any,
            //   opts: any
            // ) {
            //   alert(chartContext.w.globals.labels[opts.dataPointIndex]);
            // },
            // onNodeClick: function (event: any, chartContext: any, opts: any) {
            //   alert("온노드클릭");
            // },
            click: function (event: any, chartContext: any, opts: any) {
              var newsHtml = "";
              console.log("차트컨텍스트", chartContext);
              console.log("데이터포인트", opts.dataPointIndex);
              const news = opts.globals.seriesZ[0][opts.dataPointIndex]; // 뉴스 데이터
              if (Array.isArray(news)) {
                newsHtml = `<ul>`;
                news.forEach((newItem, index) => {
                  newsHtml += `<li><a href=${newItem.url} target="_blank">${newItem.title}</a></li>`;
                });
                newsHtml += "</ul>";
              } else {
                console.error();
              }

              // alert("된다");
              // handlerClick();
              // return (
              {
                click ? (
                  <ModalOpen
                    isOpen={isOpen}
                    // onRequestClose={onRequestClose}
                    showConfirmButton="확인"
                    showCancelButton={true}
                    // icon={newPortfolio}
                    onConfirm={handleConfirm}
                    confirmLabel="확인"
                  />
                ) : (
                  alert("상태관리 안된다")
                );
              }
              // );
              // return `<div style="height:500px; background-color : red" ><p>관련 뉴스: <span style="padding-left : 1rem;">${newsHtml}</span></p></div>`;
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
          }, // 차트를 좀 더 널널하게 보여줘야함.. zoom 속성 알아보기
        },
        tooltip: {
          custom: function ({ seriesIndex, dataPointIndex, w }: any) {
            console.log("뉴스는 과연 어디에 뜰까?? : ", w.globals);

            const close = w.globals.seriesCandleC[seriesIndex][dataPointIndex]; // Close
            const low = w.globals.seriesCandleL[seriesIndex][dataPointIndex]; // Low
            const open = w.globals.seriesCandleO[seriesIndex][dataPointIndex]; // Open
            const high = w.globals.seriesCandleH[seriesIndex][dataPointIndex]; // High
            const news = w.globals.seriesZ[seriesIndex][dataPointIndex]; // 뉴스 데이터
            var newsHtml = "";

            if (Array.isArray(news)) {
              newsHtml = `<ul>`;
              news.forEach((newItem, index) => {
                newsHtml += `<li><a href=${newItem.url} target="_blank">${newItem.title}</a></li>`;
              });
              newsHtml += "</ul>";
            } else {
              console.error();
            }

            const xLabel = new Date(
              w.globals.seriesX[seriesIndex][dataPointIndex]
            ).toLocaleDateString("ko-KR");

            const color = close > open ? "#FF5759" : "#615EFC";

            // <p>관련 뉴스: <span style="padding-left : 1rem; color : ${color}">${newsHtml}</span></p>

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
