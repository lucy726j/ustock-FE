import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleConfirm = () => {
    if (!quantity || !price) {
      setIsValid(false);
      return;
    }
    onConfirm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    setPrice(e.target.value);
    setIsValid(true);
  };

  return (
    <ModalOpen
      title={action === "add" ? "자산 추가" : "자산 수정"}
      isOpen={isOpen}
      onRequestClose={onClose}
      showOneConfirmBtn={true}
      text={action === "add" ? "자산 추가" : "자산 수정"}
      onConfirm={handleConfirm}
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
            <Input
              placeholder="수량"
              size="medium"
              colorType="fillType"
              errorMessage="수량을 입력해주세요"
              isValid={isValid || !!quantity}
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <M.Div>평균 단가</M.Div>
            <Input
              placeholder="단가"
              size="medium"
              colorType="fillType"
              errorMessage="단가를 입력해주세요"
              isValid={isValid || !!price}
              value={price}
              onChange={handleChange}
            />
          </div>
        </M.Container>
      </div>
    </ModalOpen>
  );
};

export default AddOrEditModal;
