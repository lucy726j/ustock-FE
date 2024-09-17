import { useEffect, useState } from "react";
import "./GameTradeSwipeStyle.css";
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
  } | null>(null); // 선택된 종목 상태
  const [quantity, setQuantity] = useState(1); // 수량 상태
  const [acting, setActing] = useState<"BUY" | "SELL">(); // 거래 액션 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [stockOptions, setStockOptions] = useState<
    { stockId: number; name: string }[]
  >([]); // 종목 리스트 상태

  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const check = usePortfolioStore((state) => state.check);
  const setCheck = usePortfolioStore((state) => state.setCheck);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  // 종목 선택 핸들러
  const handleStockChange = (direction: "left" | "right") => {
    if (!selectedStock || stockOptions.length === 0) return;

    const currentIndex = stockOptions.findIndex(
      (stock) => stock.name === selectedStock.name
    );

    if (direction === "left") {
      const newIndex =
        (currentIndex - 1 + stockOptions.length) % stockOptions.length;
      setSelectedStock(stockOptions[newIndex]);
    } else {
      const newIndex = (currentIndex + 1) % stockOptions.length;
      setSelectedStock(stockOptions[newIndex]);
    }
  };

  // 수량 선택 핸들러
  const handleQuantityChange = (direction: "left" | "right") => {
    if (direction === "left" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (direction === "right") {
      setQuantity(quantity + 1);
    }
  };

  // 선택한 종목의 stockId 찾기
  const getSelectedStockId = () => {
    return selectedStock ? selectedStock.stockId : 0;
  };

  // 모달에서 확인 버튼 클릭 시 거래 처리
  const handleTradeConfirm = () => {
    const handleTrade = async () => {
      const data = {
        stockId: getSelectedStockId(),
        quantity: quantity,
        acting: acting, // 팔기 : SELL, 사기 : BUY
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/v1/game/stock`,
          data,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setCheck(!check);
          swal({
            title: "거래 성공",
            icon: "success",
          });
          setShow(false);
          onClose();
          // .then(() => {
          //     window.location.reload();
          // });
        }
      } catch (error: any) {
        // console.error(error);
        // console.error(error.response.data.message);
        // catch 블록에서 에러 메시지 출력
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "종목을 보유하고 있지 않습니다."
        ) {
          swal({
            title: "거래 오류",
            text: error.response.data.message,
            icon: "error",
          }).then(() => {
            setShow(false);
            onClose();
          });
        } else if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "잔액이 부족합니다."
        ) {
          swal({
            title: "잔액 부족",
            text: error.response.data.message,
            icon: "error",
          }).then(() => {
            setShow(false);
            onClose();
          });
        } else {
          swal({
            title: "거래 실패",
            text: "서버 오류가 발생했습니다. 다시 시도해주세요.",
            icon: "error",
          }).then(() => {
            setShow(false);
            onClose();
          });
        }
      }
    };
    handleTrade();
    setIsModalOpen(false); // 모달 닫기
  };

  // 모달 열기
  const openTradeConfirmModal = (action: "BUY" | "SELL") => {
    setActing(action); // 거래 종류 설정 (구매 or 판매)
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  useEffect(() => {
    // stockData가 변경될 때 stockOptions를 업데이트
    if (stockData) {
      const options = stockData.map((stock) => ({
        stockId: stock.stockId,
        name: stock.name,
      }));
      setStockOptions(options);

      // selectedStock 설정
      if (!selectedStock && options.length > 0) {
        setSelectedStock(options[0]);
        setCurrentPrice(stockData[0].current);
      }
    }

    // selectedStock이 변경될 때마다 가격 업데이트
    if (selectedStock && stockData) {
      const selectedStockData = stockData.find(
        (stock) => stock.stockId === selectedStock.stockId
      );
      setCurrentPrice(selectedStockData?.current || null);
    }
  }, [stockData, selectedStock]);

  const selectedStockName = stockData?.find(
    (stock) => stock.stockId === selectedStock?.stockId
  );

  return (
    <div className="GameTradeSwipe">
      <div
        className={`swipeModal ${show ? "open" : "closed"}`}
        style={{ width: "90%", position: "fixed", bottom: "0" }}
      >
        <div className="swipeContainer">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleClose}></button>
          </div>
          <span>주식 거래하기</span>
          <div>거래가능금액 : {formatPrice(budget)}</div>
          <div>
            총 합계 :
            {currentPrice && quantity
              ? formatPrice(currentPrice * quantity)
              : 0}
          </div>
          <TradeChoice
            title="종목"
            choiceLeft="←"
            choiceRight="→"
            selectedOption={selectedStockName?.name || ""}
            onLeftClick={() => handleStockChange("left")}
            onRightClick={() => handleStockChange("right")}
          />
          <div>
            현재 가격 :{" "}
            {currentPrice !== null
              ? `${formatPrice(currentPrice)}원`
              : "가격 정보 없음"}
          </div>
          <TradeChoice
            title="수량"
            choiceLeft="-"
            choiceRight="+"
            selectedOption={quantity.toString()}
            onLeftClick={() => handleQuantityChange("left")}
            onRightClick={() => handleQuantityChange("right")}
          />
          <div className="trade-button">
            <button onClick={() => openTradeConfirmModal("SELL")}>팔기</button>
            <button onClick={() => openTradeConfirmModal("BUY")}>사기</button>
          </div>
        </div>
      </div>

      {/* 거래 확인 모달 */}
      <TradeConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleTradeConfirm}
        onRequestClose={() => setIsModalOpen(false)}
        stock={selectedStock?.name || ""}
        quantity={quantity}
        acting={acting!} // acting 값 전달 (BUY or SELL)
      />
    </div>
  );
};

export default GameTradeSwipe;


