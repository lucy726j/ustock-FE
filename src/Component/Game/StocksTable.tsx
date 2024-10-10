import React from "react";
import { StocksTableProps } from "../../constants/interface";
import { formatChangeRate, formatPriceWithYear } from "../../util/gameUtil";
import "./StocksTableStyle.css";
import styled, { keyframes } from "styled-components";

const StocksTable: React.FC<StocksTableProps> = ({ stocks, year }) => {
    const header = ["번호", "종목", "전년", "올해", "등락"];
    console.log(stocks);

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
                        stocks.map((stock, index) => (
                            <TableRow
                                key={stock.stockId}
                                index={index} // index를 전달
                                style={{
                                    background:
                                        index % 2 === 1 ? "#ededed" : "white",
                                }}
                            >
                                <td>{index + 1}</td>
                                <td>{stock.name}</td>
                                <td style={{ textAlign: "right" }}>
                                    {formatPriceWithYear(stock.prev, year)}
                                </td>
                                <td
                                    style={{
                                        color:
                                            stock.changeRate > 0
                                                ? "red"
                                                : stock.changeRate < 0
                                                ? "blue"
                                                : "black",
                                        textAlign: "right",
                                    }}
                                >
                                    {formatPriceWithYear(stock.current, year)}
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
                            </TableRow>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

// 부드럽게 나타나는 애니메이션 정의
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const TableRow = styled.tr<{ index: number }>`
    animation: ${fadeIn} 0.5s ease-out forwards;
    animation-delay: ${({ index }) => index * 0.1}s;
    opacity: 0;
`;

export default StocksTable;
