import React from "react";
import {
  StockDataPropList,
  StockDataProps,
} from "../../../constants/interface";
import "../StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../../util/util";
import { useNavigate } from "react-router-dom";

const StockData: React.FC<StockDataProps> = ({
  code,
  name,
  price,
  logo,
  change,
  changeRate,
}) => {
  const nav = useNavigate();
  const handleStockSelect = () => {
    nav(`/stocks/${code}`);
  };

  return (
    <div className="StockItem" id={code} onClick={handleStockSelect}>
      {logo ? (
        <img
          src={logo}
          alt={`${name} logo`}
          style={{
            width: "30px",
            height: "30px",
            marginRight: "20px",
            marginLeft: "1rem",
            borderRadius: "10px",
          }}
        />
      ) : (
        <div
          style={{
            width: "30px",
            height: "30px",
            marginRight: "20px",
            borderRadius: "10px",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            background: "#615EFC",
            marginLeft: "1rem",
          }}
        >
          {name.charAt(0)}
        </div>
      )}

      <div className="info-section">
        <h2>{name}</h2>
        <p>{code}</p>
      </div>
      <div className="price">{formatPrice(price)}원</div>
      <div className="growth" style={{ color: getGrowthColor(change) }}>
        {changeRate}%
      </div>
    </div>
  );
};

export default StockData;
