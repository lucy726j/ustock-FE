import styled, { keyframes } from "styled-components";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";

const fadeIn = keyframes`
    from{
        opacity:0;
        transform: translateY(10px)
    }
    to{
        opacity:1;
        transform: translateY(0)
    }
`;

const TableContainer = styled.div`
    animation: ${fadeIn} 0.5s ease-out forwards;
    opacity: 0;
`;

const GameHoldingsView = ({ holdingList }: any) => {
    const header = ["종목명", "평균단가", "주식수", " 현재금액", "수익률"];
    return (
        <div>
            <TableContainer>
                <table style={{ paddingTop: "20px" }}>
                    {holdingList.length < 1 ? (
                        <p>아직 보유한 주식이 없습니다!</p>
                    ) : (
                        <>
                            <thead>
                                <tr>
                                    {header.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {holdingList.map((holding: any, index: any) => (
                                    <tr
                                        key={index}
                                        style={{
                                            background:
                                                index % 2 === 0
                                                    ? "#ededed"
                                                    : "white",
                                        }}
                                    >
                                        <td>{holding.stockName}</td>
                                        <td style={{ textAlign: "right" }}>
                                            {formatPrice(holding.average)}
                                        </td>
                                        <td>{formatPrice(holding.quantity)}</td>
                                        <td
                                            style={{
                                                color:
                                                    holding.profitRate > 0
                                                        ? "red"
                                                        : holding.profitRate < 0
                                                        ? "blue"
                                                        : "black",
                                                textAlign: "right",
                                            }}
                                        >
                                            {formatPrice(holding.price)}
                                        </td>
                                        <td
                                            style={{
                                                color:
                                                    holding.profitRate > 0
                                                        ? "red"
                                                        : holding.profitRate < 0
                                                        ? "blue"
                                                        : "black",
                                            }}
                                        >
                                            {formatChangeRate(
                                                holding.profitRate
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </table>
            </TableContainer>
        </div>
    );
};

export default GameHoldingsView;
