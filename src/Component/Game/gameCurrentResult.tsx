import axios from "axios";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";
import { RankListProps } from "../../constants/interface";
import { Colors } from "../../Styles/Colors";

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

const GameCurrentResult = () => {
  const header = ["순위", "플레이어", " 현재금액", "수익률"];
  const [rankResult, setRankResult] = useState<RankListProps[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/game/result`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setRankResult(res.data);
      });
  }, []);

  return (
    <TableContainer>
      <table style={{ paddingTop: "20px" }}>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rankResult.map((item: any, index: any) => (
            <tr
              key={index}
              style={{
                background: index % 2 === 0 ? "#ededed" : "white",
              }}
            >
              <td>{index + 1}</td>
              <td style={{ textAlign: "center" }}>{item.nickname}</td>
              <td
                style={{
                  color:
                    item.profitRate > 0
                      ? "red"
                      : item.profitRate < 0
                      ? "blue"
                      : "black",
                  textAlign: "right",
                }}
              >
                {formatPrice(item.total)}
              </td>
              <td
                style={{
                  color:
                    item.profitRate > 0
                      ? "red"
                      : item.profitRate < 0
                      ? "blue"
                      : "black",
                }}
              >
                {formatChangeRate(item.profitRate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default GameCurrentResult;
