import { useParams } from "react-router-dom";
import GameButtons from "../../Component/Game/GameButtons";
import GameHeader from "../../Component/Game/GameHeader";
import GameMoney from "../../Component/Game/GameMoney";
import StocksTable from "../../Component/Game/StocksTable";
import styled from "styled-components";
import GameTradeSwipe from "../../Component/Game/GameTradeSwipe";
import { useState } from "react";
import Tutorial from "../../Game/Tutorial/tutorial";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PlayPage = () => {
  const { year } = useParams<{ year: string }>();
  const yearValue = year || "DefaultYear";
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);

  // 거래하기 모달 핸들러
  const openTradeModal = () => {
    setIsTradeModalVisible(true);
  };

  const closeTradeModal = () => {
    setIsTradeModalVisible(false);
  };

  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isSecondStep, setIsSecondStep] = useState(false);

  const handleCloseTutorial = () => {
    setIsFirstStep(false);
    setIsSecondStep(true);
  };

  return (
    <Container>
      <GameHeader text={year || "Default"} />
      <GameMoney />
      <StocksTable />
      <GameButtons openTradeModal={openTradeModal} />
      <GameTradeSwipe
        isVisible={isTradeModalVisible}
        onClose={closeTradeModal}
        year={yearValue}
      />
      {/* {isFirstStep && (
        <Tutorial
          isFirstStep={isFirstStep}
          setFirstStep={setIsFirstStep}
          setSecondStep={setIsSecondStep}
          onClose={handleCloseTutorial}
          title="튜토리얼"
        />
      )} */}
    </Container>
  );
};

export default PlayPage;
