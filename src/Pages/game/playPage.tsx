import { useNavigate, useParams } from "react-router-dom";
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
import HappyNewYearModal from "./HappyNewYearModal";
import { useStock } from "../../store/stockContext";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { useGameStore } from "../../store/useGameStore";
import ProgressBar from "../../Game/Loading/progressBar";
import { GoAlert } from "react-icons/go";
import { Colors } from "../../Styles/Colors";
import Button from "../../Component/Button/button";
import { useHintStore } from "../../store/hintStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PlayPage = () => {
  const { year } = useParams<{ year?: string }>();
  const { stockData, setStockData } = useStock();
  const nav = useNavigate();
  const yearValue = year || "2014";
  // 페이지 유효성 검사를 위한 변수
  const yearNumber = parseInt(yearValue, 10);
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState(false);
  const [isHappyNewYearModal, setIsHappyNewYearModal] = useState(false);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);

  const { check, setCheck } = usePortfolioStore((state) => ({
    check: state.check,
    setCheck: state.setCheck,
  }));

  const { checkYear, setCheckGameDone } = useGameStore((state) => ({
    checkYear: state.checkYear,
    setCheckGameDone: state.setCheckGameDone,
  }));

  const startYear = 2014;
  const lastYear = 2023;

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
        setCheckGameDone(true);
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
          // 로컬 스토리지에서 삭제
          localStorage.removeItem("hint-storage");
          // 주스탠드 스토어 상태 초기화
          useHintStore.getState().resetPurchaseHints();
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
    <>
      {yearNumber !== checkYear ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10rem",
          }}
        >
          <GoAlert
            style={{
              fontSize: "100px",
              color: Colors.main,
              marginBottom: "1rem",
            }}
          />
          <p style={{ marginBottom: "2rem" }}>정상적인 접근 경로가 아닙니다</p>
          <Button
            children="게임 홈으로 돌아가기"
            $state="normal"
            $colorType="gradient"
            $size="medium"
            onClick={() => {
              nav("/game");
            }}
          />
        </div>
      ) : (
        <Container>
          <GameHeader text={year || "Default"} />

          <div
            style={{
              width: "100%",
              marginTop: "1rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProgressBar progress={progress} />
          </div>
          <GameMoney setBudget={setBudget} budget={budget} />
          <StocksTable stocks={stockData || []} year={yearValue} />
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
            year={yearValue}
          />
          <HappyNewYearModal isVisible={isHappyNewYearModal} />
        </Container>
      )}
    </>
  );
};

export default PlayPage;
