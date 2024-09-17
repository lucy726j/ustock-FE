import GameHeader from "../../Component/Game/GameHeader";
import GameCarousel from "../../Component/GameCarousel/gameCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { GameStockProps } from "../../constants/interface";

const GameStocks = () => {
  const [stocks, setStocks] = useState<GameStockProps[]>([]);

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
    <div>
      <GameHeader text={"주식의 정체 두-둥"} />
      {stocks.length > 0 ? (
        <GameCarousel stocks={stocks} />
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default GameStocks;
