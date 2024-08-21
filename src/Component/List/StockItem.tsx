import React from "react";
import { StockProps } from "../../constants/interface";
import "./StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../util/util";
import { useNavigate } from "react-router-dom";

const StockItem: React.FC<StockProps> = ({
  portfolioId,
  name,
  logo,
  code,
  ror,
  average,
}) => {
  const nav = useNavigate();
  const handleStockSelect = () => {
    nav(`/stocks/${portfolioId}`);
  };

  return (
    <div className="StockItem" onClick={handleStockSelect}>
      <img className="logo" src={logo}></img>
      <div className="info-section">
        <h2>{name}</h2>
        <p>{code}</p>
      </div>
      <div className="price">{formatPrice(average)}원</div>
      <div className="growth" style={{ color: getGrowthColor(ror) }}>
        {ror}%
      </div>
    </div>
  );
};

export default StockItem;
