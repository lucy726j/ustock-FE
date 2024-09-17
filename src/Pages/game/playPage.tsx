import { useNavigate, useParams } from "react-router-dom";
import GameButtons from "../../Component/Game/GameButtons";
import GameHeader from "../../Component/Game/GameHeader";
import GameMoney from "../../Component/Game/GameMoney";
import StocksTable from "../../Component/Game/StocksTable";
import styled from "styled-components";
import GameTradeSwipe from "../../Component/Game/GameTradeSwipe";
import { useEffect, useState } from "react";
import PassConfirmModal from "../../Component/Game/PassConfirmModal";
import axios from "axios";
import "./gameStyle.css";
import ExSAm from "../../Game/Tutorial/ex";
import { StockYearProps } from "../../constants/interface";
import HappyNewYearModal from "./HappyNewYearModal";
import { useStock } from "../../store/stockContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PlayPage = () => {
  const { year } = useParams<{ year: string }>();
  const { stockData, setStockData } = useStock();
  const nav = useNavigate();
  const yearValue = year || "2014";
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState(false);
  const [stockListData, setStockListData] = useState<StockYearProps[] | null>(
    null
  );
  const [isHappyNewYearModal, setIsHappyNewYearModal] = useState(false);
  const [budget, setBudget] = useState(0);

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
        const updatedStockList = response.data.stockList;
        console.log(updatedStockList);
        console.log(response);
        setStockData(updatedStockList);

        // 중간 결과를 로컬 스토리지에 저장
        localStorage.setItem("stockListData", JSON.stringify(updatedStockList));
        setStockListData(updatedStockList);

        // 새해 모달을 먼저 보여줌
        setIsHappyNewYearModal(true);

        // 4초 후 페이지를 이동
        setTimeout(() => {
          const nextYear = (parseInt(yearValue, 10) + 1).toString();
          nav(`/game/play/${nextYear}`);
          setIsHappyNewYearModal(false);
          // window.location.reload();
        }, 4000); // 4초 동안 모달을 보여줌
      }
    } catch (error) {
      console.error(error);
    } finally {
      closePassModal();
    }
  };

  // 새로고침하면 로컬스토리지에서 불러와지도록
  useEffect(() => {
    const savedData = localStorage.getItem("stockListData");
    if (savedData) {
      setStockListData(JSON.parse(savedData));
    } else if (yearValue === "2014") {
      const stock2014 = localStorage.getItem("stock2014");
      if (stock2014) {
        setStockListData(JSON.parse(stock2014));
      } else {
        setIsHappyNewYearModal(true);
        setTimeout(() => {
          setIsHappyNewYearModal(false);
        }, 4000);
      }
    }
  }, []);

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

