import React, { useEffect, useState } from "react";
import "./SwipeStyle.css";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import MyStockList from "../List/MyStockList";
import { ListProps, StockProps } from "../../constants/interface";
import StockSearch from "../Modal/stockSearch";
import AddOrEditModal from "../Modal/addStock";
import { usePortfolioStore } from "../../store/usePortfolioStore";

interface SwipeProps {
  portfolioId: number;
}

const MAX_HEIGHT_PERCENT = 80; // 80%
const MIN_HEIGHT_PERCENT = 8; // 10%

const Swipe: React.FC<SwipeProps> = ({ portfolioId }) => {
  const stockData = usePortfolioStore((state) => state.stockData);
  const addStock = usePortfolioStore((state) => state.addStock);
  const [heightPercent, setHeightPercent] = useState(MIN_HEIGHT_PERCENT);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<ListProps | null>(null);
  const [modalAction, setModalAction] = useState<"add" | null>(null);

  const handleSelectStock = (stockData: ListProps) => {
    setSelectedStock(stockData);
    setIsSearchOpen(false);
    setIsFormOpen(true);
    setModalAction("add");
  };

  const handleAddStock = () => {
    setSelectedStock(null);
    setIsSearchOpen(true);
  };

  const handleConfirm = (quantity: number, price: number) => {
    if (modalAction === "add" && selectedStock) {
      const newStock: StockProps = {
        code: selectedStock.code,
        name: selectedStock.name,
        quantity: quantity,
        average: price,
        ror: 0,
        // 새로운 종목이 추가될 때 초기 수익률은 0으로 설정 //이게 뭔소리노
        portfolioId,
        logo: selectedStock.logo,
      };

      addStock(newStock); // zustand 상태 업데이트
    }

    setIsFormOpen(false);
  };

  // useEffect(() => {
  //     alert("실행되니?");
  //     handleAddStock();
  //     // handleSelectStock;
  //     // handleConfirm;
  // }, [handleAddStock]);

  const toggleHeight = () => {
    setHeightPercent(
      heightPercent === MIN_HEIGHT_PERCENT
        ? MAX_HEIGHT_PERCENT
        : MIN_HEIGHT_PERCENT
    );
  };

  return (
    <div style={{ width: "100%", position: "absolute", bottom: "70px" }}>
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
        <MyStockList portfolioId={portfolioId} />
      </div>
      {isSearchOpen && (
        <StockSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelect={handleSelectStock}
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
