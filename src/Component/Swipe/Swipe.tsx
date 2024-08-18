import React, { useState } from "react";
import "./SwipeStyle.css";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import MyStockList from "../List/MyStockList";

const MAX_HEIGHT = window.innerHeight * 0.8;
const MIN_HEIGHT = 80;

const Swipe: React.FC = () => {
  const [height, setHeight] = useState(MIN_HEIGHT);

  const toggleHeight = () => {
    setHeight(height === MIN_HEIGHT ? MAX_HEIGHT : MIN_HEIGHT);
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        className="swipeableContainer"
        style={{
          height,
          overflowY: height === MIN_HEIGHT ? "hidden" : "auto", // 조건에 따른 overflow 설정
        }}
      >
        <div className="swipeHandle">
          <h3>스껄무새 님의 자산내역</h3>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {height === MAX_HEIGHT && (
              <button className="circle-button">
                <span className="plus-icon">+</span>
              </button>
            )}
            <div className="dragHandle" onClick={toggleHeight}>
              <img
                src={height === MIN_HEIGHT ? close : open}
                alt="drag handle"
                className="dragHandleImage"
              />
            </div>
          </div>
        </div>
        <MyStockList />
      </div>
    </div>
  );
};

export default Swipe;
