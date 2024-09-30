import GameHeader from "../../Component/Game/GameHeader";
import GameCarousel from "../../Component/GameCarousel/gameCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { GameStockProps } from "../../constants/interface";
import { GoAlert } from "react-icons/go";
import { Colors } from "../../Styles/Colors";
import Button from "../../Component/Button/button";
import { useNavigate } from "react-router-dom";

const GameStocks = () => {
  const [stocks, setStocks] = useState<GameStockProps[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/game/result/stock`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const dataArray = res.data;
          setStocks(dataArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching gameStock:", error);
      });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <GameHeader text={"주식의 정체 두-둥"} />
      {stocks.length > 0 ? (
        <GameCarousel stocks={stocks} />
      ) : (
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
      )}
    </div>
  );
};

export default GameStocks;
