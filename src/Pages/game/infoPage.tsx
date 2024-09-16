import { useParams } from "react-router-dom";
import ExchangeStoreMain from "../../Game/Shop/exchangeStoreMain";
import GameHeader from "../../Component/Game/GameHeader";

const InfoPage = () => {
  const { year } = useParams<{ year: string }>();
  return (
    <div>
      <GameHeader text="정보거래소" />
      <ExchangeStoreMain />
    </div>
  );
};

export default InfoPage;
