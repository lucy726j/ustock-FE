import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StockProps } from "../../constants/interface";

interface PieChartProps {
    stockData: StockProps[];
}

const PieChart: React.FC<PieChartProps> = ({ stockData }) => {
    console.log(stockData);
    const series = stockData.map(
        (item) => item.average * item.quantity * item.profitRate * 0.01
    );
    const labels = stockData.map((item) => item.name);

    const options: ApexOptions = {
        chart: {
            type: "donut",
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
                        width: 450,
                    },
                },
            },
        ],
    };

    return (
        <div id="chart" style={{ marginTop: "4rem", marginBottom: "10rem" }}>
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
};

export default PieChart;
