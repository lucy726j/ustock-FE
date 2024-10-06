import axios from "axios";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";
import { RankListProps } from "../../constants/interface";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { useGameStore } from "../../store/useGameStore";

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
  const check = usePortfolioStore((state) => state.check);
  const header = ["순위", "플레이어", " 현재금액", "수익률"];
  const [rankResult, setRankResult] = useState<RankListProps[]>([]);

  const { currentRank, setCurrentRank, fetchRank } = useGameStore((state) => ({
    currentRank: state.currentRank,
    setCurrentRank: state.setCurrentRank,
    fetchRank: state.fetchRank,
  }));

  useEffect(() => {
    fetchRank();
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/game/result`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRankResult(res.data);

        // // 사용자 순위 저장
        // const userIndex = res.data.findIndex(
        //   (item: any) => item.playerType === "USER"
        // );
        // setCurrentRank(userIndex + 1);
      });
  }, [check, currentRank]);

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
