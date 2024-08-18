import React from "react";
import Button from "../Button/button";
import { ButtonStyle, ModalBody, ModalHeader, ModalStyles } from "./modalStyle";
import { ModalProps } from "../../constants/interface";
import ReactModal from "react-modal";

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
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      contentLabel={title || "모달창"}
      shouldCloseOnOverlayClick={false}
      style={ModalStyles}
    >
      <ModalHeader>
        {icon ? (
          <div>
            <img src={icon} />
          </div>
        ) : (
          <div>
            {title && <h2>{title}</h2>}
            <ButtonStyle onClick={onRequestClose}>×</ButtonStyle>
          </div>
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
              size="plusBtn"
              colorType="main"
              state="normal"
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
            marginTop: "50px",
          }}
        >
          {showCancelButton && (
            <div style={{ marginRight: "0.5rem" }}>
              <Button
                onClick={onRequestClose}
                size="small"
                colorType="cancel"
                state="normal"
              >
                {cancelLabel}
              </Button>
            </div>
          )}
          {showConfirmButton && onConfirm && (
            <Button
              onClick={onConfirm}
              size="small"
              colorType="main"
              state="normal"
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

// 모달 사용 예시
{
  /* <ModalOpen
                title="자산 추가"
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                showOneConfirmBtn={true}
                text="자산 추가"
                onConfirm={handleConfirm}
                >
                    <div>
                        <div>
                            <h3>APS</h3>
                            <p>05462</p>
                        </div>
                        <div>
                            <div>수량</div>
                            <Input placeholder="수량" size="medium" colorType="fillType"/>
                            <div>단가</div>
                            <Input placeholder="단가" size="medium" colorType="fillType"/>
                        </div>
                    </div>
            </ModalOpen> */
}
