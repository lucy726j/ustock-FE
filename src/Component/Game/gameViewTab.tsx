import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import GameHoldingsView from "./gameHoldingsView";
import GameCurrentResult from "./gameCurrentResult";
import { useState } from "react";


const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 2rem;
`;
const TabStyle = styled.div<{ $isActive: boolean }>`
  width: 100px;
  font-family: "SCDream7";
  text-align: center;
  padding-bottom: 0.2rem;
  border-bottom: 3px solid ${Colors.main};
  border-bottom: ${(props) =>
    props.$isActive ? `3px solid ${Colors.main}` : "none"};
  color: ${(props) => (props.$isActive ? Colors.main : "black")};
  cursor: pointer;
`;



const GameViewTab = ({ holdingList }: any) => {
  const [tabView, setTabView] = useState("보유주식");



  const clickHoldings = () => {
    setTabView("보유주식");
  };

  const clickCurrentResult = () => {
    setTabView("실시간 랭킹");
  };

  return (
    <div>

      <TabContainer>
        <TabStyle onClick={clickHoldings} $isActive={tabView === "보유주식"}>
          보유주식
        </TabStyle>
        <TabStyle
          onClick={clickCurrentResult}
          $isActive={tabView === "실시간 랭킹"}
        >
          실시간 랭킹
        </TabStyle>
      </TabContainer>

      {tabView === "보유주식" ? (
        <GameHoldingsView holdingList={holdingList} />
      ) : (
        // 실시간 랭킹
        <GameCurrentResult />
      )}
    </div>
  );
};

export default GameViewTab;
