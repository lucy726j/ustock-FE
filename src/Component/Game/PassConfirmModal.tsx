import React from "react";
import ModalOpen from "../Modal/modal";

interface TradeConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onRequestClose: () => void;
}

const PassConfirmModal: React.FC<TradeConfirmModalProps> = ({
    isOpen,
    onConfirm,
    onRequestClose,
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <ModalOpen
                title="넘어가기"
                isOpen={isOpen}
                showOneConfirmBtn={false}
                text="넘어가기"
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
                        거래를 종료하고 <br /> 다음 년도로 넘어가시겠습니까?
                    </p>
                </div>
            </ModalOpen>
        </div>
    );
};

export default PassConfirmModal;
