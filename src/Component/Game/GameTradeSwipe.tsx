import { useEffect, useState } from "react";
import "./GameTradeSwipeStyle.css";
import TradeChoice from "./TradeChoice";
import TradeConfirmModal from "./TradeConfirmModal";
import axios from "axios";
import swal from "sweetalert";

interface GameTradeSwipeProps {
    onClose: () => void;
    isVisible: boolean;
    year: string;
}

const GameTradeSwipe = ({ onClose, isVisible, year }: GameTradeSwipeProps) => {
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
                    swal({
                        title: "거래 성공",
                        icon: "success",
                    }).then(() => {
                        window.location.reload();
                    });
                }
            } catch (error: any) {
                // console.error(error);
                // console.error(error.response.data.message);
                // catch 블록에서 에러 메시지 출력
                if (
                    error.response &&
                    error.response.status === 400 &&
                    error.response.data.message ===
                        "종목을 보유하고 있지 않습니다."
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

    // 로컬스토리지에서 종목 갖고오기
    useEffect(() => {
        const stock2014 = localStorage.getItem("stock2014");
        const stockListData = localStorage.getItem("stockListData");

        if (stock2014) {
            const parsedStock2014 = JSON.parse(stock2014);
            setStockOptions(parsedStock2014);
            if (!selectedStock) {
                setSelectedStock(parsedStock2014[0]); // 첫 번째 종목을 기본값으로 설정
            }
        } else if (stockListData) {
            const parsedStockListData = JSON.parse(stockListData);
            setStockOptions(parsedStockListData);
            if (!selectedStock) {
                setSelectedStock(parsedStockListData[0]); // 첫 번째 종목을 기본값으로 설정
            }
        } else {
            console.log("로컬 스토리지에서 주식 데이터를 찾을 수 없습니다.");
        }
    }, []);

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
                    <TradeChoice
                        title="종목"
                        choiceLeft="←"
                        choiceRight="→"
                        selectedOption={selectedStock?.name || ""}
                        onLeftClick={() => handleStockChange("left")}
                        onRightClick={() => handleStockChange("right")}
                    />
                    <TradeChoice
                        title="수량"
                        choiceLeft="-"
                        choiceRight="+"
                        selectedOption={quantity.toString()}
                        onLeftClick={() => handleQuantityChange("left")}
                        onRightClick={() => handleQuantityChange("right")}
                    />
                    <div className="trade-button">
                        <button onClick={() => openTradeConfirmModal("SELL")}>
                            팔기
                        </button>
                        <button onClick={() => openTradeConfirmModal("BUY")}>
                            사기
                        </button>
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
