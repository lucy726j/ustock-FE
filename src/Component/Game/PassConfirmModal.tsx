import React from "react";
import ModalOpen from "../Modal/modal";

interface TradeConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onRequestClose: () => void;
    year: string;
}

const PassConfirmModal: React.FC<TradeConfirmModalProps> = ({
    isOpen,
    onConfirm,
    onRequestClose,
    year,
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
                    {year === "2023" ? (
                        <p>
                            게임이 완료되었습니다. <br /> 최종결과로 넘어갑니다.
                        </p>
                    ) : (
                        <p>
                            거래를 종료하고 <br /> 다음 년도로 넘어가시겠습니까?
                        </p>
                    )}
                </div>
            </ModalOpen>
        </div>
    );
};

export default PassConfirmModal;
