import React, { useState } from "react";
import "./SwipeStyle.css";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import MyStockList from "../List/MyStockList";
import { StockProps } from "../../constants/interface";

interface SwipeProps {
    stockData: StockProps[];
    portfolioId: string;
}

const MAX_HEIGHT_PERCENT = 80; // 80%
const MIN_HEIGHT_PERCENT = 10; // 10%

const Swipe: React.FC<SwipeProps> = ({ stockData, portfolioId }) => {
  const [heightPercent, setHeightPercent] = useState(MIN_HEIGHT_PERCENT);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleHeight = () => {
    setHeightPercent(heightPercent === MIN_HEIGHT_PERCENT ? MAX_HEIGHT_PERCENT : MIN_HEIGHT_PERCENT);
  };
    console.log(stockData)

  return (
    <div style={{ width: "100%", position: "absolute", bottom: '70px'}}>
      <div
        className="swipeableContainer"
        style={{
          height: `${heightPercent}%`,
          overflowY: heightPercent === MIN_HEIGHT_PERCENT ? "hidden" : "auto",
        }}
      >
        <div className="swipeHandle">
          <h3>자산내역</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="dragHandle" onClick={toggleHeight}>
              <img
                src={heightPercent === MIN_HEIGHT_PERCENT ? close : open}
                alt="drag handle"
                className="dragHandleImage"
              />
            </div>
          </div>
        </div>
        <MyStockList stockData={stockData} portfolioId={portfolioId} />
      </div>
    </div>
  );
};

export default Swipe;
