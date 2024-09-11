// StocksTable.tsx
import React, { useEffect, useState } from "react";
import { StockYearProps, StocksTableProps } from "../../constants/interface";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";
import "./StocksTableStyle.css";
import { useStock } from "../../store/stockContext";

const StocksTable: React.FC<StocksTableProps> = ({ stocks }) => {
    const header = ["번호", "종목", "전년", "올해", "등락"];

    return (
        <div className="StocksTable">
            <table>
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {stocks &&
                        stocks.map((stock) => (
                            <tr
                                key={stock.stockId}
                                style={{
                                    background:
                                        stock.stockId % 2 === 1
                                            ? "#ededed"
                                            : "white",
                                }}
                            >
                                <td>{stock.stockId}</td>
                                <td>{stock.name}</td>
                                <td>{formatPrice(stock.prev)}</td>
                                <td
                                    style={{
                                        color:
                                            stock.changeRate > 0
                                                ? "red"
                                                : stock.changeRate < 0
                                                ? "blue"
                                                : "black",
                                    }}
                                >
                                    {formatPrice(stock.current)}
                                </td>
                                <td
                                    style={{
                                        color:
                                            stock.changeRate > 0
                                                ? "red"
                                                : stock.changeRate < 0
                                                ? "blue"
                                                : "black",
                                    }}
                                >
                                    {formatChangeRate(stock.changeRate)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default StocksTable;
