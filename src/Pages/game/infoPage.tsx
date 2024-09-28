import { useParams, useNavigate } from "react-router-dom";
import ExchangeStoreMain from "../../Game/Shop/exchangeStoreMain";
import GameHeader from "../../Component/Game/GameHeader";
import { GoAlert } from "react-icons/go";
import { Colors } from "../../Styles/Colors";
import Button from "../../Component/Button/button";
import { useGameStore } from "../../store/useGameStore";

const InfoPage = () => {
  const { year } = useParams<{ year: string }>();
  const yearValue = year || "2014";
  const yearNumber = parseInt(yearValue, 10);
  const checkYear = useGameStore((state) => state.checkYear);
  const nav = useNavigate();

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
        <div>
          <GameHeader text="정보거래소" />
          <ExchangeStoreMain />
        </div>
      )}
    </>
  );
};

export default InfoPage;
