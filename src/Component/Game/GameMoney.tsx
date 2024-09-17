import styled, { keyframes } from "styled-components";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";
import { holding } from "../../constants/interface";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePortfolioStore } from "../../store/usePortfolioStore";

const GameMoney = ({
  setBudget,
  budget,
}: {
  setBudget: (budget: number) => void;
  budget: number;
}) => {
  const header = ["종목명", "평균단가", "주식수", " 현재금액", "수익률"];

  const [nickname, setNickname] = useState(""); // 닉네임
  const [total, setTotal] = useState(0); // 총 평가금액
  const [changeFromLast, setChangeFromLast] = useState(0); // 작년 대비 금액
  const [changeFromStart, setChangeFromStart] = useState(0); // 전체 대비 금액
  const [changeRateFromLast, setChangeRateFromLast] = useState(0); // 작년 대비 변동률
  const [changeRateFromStart, setChangeRateFromStart] = useState(0); // 전체 대비 변동률
  const [holdingList, setHoldingList] = useState<holding[]>([]); // 20xx년 주식가격
  const [showTable, setShowTable] = useState(false);

  const check = usePortfolioStore((state) => state.check);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/game/user`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setNickname(res.data.nickname);
          setBudget(res.data.budget);
          setTotal(res.data.total);
          setChangeFromLast(res.data.changeFromLast);
          setChangeFromStart(res.data.changeFromStart);
          setChangeRateFromLast(res.data.changeRateFromLast);
          setChangeRateFromStart(res.data.changeRateFromStart);
          setHoldingList(res.data.holdingList);
        } else if (res.status === 401) {
          alert("401");
        }
      })
      .catch((e) => {
        //console.log(e);
      });
  }, [check]);

  const handleShowTable = () => {
    setShowTable((prev) => !prev);
  };

  return (
    <GameMoneyContainer>
      <GameMoneyTitle>
        <strong>{nickname}</strong> 님의 계좌잔고 💰
      </GameMoneyTitle>
      <GameMoneyBalance>
        <BalanceTitle>거래가능금액</BalanceTitle>
        <div className="BalanceValue">{formatPrice(budget)} 원</div>
      </GameMoneyBalance>
      <hr />
      <GameMoneyBalance>
        <BalanceTitle>총 평가금액</BalanceTitle>
        <div className="BalanceValue">{formatPrice(total)} 원</div>
      </GameMoneyBalance>
      <GameMoneyBalance>
        <BalanceTitle>작년 대비</BalanceTitle>
        <div
          className="BalanceValue"
          style={{
            color:
              changeRateFromLast > 0
                ? "red"
                : changeRateFromLast < 0
                ? "blue"
                : "black",
          }}
        >
          {formatPrice(changeFromLast)} 원 ({changeRateFromLast}%)
        </div>
      </GameMoneyBalance>
      <GameMoneyBalance>
        <BalanceTitle>전체 대비</BalanceTitle>
        <div
          className="BalanceValue"
          style={{
            color:
              changeRateFromStart > 0
                ? "red"
                : changeRateFromStart < 0
                ? "blue"
                : "black",
          }}
        >
          {formatPrice(changeFromStart)} 원 ({changeRateFromStart}%)
        </div>
      </GameMoneyBalance>
      <BalanceDetailButton>
        <Button onClick={handleShowTable}>
          {showTable ? "닫기" : "더보기"}
        </Button>
      </BalanceDetailButton>

      {showTable && (
        <div>
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
                {holdingList.map((holding, index) => (
                  <tr
                    key={index}
                    style={{
                      background: index % 2 === 0 ? "#ededed" : "white",
                    }}
                  >
                    <td>{holding.stockName}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatPrice(holding.average)}
                    </td>
                    <td>{holding.quantity}</td>
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
                      {formatChangeRate(holding.profitRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
      )}
    </GameMoneyContainer>
  );
};

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

const GameMoneyContainer = styled.div`
  width: 85%;
  height: auto;
  border-radius: 20px;
  box-shadow: 3px 3px 3px rgb(213, 213, 213);
  padding: 20px 10px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const GameMoneyTitle = styled.div`
  margin-bottom: 30px;
`;

const GameMoneyBalance = styled.div`
  display: flex;
  margin: 15px 0;
  flex-direction: row;
`;

const BalanceDetailButton = styled.div`
  position: absolute;
  top: 185px;
  right: 20px;
`;

const BalanceTitle = styled.div`
  color: #6c6c6c;
  width: 110px;
`;

const Button = styled.button`
  width: 78px;
  height: 40px;
  border-radius: 50px;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;

  &:hover {
    background-color: #615efc;
    color: white;
    font-weight: 600;
  }
`;

export default GameMoney;
