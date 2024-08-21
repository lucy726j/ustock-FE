import React, { useState } from "react";
import "./SwipeStyle.css";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import MyStockList from "../List/MyStockList";
import { StockItemProps } from "../../constants/interface";
import StockSearch from "../Modal/stockSearch";
import { data } from "../../data/data";
import AddOrEditModal from "../Modal/addStock";

const MAX_HEIGHT_PERCENT = 80; // 80%
const MIN_HEIGHT_PERCENT = 10; // 10%

const Swipe: React.FC = () => {
  const [heightPercent, setHeightPercent] = useState(MIN_HEIGHT_PERCENT);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockItemProps | null>(
    null
  );
  const [modalAction, setModalAction] = useState<"add" | null>(null);

  const handleSelectStock = (stock: StockItemProps) => {
    setSelectedStock(stock);
    setIsSearchOpen(false);
    setIsFormOpen(true);
    setModalAction("add");
  };

  const handleAddStock = () => {
    setSelectedStock(null);
    setIsSearchOpen(true);
  };

  const handleConfirm = () => {
    setIsFormOpen(false);
  };

  const toggleHeight = () => {
    setHeightPercent(heightPercent === MIN_HEIGHT_PERCENT ? MAX_HEIGHT_PERCENT : MIN_HEIGHT_PERCENT);
  };

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
          <h3>스껄무새 님의 자산내역</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {heightPercent === MAX_HEIGHT_PERCENT && (
              <button className="circle-button" onClick={handleAddStock}>
                <span className="plus-icon">+</span>
              </button>
            )}
            <div className="dragHandle" onClick={toggleHeight}>
              <img
                src={heightPercent === MIN_HEIGHT_PERCENT ? close : open}
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
