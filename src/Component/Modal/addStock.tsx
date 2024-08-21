import React, { useEffect, useState } from "react";
import ModalOpen from "./modal";
import { Input } from "../Input/input";
import * as M from "../List/modalStyle";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface AddOrEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, price: number) => void;
  action: "add" | "edit" | undefined;
  selectedStock: {
    id: number;
    name: string;
    code: string;
    logo: string;
  } | null;
}

const AddOrEditModal: React.FC<AddOrEditModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  selectedStock,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isValidQuantity, setIsValidQuantity] = useState(true);
  const [isValidPrice, setIsValidPrice] = useState(true);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log("id : ", id);

  const handleConfirm = () => {
    if (!quantity || !price) {
      setIsValidQuantity(false);
      setIsValidPrice(false);
      return;
    }
    onConfirm(quantity, price);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setQuantity(isNaN(value) ? 0 : value);
    setIsValidQuantity(true);
  };

  const handelChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrice(isNaN(value) ? 0 : value);
    setIsValidPrice(true);
  };

  useEffect(() => {
    if (selectedStock && quantity > 0 && price > 0) {
      axios
        .post(
          `http://localhost:8080/v1/portfolio/${id}/holding/${selectedStock?.code}`,
          { quantity, price },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          alert("내 자산 추가 ~ 성공 !");
        })
        .catch((error) => {
          console.log(error);
          alert("에렁미...");
        });
    }
  }, [selectedStock, quantity, price]);

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
          {selectedStock?.logo ? (
            <img
              src={selectedStock.logo}
              alt={`${selectedStock.name} logo`}
              style={{
                width: "30px",
                height: "30px",
                marginRight: "20px",
              }}
            />
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                marginRight: "20px",
                borderRadius: "10px",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                color: "#fff",
                background: "#615EFC",
              }}
            >
              {selectedStock?.name.charAt(0)}
            </div>
          )}
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
              isValid={isValidQuantity || !!quantity}
              value={quantity.toString()}
              onChange={handleChangeQuantity}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <M.Div>평균 단가</M.Div>
            <Input
              placeholder="단가"
              size="medium"
              colorType="fillType"
              errorMessage="단가를 입력해주세요"
              isValid={isValidPrice || !!price}
              value={price.toString()}
              onChange={handelChangePrice}
            />
          </div>
        </M.Container>
      </div>
    </ModalOpen>
  );
};

export default AddOrEditModal;
