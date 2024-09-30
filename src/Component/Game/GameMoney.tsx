import styled from "styled-components";
import { formatPrice } from "../../util/gameUtil";
import { holding } from "../../constants/interface";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { useGameStore } from "../../store/useGameStore";
import { useNavigate } from "react-router-dom";
import GameViewTab from "./gameViewTab";
import { useSwipeStore } from "../../store/useSwipeStore";

const GameMoney = ({
    setBudget,
    budget,
}: {
    setBudget: (budget: number) => void;
    budget: number;
}) => {
    const nav = useNavigate();

    const [nickname, setNickname] = useState(""); // 닉네임
    const [total, setTotal] = useState(0); // 총 평가금액
    const [changeFromLast, setChangeFromLast] = useState(0); // 작년 대비 금액
    const [changeFromStart, setChangeFromStart] = useState(0); // 전체 대비 금액
    const [changeRateFromLast, setChangeRateFromLast] = useState(0); // 작년 대비 변동률
    const [changeRateFromStart, setChangeRateFromStart] = useState(0); // 전체 대비 변동률
    // const [holdingList, setHoldingList] = useState<holding[]>([]); // 20xx년 주식가격
    const [showTable, setShowTable] = useState(false);
    const { holdingList, setHoldingList } = useSwipeStore(); // 내가 산거

    const check = usePortfolioStore((state) => state.check);

    // 페이지 유효성 검사
    const setCheckYear = useGameStore((state) => state.setCheckYear);

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
                    setCheckYear(res.data.year);
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
                nav("/error");
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

            {showTable && <GameViewTab holdingList={holdingList} />}
        </GameMoneyContainer>
    );
};

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
    top: 118px;
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
