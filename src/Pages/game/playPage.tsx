import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import ProgressBar from "../../Game/Loading/progressBar";

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
  const [loading, setLoading] = useState(false);

  const check = usePortfolioStore((state) => state.check);
  const setCheck = usePortfolioStore((state) => state.setCheck);

  const startYear = 2014;
  const lastYear = 2023;

  // 튜토리얼을 볼지 결정하는 상태 (첫 번째 튜토리얼 단계 관리)
  const [fir, setFir] = useState(true); // 처음엔 true로 설정하여 튜토리얼 표시
  const [sec, setSec] = useState(false); // 두 번째 튜토리얼 단계를 위한 상태
  const [step, setStep] = useState(1); // 현재 튜토리얼 단계

  // 컴포넌트가 마운트될 때 튜토리얼 상태를 로컬 스토리지에서 확인
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (hasSeenTutorial === "true") {
      setFir(false); // 이미 튜토리얼을 본 경우 튜토리얼을 표시하지 않음
      setSec(false);
    }
  }, []);

  // 첫번째 튜토리얼을 닫는 함수
  const closeFirstTutorial = () => {
    setFir(false); // 첫 번째 튜토리얼을 닫음
    setSec(true); // 두 번째 튜토리얼도 닫음
  };

  // 두번째 튜토리얼을 닫는 함수
  const closeSecTutorial = () => {
    setSec(false);
  };

  // 페이지가 마운트되거나 경로가 변경될 때마다 스크롤 상태를 초기화
  useEffect(() => {
    const resetScroll = () => {
      if (!fir && !sec) {
        document.body.style.overflow = "auto"; // 스크롤 허용
      } else {
        document.body.style.overflow = "hidden"; // 튜토리얼 진행 중일 때 스크롤 차단
      }
    };

    resetScroll(); // 처음 페이지가 마운트될 때 스크롤 설정

    // 페이지가 떠날 때 스크롤을 auto로 리셋
    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트 언마운트 시 스크롤 허용
    };
  }, [fir, sec]); // fir, sec 상태가 변경될 때마다 실행

  const location = useLocation();

  // 페이지 이동 시 스크롤 상태 초기화
  useEffect(() => {
    document.body.style.overflow = "auto"; // 경로 변경 시 스크롤 초기화
  }, [location.pathname]);

  // 페이지 경로 변경 시 스크롤 상태를 확인하고 초기화
  useEffect(() => {
    // 페이지 경로가 바뀌었을 때 튜토리얼 상태에 따른 스크롤 초기화
    if (!fir && !sec) {
      document.body.style.overflow = "auto"; // 튜토리얼이 완료되었으면 스크롤 허용
    } else {
      document.body.style.overflow = "hidden"; // 튜토리얼 중이면 스크롤 차단
    }
  }, [location.pathname, fir, sec]); // location.pathname, fir, sec이 변경될 때마다 실행

  // 년도 진행률 표시
  const calculateProgress = () => {
    return (
      ((parseInt(yearValue, 10) - startYear) / (lastYear - startYear)) * 100
    );
  };

  const [progress, setProgress] = useState<number>(calculateProgress);

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
      setLoading(true);
      setIsHappyNewYearModal(true);
      setIsPassModalVisible(false);

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
          if (
            (parseInt(yearValue, 10) + 1).toString() ===
            response.data.year.toString()
          ) {
            const updatedStockList = response.data.stockList;
            setStockData(updatedStockList);
          }

          // API 완료 후 모달 닫고 페이지 이동
          setIsHappyNewYearModal(false);
          const nextYear = (parseInt(yearValue, 10) + 1).toString();
          nav(`/game/play/${nextYear}`);
          setCheck(!check);
          setProgress(
            ((parseInt(nextYear, 10) - startYear) / (lastYear - startYear)) *
              100
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closePassModal();
    }
  };

  return (
    <Container>
      <GameHeader text={year || "Default"} />
      <div
        style={{
          width: "100%",
          marginTop: "1rem",
          textAlign: "left",
        }}
      >
        <p style={{ paddingLeft: "3.5rem", fontSize: "12px" }}>게임 진행도</p>
        <ProgressBar progress={progress} />
      </div>

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
