import { useEffect, useState, useRef } from "react";
import TradeChoice from "./TradeChoice";
import TradeConfirmModal from "./TradeConfirmModal";
import axios from "axios";
import swal from "sweetalert";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { useStock } from "../../store/stockContext";
import { formatPrice } from "../../util/gameUtil";
import styled from "styled-components";
import { useSwipeStore } from "../../store/useSwipeStore";

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
    const [selectedStock, setSelectedStock] = useState<{
        stockId: number;
        name: string;
    } | null>(null);
    const [quantity, setQuantity] = useState(0);
    const [acting, setActing] = useState<"BUY" | "SELL">();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stockOptions, setStockOptions] = useState<
        { stockId: number; name: string }[]
    >([]);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);

    const check = usePortfolioStore((state) => state.check);
    const setCheck = usePortfolioStore((state) => state.setCheck);
    const { holdingList } = useSwipeStore();

    // 모달 외부 클릭 감지하기 위해 ref 생성
    const modalRef = useRef<HTMLDivElement>(null);

    // 모달 외부 클릭 시 닫기 처리
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

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

        // 내가 가지고 있는 주식이면, 수량 업데이트
        const holdingStock = holdingList.find(
            (holding) => holding.stockId === stockOptions[newIndex].stockId
        );
        if (holdingStock) {
            setQuantity(holdingStock.quantity);
        } else {
            setQuantity(0);
        }
    };

    const handleQuantityChange = (direction: "left" | "right") => {
        setQuantity((prev) => {
            if (direction === "left" && prev > 1) {
                return prev - 1;
            } else if (direction === "right") {
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
                setIsModalOpen(false);
                setSelectedStock(stockOptions[0]);
                setQuantity(0);
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
                setIsModalOpen(false);
                // 모달을 닫지 않음, 에러 후 닫지 않는 로직 유지
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

    // 최대구매수량 계산 함수
    const handleMaxPurchaseQuantity = () => {
        if (currentPrice && budget) {
            const maxQuantity = Math.floor(budget / currentPrice);
            setQuantity(maxQuantity > 0 ? maxQuantity : 0);
        }
    };

    // useEffect(() => {
    //     if (stockData) {
    //         const options = stockData.map((stock) => ({
    //             stockId: stock.stockId,
    //             name: stock.name,
    //         }));
    //         setStockOptions(options);
    //         if (!selectedStock && options.length > 0) {
    //             setSelectedStock(options[0]);
    //             setCurrentPrice(stockData[0].current);
    //         }
    //     }
    //     if (selectedStock && stockData) {
    //         const selectedStockData = stockData.find(
    //             (stock) => stock.stockId === selectedStock.stockId
    //         );
    //         setCurrentPrice(selectedStockData?.current || null);
    //     }
    // }, [stockData, selectedStock]);
    useEffect(() => {
        if (stockData && stockData.length > 0) {
            const options = stockData.map((stock) => ({
                stockId: stock.stockId,
                name: stock.name,
            }));
            setStockOptions(options);

            // selectedStock이 없으면 첫 번째 종목을 선택
            if (!selectedStock && options.length > 0) {
                setSelectedStock(options[0]);
                setCurrentPrice(stockData[0].current || 0); // 초기값을 0으로 설정
            } else if (selectedStock) {
                // 선택한 종목에 맞는 가격을 설정
                const selectedStockData = stockData.find(
                    (stock) => stock.stockId === selectedStock.stockId
                );
                setCurrentPrice(selectedStockData?.current || 0); // undefined 방지
            }
        }
    }, [stockData, selectedStock]);

    return (
        <div className="GameTradeSwipe">
            <SwipeModal isOpen={isVisible} ref={modalRef}>
                <SwipeContainer>
                    <div style={{ position: "relative", paddingTop: "20px" }}>
                        {/* <Title>주식 거래하기</Title> */}
                        <TradeChoice
                            title="종목"
                            choiceLeft="←"
                            choiceRight="→"
                            selectedOption={selectedStock?.name || ""}
                            onLeftClick={() => handleStockChange("left")}
                            onRightClick={() => handleStockChange("right")}
                            currentPrice={currentPrice || 0} // undefined 방지
                            handleMaxPurchaseQuantity={
                                handleMaxPurchaseQuantity
                            }
                        />
                        <TradeChoice
                            title="수량"
                            choiceLeft="-"
                            choiceRight="+"
                            selectedOption={quantity.toString()}
                            onLeftClick={() => handleQuantityChange("left")}
                            onRightClick={() => handleQuantityChange("right")}
                            onQuantityChange={handleQuantityInputChange} // 수량 직접 입력 핸들러 전달
                            currentPrice={currentPrice || 0} // undefined 방지
                            handleMaxPurchaseQuantity={
                                handleMaxPurchaseQuantity
                            }
                        />
                    </div>
                    <div>거래가능금액: {formatPrice(budget)}</div>
                    <div>
                        총 합계:{" "}
                        {currentPrice && quantity
                            ? formatPrice(currentPrice * quantity)
                            : 0}
                    </div>

                    <TradeButtonGroup>
                        <TradeButton
                            onClick={() => openTradeConfirmModal("SELL")}
                            disabled={quantity === 0} // 수량이 0이거나 빈 값일 때 비활성화
                        >
                            팔기
                        </TradeButton>
                        <TradeButton
                            onClick={() => openTradeConfirmModal("BUY")}
                            disabled={quantity === 0} // 수량이 0이거나 빈 값일 때 비활성화
                        >
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
    max-height: ${(props) => (props.isOpen ? "60vh" : "0")};
    height: 60vh;
    max-width: 426px;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    transition: bottom 0.7s ease, max-height 0.7s ease;
    z-index: 1;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transform: translateX(-50%);
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
`;

const SwipeContainer = styled.div`
    padding: 20px;
    background-color: #f7f7f7;
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

// const Title = styled.span`
//     font-size: 25px;
//     font-weight: 700;
//     color: #615efc;
//     margin-top: 30px;
// `;

const TradeButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 20px 0;
    width: 250px;
`;

const TradeButton = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 15px;
    background: ${({ disabled }) =>
        disabled
            ? "radial-gradient(circle, #cccccc 0%, #e0e0e0 100%)"
            : "radial-gradient(circle, #4834d4 0%, #686de0 100%)"};
    color: #fff;
    border: none;
    font-size: 14px;
    cursor: pointer;
`;

export default GameTradeSwipe;
