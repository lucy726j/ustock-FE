import styled from "styled-components";

const GameMoneyContainer = styled.div`
    width: 85%;
    height: 150px;
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

const GameMoney = () => {
    return (
        <GameMoneyContainer>
            <GameMoneyTitle>
                <strong>루시는왜안돼요</strong> 님의 계좌잔고 💰
            </GameMoneyTitle>
            <GameMoneyBalance>
                <BalanceTitle>총 평가금액</BalanceTitle>
                <div className="BalanceValue">0</div>
            </GameMoneyBalance>
            <GameMoneyBalance>
                <BalanceTitle>작년 대비</BalanceTitle>
                <div className="BalanceValue">0 (0%)</div>
            </GameMoneyBalance>
            <BalanceDetailButton>
                <Button>더보기</Button>
            </BalanceDetailButton>
        </GameMoneyContainer>
    );
};

export default GameMoney;
