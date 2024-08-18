import EmblaCarousel from "../Carousel/EmblaCarousel";
import { data } from "../../data/data";
import { EmblaOptionsType } from "embla-carousel";
import HyperText from "../Animation/HyperText";
import { useState } from "react";
import StockSearch from "../Modal/stockSearch";
import { StockItemProps } from "../../constants/interface";
import AddOrEditModal from "../Modal/addStock";
import "./pfStyle.css";

const OPTIONS: EmblaOptionsType = { loop: true };

const Portfolio = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // const [selectedStock, setSelectedStock] = useState<StockItemProps | null>(
  //   null
  // );
  // const [modalAction, setModalAction] = useState<"add" | null>(null);

  // 주식 종목 검색 창 모달이 뜬 후 종목 추가로 넘어가는 부분
  // const handleSelectStock = (stock: StockItemProps) => {
  //   setSelectedStock(stock);
  //   setIsSearchOpen(false);
  //   setIsFormOpen(true);
  //   setModalAction("add");
  // };

  // // + 버튼이 눌러졌을 때 호출
  // const handleAddStock = () => {
  //   setSelectedStock(null); // Clear any previously selected stock
  //   setIsSearchOpen(true);
  // };

  // // 현재 열려있는 모달을 닫음
  // const handleConfirm = () => {
  //   setIsFormOpen(false);
  // };

  return (
    <div className="Portfolio">
      <div className="asset">
        <div className="title">내 자산</div>
        <p>모든 포트폴리오 자산의 총 합입니다.</p>
        <div className="asset-value">
          <div className="total-value">
            <HyperText
              text="₩ 1,110,000" // 적용할 텍스트
              duration={1200} // 애니메이션 지속 시간
              className="text-xl font-bold" // 필요한 클래스명 추가
            />
            <div className="total-growth">+ 12.00%</div>
          </div>
        </div>
        <div className="my-portfolio">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="title">내 포트폴리오</div>
            <button className="circle-button">
              <span className="plus-icon">+</span>
            </button>
          </div>
          <EmblaCarousel data={data} options={OPTIONS} />
        </div>
      </div>
      {/* {isSearchOpen && (
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
      )} */}
    </div>
  );
};

export default Portfolio;
