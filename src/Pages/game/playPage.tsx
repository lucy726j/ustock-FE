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
import { Stock } from "../../constants/interface";
import "./gameStyle.css";
import ExSAm from "../../Game/Tutorial/ex";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PlayPage = () => {
  const { year } = useParams<{ year: string }>();
  const nav = useNavigate();
  const yearValue = year || "2014";
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState(false);
  const [stockListData, setStockListData] = useState<Stock[] | null>(null);

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
        console.log(response.data);
        setStockListData(response.data.stockList);

        localStorage.setItem(
          "stockListData",
          JSON.stringify(response.data.stockList)
        );

        // 다음년도 이동하면서 데이터 전달
        const nextYear = (parseInt(yearValue, 10) + 1).toString();
        nav(`/game/play/${nextYear}`);
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
    }
  }, []);

  return (
    <Container>
      <GameHeader text={year || "Default"} />
      <GameMoney />
      <StocksTable stocks={stockListData || []} />
      <GameButtons
        openTradeModal={openTradeModal}
        openPassModal={openPassModal}
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
