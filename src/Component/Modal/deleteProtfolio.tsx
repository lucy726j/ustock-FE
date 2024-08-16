import React from "react";
import ModalOpen from "./modal"; // Your custom modal component

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const showConfirmButton = "delete" ? "true" : "";
  // const showCancelButton = "delete" ? "true" : "";
  return (
    <ModalOpen
      title="종목 삭제"
      isOpen={isOpen}
      onRequestClose={onClose}
      showOneConfirmBtn={false}
      text="삭제"
      onConfirm={onConfirm}
      showConfirmButton={showConfirmButton}
      showCancelButton={true}
      confirmLabel="삭제"
      cancelLabel="취소"
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <p>정말 이 항목을 삭제하시겠습니까?</p>
      </div>
    </ModalOpen>
  );
};

export default DeleteConfirmationModal;
