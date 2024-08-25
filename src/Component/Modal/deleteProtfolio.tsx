import React from "react";
import ModalOpen from "./modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onRequestClose: () => void;
  showCancelButton: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onRequestClose,
  showCancelButton = true,
}) => {
  const showConfirmButton = "delete" ? "true" : "";
  // const showCancelButton = "delete" ? "true" : "";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ModalOpen
        title="종목 삭제"
        isOpen={isOpen}
        showOneConfirmBtn={false}
        text="삭제"
        onConfirm={onConfirm}
        onRequestClose={onRequestClose}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        confirmLabel="삭제"
        cancelLabel="취소"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <p>정말 이 항목을 삭제하시겠습니까?</p>
        </div>
      </ModalOpen>
    </div>
  );
};

export default DeleteConfirmationModal;
