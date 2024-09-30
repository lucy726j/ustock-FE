import React, { useEffect, useState } from "react";
import Button from "../Button/button";
import { ButtonStyle, ModalBody, ModalHeader, ModalStyles } from "./modalStyle";
import { ModalProps } from "../../constants/interface";
import ReactModal, { Styles } from "react-modal";

const getModalStyles = (isSmallScreen: boolean): Styles => {
    return {
        overlay: {
            backgroundColor: "rgb(255 255 255 / 60%)",
            width: isSmallScreen ? "100%" : "90%",
            height: "100%",
            zIndex: 100,
            top: "0",
            left: "0",
        },
        content: {
            width: isSmallScreen ? "85%" : "400px",
            height: isSmallScreen ? "400px" : "450px",
            zIndex: "11",
            position: "fixed" as const,
            scrollbarWidth: "none",
            marginLeft: "-15px",
            top: "50%",
            left: "50%",
            transform: "translate(-46%, -50%)",
            overflow: "auto",
            padding: isSmallScreen ? "20px" : "40px",
        },
    };
};

const ModalOpen: React.FC<ModalProps> = ({
    title,
    isOpen,
    onRequestClose,
    onConfirm,
    confirmLabel = "확인",
    cancelLabel = "취소",
    showConfirmButton = true,
    showCancelButton = true,
    showOneConfirmBtn = false,
    text,
    children,
    icon,
}) => {
    const [isSmallScreen, setIsSamllScreen] = useState(
        window.matchMedia("(max-width: 768px)").matches
    );

    useEffect(() => {
        const handleResize = () => {
            setIsSamllScreen(window.matchMedia("(max-width: 768px)").matches);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const modalStyles = getModalStyles(isSmallScreen);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            contentLabel={title || "모달창"}
            shouldCloseOnOverlayClick={false}
            style={modalStyles}
        >
            <ModalHeader>
                {icon ? (
                    <div>
                        <img src={icon} />
                    </div>
                ) : (
                    <>
                        {title && <h2>{title}</h2>}
                        <ButtonStyle onClick={onRequestClose}>×</ButtonStyle>
                    </>
                )}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {showOneConfirmBtn ? (
                // 하나의 텍스트 버튼만 있는 모달
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                >
                    {onConfirm && (
                        <Button
                            onClick={onConfirm}
                            $size="plusBtn"
                            $colorType="main"
                            $state="normal"
                        >
                            {text}
                        </Button>
                    )}
                </div>
            ) : (
                // 확인/취소 버튼이 있는 모달
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: isSmallScreen ? "20px" : "50px",
                    }}
                >
                    {showCancelButton && (
                        <div style={{ marginRight: "0.5rem" }}>
                            <Button
                                onClick={onRequestClose}
                                $size="small"
                                $colorType="cancel"
                                $state="normal"
                            >
                                {cancelLabel}
                            </Button>
                        </div>
                    )}
                    {showConfirmButton && onConfirm && (
                        <Button
                            onClick={onConfirm}
                            $size="small"
                            $colorType="main"
                            $state="normal"
                        >
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            )}
        </ReactModal>
    );
};

export default ModalOpen;
