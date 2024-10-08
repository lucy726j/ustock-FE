import React from "react";
import ModalOpen from "../Modal/modal";

interface TradeConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onRequestClose: () => void;
    stock: string;
    quantity: number;
    acting: "BUY" | "SELL";
}

const TradeConfirmModal: React.FC<TradeConfirmModalProps> = ({
    isOpen,
    onConfirm,
    onRequestClose,
    stock,
    quantity,
    acting,
}) => {
    const actionText = acting === "BUY" ? "구매" : "판매";

    // 이벤트 전파를 막기 위한 함수
    const handleModalClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation(); // 클릭 이벤트가 상위로 전파되지 않도록 처리
    };

    return (
        <div
            onClick={handleModalClick} // 모달 내에서 클릭한 이벤트가 상위로 전파되지 않도록 처리
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <ModalOpen
                title="거래 확인"
                isOpen={isOpen}
                showOneConfirmBtn={false}
                text="거래 확인"
                onConfirm={onConfirm}
                onRequestClose={onRequestClose}
                showConfirmButton="true"
                showCancelButton={true}
                confirmLabel="확인"
                cancelLabel="취소"
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                    }}
                >
                    <p>
                        {stock} {quantity}주를 {actionText}합니다. <br />
                        거래를 진행할까요?
                    </p>
                </div>
            </ModalOpen>
        </div>
    );
};

export default TradeConfirmModal;
