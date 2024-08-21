import React from "react";
import { StockDataPropList } from "../../constants/interface";
import "./StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../util/util";
import { useLocation, useNavigate } from "react-router-dom";

const StockItem: React.FC<StockDataPropList> = ({ data }) => {
  const nav = useNavigate();
  const handleStockSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e);
    const stockItemDiv = (e.target as HTMLElement).closest(".StockItem");
    const stockId = stockItemDiv?.id;
    nav(`/stocks/${stockId}`);
  };

  return data.map((stock) => (
    <div className="StockItem" id={stock.code} onClick={handleStockSelect}>
      {stock?.logo ? (
        <img className="logo" src={stock.logo}></img>
      ) : (
        <div className="logo">{stock?.name.charAt(0)}</div>
      )}

      <div className="info-section">
        <h2>{stock.name}</h2>
        <p>{stock.code}</p>
      </div>
      <div className="price">{formatPrice(stock.price)}원</div>
      <div className="growth" style={{ color: getGrowthColor(stock.change) }}>
        {stock.changeRate}%
      </div>
    </div>
  ));
};

export default StockItem;
