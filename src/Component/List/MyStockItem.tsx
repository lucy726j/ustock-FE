import React, { useState } from "react";
import { StockItemProps } from "../../constants/interface";
import "./StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../util/util";
import StockSearch from "../Modal/stockSearch";
import AddOrEditModal from "../Modal/addStock";
import StockPlusModal from "../Modal/plusStock";
import DeleteConfirmationModal from "../Modal/deleteProtfolio";
import { data } from "../../data/data";

const MyStockItem: React.FC<StockItemProps> = ({
  id,
  name,
  logo,
  code,
  price,
  growth,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockItemProps | null>(
    null
  );
  const [modalAction, setModalAction] = useState<
    "add" | "edit" | "delete" | "plus" | null
  >(null);

  // 확인버튼 눌렀을때 어떻게 될 건지 넣어야함
  const handleConfirm = () => {
    setIsFormOpen(false);
    setIsPlusOpen(false);
    setIsDeleteOpen(false);
  };

  // 모달 액션(종목추가를 누르면 종목 검색 모달이 먼저 뜨게 구현)
  const openModal = (action: "add" | "edit" | "delete" | "plus") => {
    if (action === "add") {
      setIsSearchOpen(true);
    } else {
      setModalAction(action);
      if (action === "delete") {
        setIsDeleteOpen(true);
      } else if (action === "plus") {
        setIsPlusOpen(true); // Open the plus modal
      } else {
        setIsFormOpen(true);
      }
    }
  };

  const handleSelectStock = (stock: StockItemProps) => {
    setSelectedStock(stock);
    setIsSearchOpen(false);
    setModalAction("add");
    setIsFormOpen(true);
  };

  return (
    <div className="MyStockItem">
      <div className="button-section">
        <button onClick={() => openModal("add")}>종목 추가</button>
        <button onClick={() => openModal("plus")}>추가매수</button>
        <button onClick={() => openModal("edit")}>수정</button>
        <button onClick={() => openModal("delete")}>삭제</button>
      </div>
      <div className="MyStockItemWrapper">
        <img className="logo" src={logo}></img>
        <div className="info-section">
          <h2>{name}</h2>
          <p>{code}</p>
        </div>
        <div
          className="growth-section"
          style={{ color: getGrowthColor(growth) }}
        >
          {growth}%
        </div>
        <div className="price-section">
          <p>수량 {id}</p>
          <div>{formatPrice(price)}원</div>
          <p>{formatPrice(id * price)}</p>
        </div>
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
          action={modalAction === "add" ? "add" : "edit"}
          selectedStock={selectedStock}
        />
      )}

      {isPlusOpen && (
        <StockPlusModal
          isOpen={isPlusOpen}
          onRequestClose={() => setIsPlusOpen(false)}
          onConfirm={handleConfirm}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default MyStockItem;
