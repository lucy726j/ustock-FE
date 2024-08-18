import React from "react";
import ModalOpen from "./modal";
import { Input } from "../Input/input";
import * as M from "../List/modalStyle";

interface AddOrEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "add" | "edit" | undefined;
  selectedStock: { name: string; code: string; logo: string } | null;
}

const AddOrEditModal: React.FC<AddOrEditModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  selectedStock,
}) => {
  return (
    <ModalOpen
      title={action === "add" ? "자산 추가" : "자산 수정"}
      isOpen={isOpen}
      onRequestClose={onClose}
      showOneConfirmBtn={true}
      text={action === "add" ? "자산 추가" : "자산 수정"}
      onConfirm={onConfirm}
    >
      <div>
        <M.Box>
          <M.Img src={selectedStock?.logo || ""} alt="주식 종목" />
          <div>
            <h2>{selectedStock?.name}</h2>
            <M.P>{selectedStock?.code}</M.P>
          </div>
        </M.Box>
        <M.Container>
          <div>
            <M.Div>수량</M.Div>
            <Input placeholder="수량" size="medium" colorType="fillType" />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <M.Div>평균 단가</M.Div>
            <Input placeholder="단가" size="medium" colorType="fillType" />
          </div>
        </M.Container>
      </div>
    </ModalOpen>
  );
};

export default AddOrEditModal;
