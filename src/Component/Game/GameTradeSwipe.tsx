import { useEffect, useState } from "react";
import "./GameTradeSwipeStyle.css";
import TradeChoice from "./TradeChoice";
import TradeConfirmModal from "./TradeConfirmModal"; // 모달 컴포넌트 불러오기
import axios from "axios";
import swal from "sweetalert";

interface GameTradeSwipeProps {
    onClose: () => void;
    isVisible: boolean;
    year: string;
}

const GameTradeSwipe = ({ onClose, isVisible, year }: GameTradeSwipeProps) => {
    const [show, setShow] = useState(isVisible);
    const [selectedStock, setSelectedStock] = useState("A뷰티");
    const [quantity, setQuantity] = useState(0);
    const [acting, setActing] = useState<"BUY" | "SELL">();
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

    const stockOptions = ["A뷰티", "B전기", "C전자", "D건설"];

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    // 종목 선택 핸들러
    const handleStockChange = (direction: "left" | "right") => {
        const currentIndex = stockOptions.indexOf(selectedStock);

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
        if (direction === "left" && quantity > 0) {
            setQuantity(quantity - 1);
        } else if (direction === "right") {
            setQuantity(quantity + 1);
        }
    };

    // 모달에서 확인 버튼 클릭 시 거래 처리
    const handleTradeConfirm = () => {
        // 데이터 전송하기
        const handleTrade = async () => {
            const data = {
                year: year,
                gameId: 0,
                stockId: 0, // stockId로 stock 전달해야함. 수정 필요
                stock: selectedStock,
                quantity: quantity,
                acting: acting, // 팔기 : SELL, 사기 : BUY
            };

            // 서버로 데이터 전송
            // try {
            //     const res = await axios.post(
            //         `${process.env.REACT_APP_API_URL}/v1/game/stock?nickname=veronica`,
            //         {
            //             withCredentials: true,
            //         }
            //     );
            //     console.log(res);

            //     if (res.status === 200) {
            //         swal({
            //             title: "거래 성공",
            //             icon: "success",
            //         }).then(() => {
            //             window.location.reload();
            //         });
            //     }
            // } catch (error: any) {
            //     console.error(error);
            // }
            swal({
                title: "거래 성공",
                icon: "success",
            }).then(() => {
                handleClose();
            });

            console.log("선택한 년도 : ", year);
            console.log("선택한 종목 : ", selectedStock);
            console.log("선택한 수량 : ", quantity);
            console.log("선택한 acting : ", acting);
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
                        selectedOption={selectedStock}
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
                stock={selectedStock}
                quantity={quantity}
                acting={acting!} // acting 값 전달 (BUY or SELL)
            />
        </div>
    );
};

export default GameTradeSwipe;
