import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import GameButtons from "../../Component/Game/GameButtons";
import GameHeader from "../../Component/Game/GameHeader";
import GameMoney from "../../Component/Game/GameMoney";
import StocksTable from "../../Component/Game/StocksTable";
import styled from "styled-components";
import GameTradeSwipe from "../../Component/Game/GameTradeSwipe";
import { useState } from "react";
import PassConfirmModal from "../../Component/Game/PassConfirmModal";
import axios from "axios";
import "./gameStyle.css";
import ExSAm from "../../Game/Tutorial/ex";
import HappyNewYearModal from "./HappyNewYearModal";
import { useStock } from "../../store/stockContext";
import { usePortfolioStore } from "../../store/usePortfolioStore";

import RollModal from "../../Game/Tutorial/roll";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const PlayPage = () => {
  const { year } = useParams<{ year: string }>();
  const { stockData, setStockData } = useStock();
  const nav = useNavigate();
  const yearValue = year || "2014";
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState(false);
  const [isHappyNewYearModal, setIsHappyNewYearModal] = useState(false);
  const [budget, setBudget] = useState(0);

  const check = usePortfolioStore((state) => state.check);
  const setCheck = usePortfolioStore((state) => state.setCheck);

  // 튜토리얼을 볼지 결정하는 상태 (첫 번째 튜토리얼 단계 관리)
  const [fir, setFir] = useState(true); // 처음엔 true로 설정하여 튜토리얼 표시
  const [sec, setSec] = useState(false); // 두 번째 튜토리얼 단계를 위한 상태
  const [step, setStep] = useState(1); // 현재 튜토리얼 단계

  // 첫번째 튜토리얼을 닫는 함수
  const closeFirstTutorial = () => {
    setFir(false); // 첫 번째 튜토리얼을 닫음
    setSec(true); // 두 번째 튜토리얼도 닫음
  };

  // 두번째 튜토리얼을 닫는 함수
  const closeSecTutorial = () => {
    setSec(false);
  };

  // 튜토리얼이 완료되었는지 확인하고 스크롤을 허용
  useEffect(() => {
    if (!fir && !sec) {
      document.body.style.overflow = "auto";
    }
  }, [fir, sec]);

  // 거래하기 모달 핸들러
  const openTradeModal = () => {
    setIsTradeModalVisible(true);
  };

  const closeTradeModal = () => {
    setIsTradeModalVisible(false);
  };

  // 넘어가기 모달 핸들러
  const openPassModal = () => {
    setIsPassModalVisible(true);
  };

  const closePassModal = () => {
    setIsPassModalVisible(false);
  };

  // 넘어가기 버튼 누르면 중간결과 호출
  const handleConfirmPass = async () => {
    try {
      if (year === "2023") {
        console.log("게임 끝");
        nav("/game/result/total");
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/v1/game/interim`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          // 새해 모달을 먼저 보여줌(7초동안 띄워야함)

          setIsHappyNewYearModal(true);
          if (
            (parseInt(yearValue, 10) + 1).toString() ===
            response.data.year.toString()
          ) {
            const updatedStockList = response.data.stockList;
            setStockData(updatedStockList);
          }
          // 4초 후 페이지를 이동
          setTimeout(() => {
            const nextYear = (parseInt(yearValue, 10) + 1).toString();

            nav(`/game/play/${nextYear}`);
            setIsHappyNewYearModal(false);
            setCheck(!check);
            // window.location.reload();
          }, 500); // 4초 동안 모달을 보여줌
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      closePassModal();
    }
  };

  return (
    <Container>
      <GameHeader text={year || "Default"} />
      <GameMoney setBudget={setBudget} budget={budget} />
      <StocksTable stocks={stockData || []} />
      <GameButtons
        openTradeModal={openTradeModal}
        openPassModal={openPassModal}
        setBudget={setBudget}
        budget={budget}
      />
      <GameTradeSwipe
        isVisible={isTradeModalVisible}
        onClose={closeTradeModal}
        year={yearValue.toString()}
        budget={budget}
      />
      <PassConfirmModal
        isOpen={isPassModalVisible}
        onRequestClose={closePassModal}
        onConfirm={handleConfirmPass}
      />
      <HappyNewYearModal isVisible={isHappyNewYearModal} />

      {/* 튜토리얼을 표시 */}
      {(fir || sec) && (
        <ExSAm
          fir={fir}
          setFir={setFir}
          setSec={setSec}
          step={step}
          tutorialClose={closeFirstTutorial}
          sec={sec}
          closeSecondTutorial={closeSecTutorial}
        />
      )}
    </Container>
  );
};

export default PlayPage;
