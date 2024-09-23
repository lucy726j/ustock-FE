import { useEffect, useState } from "react";
import styled from "styled-components";
import TradeChoice from "./TradeChoice";
import TradeConfirmModal from "./TradeConfirmModal";
import axios from "axios";
import swal from "sweetalert";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { useStock } from "../../store/stockContext";
import { formatPrice } from "../../util/gameUtil";

interface GameTradeSwipeProps {
  onClose: () => void;
  isVisible: boolean;
  year: string;
  budget: number;
}

const GameTradeSwipe = ({
  onClose,
  isVisible,
  year,
  budget,
}: GameTradeSwipeProps) => {
  const { stockData } = useStock();
  const [show, setShow] = useState(isVisible);
  const [selectedStock, setSelectedStock] = useState<{
    stockId: number;
    name: string;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [acting, setActing] = useState<"BUY" | "SELL">();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockOptions, setStockOptions] = useState<
    { stockId: number; name: string }[]
  >([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const check = usePortfolioStore((state) => state.check);
  const setCheck = usePortfolioStore((state) => state.setCheck);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  const handleStockChange = (direction: "left" | "right") => {
    if (!selectedStock || stockOptions.length === 0) return;
    const currentIndex = stockOptions.findIndex(
      (stock) => stock.name === selectedStock.name
    );
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + stockOptions.length) % stockOptions.length
        : (currentIndex + 1) % stockOptions.length;
    setSelectedStock(stockOptions[newIndex]);
  };

  const handleQuantityChange = (direction: "left" | "right") => {
    setQuantity((prev) => {
      if (direction === "left" && prev > 1) {
        return prev - 1;
      } else if (
        direction === "right" &&
        currentPrice &&
        currentPrice * (prev + 1) <= budget
      ) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleTradeConfirm = async () => {
    const data = {
      stockId: selectedStock?.stockId || 0,
      quantity,
      acting,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/game/stock`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setCheck(!check);
        swal({ title: "거래 성공", icon: "success" });
        setShow(false);
        setIsModalOpen(false);
        onClose();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data.message || "서버 오류가 발생했습니다.";
      swal({
        title: "거래 실패",
        text: errorMessage,
        icon: "error",
      }).then(() => {
        setShow(false);
        onClose();
      });
    }
  };

  const openTradeConfirmModal = (action: "BUY" | "SELL") => {
    setActing(action);
    setIsModalOpen(true);
  };

  const handleQuantityInputChange = (value: number) => {
    setQuantity(value);
  };

  useEffect(() => {
    if (stockData) {
      const options = stockData.map((stock) => ({
        stockId: stock.stockId,
        name: stock.name,
      }));
      setStockOptions(options);
      if (!selectedStock && options.length > 0) {
        setSelectedStock(options[0]);
        setCurrentPrice(stockData[0].current);
      }
    }
    if (selectedStock && stockData) {
      const selectedStockData = stockData.find(
        (stock) => stock.stockId === selectedStock.stockId
      );
      setCurrentPrice(selectedStockData?.current || null);
    }
  }, [stockData, selectedStock]);

  return (
    <div className="GameTradeSwipe">
      <SwipeModal isOpen={show}>
        <SwipeContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CloseButton onClick={onClose}></CloseButton>
          </div>
          <Title>주식 거래하기</Title>
          <TradeChoice
            title="종목"
            choiceLeft="←"
            choiceRight="→"
            selectedOption={selectedStock?.name || ""}
            onLeftClick={() => handleStockChange("left")}
            onRightClick={() => handleStockChange("right")}
            currentPrice={currentPrice} // 현재 가격 전달
          />
          <TradeChoice
            title="수량"
            choiceLeft="-"
            choiceRight="+"
            selectedOption={quantity.toString()}
            onLeftClick={() => handleQuantityChange("left")}
            onRightClick={() => handleQuantityChange("right")}
            onQuantityChange={handleQuantityInputChange} // 수량 직접 입력 핸들러 전달
          />
          <div>거래가능금액: {formatPrice(budget)}</div>
          <div>
            총 합계:{" "}
            {currentPrice && quantity
              ? formatPrice(currentPrice * quantity)
              : 0}
          </div>
          <TradeButtonGroup>
            <TradeButton onClick={() => openTradeConfirmModal("SELL")}>
              팔기
            </TradeButton>
            <TradeButton onClick={() => openTradeConfirmModal("BUY")}>
              사기
            </TradeButton>
          </TradeButtonGroup>
        </SwipeContainer>
      </SwipeModal>
      <TradeConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleTradeConfirm}
        onRequestClose={() => setIsModalOpen(false)}
        stock={selectedStock?.name || ""}
        quantity={quantity}
        acting={acting!}
      />
    </div>
  );
};

const SwipeModal = styled.div<{ isOpen: boolean }>`
  width: 90%;
  position: fixed;
  left: 50%;
  bottom: ${(props) => (props.isOpen ? "0" : "-100%")};
  max-height: ${(props) => (props.isOpen ? "70vh" : "0")};
  height: 70vh;
  max-width: 440px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  transition: bottom 0.7s ease, max-height 0.7s ease;
  z-index: 1;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transform: translateX(-50%);
  background-color: #f7f7f7;
`;

const SwipeContainer = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  width: 100px;
  height: 10px;
  border-radius: 10px;
  border: none;
  background-color: #dfdfdf;
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #615efc;
  margin-top: 30px;
`;

const TradeButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const TradeButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 15px;
  background: radial-gradient(circle, #4834d4 0%, #686de0 100%);
  color: #fff;
  border: none;
  font-size: 14px;
`;

export default GameTradeSwipe;
