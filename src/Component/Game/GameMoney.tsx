import styled from "styled-components";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";
import { GameMoneyProps, holding } from "../../constants/interface";
import { useState, useEffect } from "react";
import axios from "axios";

const GameMoney = () => {
    const header = ["종목명", "평균단가", "주식수", " 현재금액", "수익률"];

    const [nickname, setNickname] = useState(""); // 닉네임
    const [budget, setBudget] = useState(0); // 거래 가능 금액
    const [total, setTotal] = useState(0); // 총 평가금액
    const [changeFromLast, setChangeFromLast] = useState(0); // 작년 대비 금액
    const [changeFromStart, setChangeFromStart] = useState(0); // 전체 대비 금액
    const [changeRateFromLast, setChangeRateFromLast] = useState(0); // 작년 대비 변동률
    const [changeRateFromStart, setChangeRateFromStart] = useState(0); // 전체 대비 변동률
    const [holdingList, setHoldingList] = useState<holding[]>([]); // 20xx년 주식가격

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
    }, []);

    return (
        <GameMoneyContainer>
            <GameMoneyTitle>
                <strong>{nickname}</strong> 님의 계좌잔고 💰
            </GameMoneyTitle>
            <GameMoneyBalance>
                <BalanceTitle>거래가능금액</BalanceTitle>
                <div className="BalanceValue">{formatPrice(total)} 원</div>
            </GameMoneyBalance>
            <hr />
            <GameMoneyBalance>
                <BalanceTitle>총 평가금액</BalanceTitle>
                <div className="BalanceValue">{formatPrice(budget)} 원</div>
            </GameMoneyBalance>
            <GameMoneyBalance>
                <BalanceTitle>작년 대비</BalanceTitle>
                <div className="BalanceValue">
                    {formatPrice(changeFromLast)} 원 ({changeRateFromLast}%)
                </div>
            </GameMoneyBalance>
            <GameMoneyBalance>
                <BalanceTitle>전체 대비</BalanceTitle>
                <div className="BalanceValue">
                    {formatPrice(changeFromStart)} 원 ({changeRateFromStart}%)
                </div>
            </GameMoneyBalance>
            <div>
                <table>
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
                                    background:
                                        holding.stockId % 2 === 0
                                            ? "#ededed"
                                            : "white",
                                }}
                            >
                                <td>{holding.stockName}</td>
                                <td>{formatPrice(holding.average)}</td>
                                <td>{holding.quantity}</td>
                                <td
                                    style={{
                                        color:
                                            holding.ror > 0
                                                ? "red"
                                                : holding.ror < 0
                                                ? "blue"
                                                : "black",
                                    }}
                                >
                                    {formatPrice(holding.price)}
                                </td>
                                <td
                                    style={{
                                        color:
                                            holding.ror > 0
                                                ? "red"
                                                : holding.ror < 0
                                                ? "blue"
                                                : "black",
                                    }}
                                >
                                    {formatChangeRate(holding.ror)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <BalanceDetailButton>
                <Button>더보기</Button>
            </BalanceDetailButton>
        </GameMoneyContainer>
    );
};

const GameMoneyContainer = styled.div`
    width: 85%;
    height: 350px;
    border-radius: 20px;
    box-shadow: 3px 3px 3px rgb(213, 213, 213);
    padding: 20px 40px;
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
    bottom: 20px;
    right: 20px;
`;

const BalanceTitle = styled.div`
    color: #6c6c6c;
    width: 110px;
`;

const Button = styled.button`
    width: 78px;
    height: 46px;
    border-radius: 50px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
`;

export default GameMoney;
