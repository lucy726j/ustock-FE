import React, { useState } from "react";
import "./SwipeStyle.css";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import MyStockList from "../List/MyStockList";
import { StockItemProps } from "../../constants/interface";
import StockSearch from "../Modal/stockSearch";
import { data } from "../../data/data";
import AddOrEditModal from "../Modal/addStock";

const MAX_HEIGHT = window.innerHeight * 0.8;
const MIN_HEIGHT = 80;

const Swipe: React.FC = () => {
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockItemProps | null>(
    null
  );
  const [modalAction, setModalAction] = useState<"add" | null>(null);

  // 주식 종목 검색 창 모달이 뜬 후 종목 추가로 넘어가는 부분
  const handleSelectStock = (stock: StockItemProps) => {
    setSelectedStock(stock);
    setIsSearchOpen(false);
    setIsFormOpen(true);
    setModalAction("add");
  };

  // + 버튼이 눌러졌을 때 호출
  const handleAddStock = () => {
    setSelectedStock(null); // Clear any previously selected stock
    setIsSearchOpen(true);
  };

  // 현재 열려있는 모달을 닫음
  const handleConfirm = () => {
    setIsFormOpen(false);
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {height === MAX_HEIGHT && (
              <button className="circle-button" onClick={handleAddStock}>
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
      {isSearchOpen && (
        <StockSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelect={handleSelectStock}
          data={data}
        />
      )}
      {isFormOpen && selectedStock && (
        <AddOrEditModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onConfirm={handleConfirm}
          action={modalAction === "add" ? "add" : undefined}
          selectedStock={selectedStock}
        />
      )}
    </div>
  );
};

export default Swipe;
