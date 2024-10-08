import React, { useState } from "react";
import ModalOpen from "./modal";
import { Input } from "../Input/input";
import * as M from "../List/modalStyle";
import axios from "axios";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { usePortfolioStore } from "../../store/usePortfolioStore";

interface AddOrEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, price: number) => void;
  action: "add" | "edit" | undefined;
  selectedStock: {
    portfolioId: number;
    name: string;
    code: string;
    logo?: string;
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

  const { change, setChange } = usePortfolioStore();

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setQuantity(isNaN(value) ? 0 : value);
    setIsValidQuantity(true);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrice(isNaN(value) ? 0 : value);
    setIsValidPrice(true);
  };

  const handleConfirm = () => {
    if (quantity <= 0 || price <= 0) {
      setIsValidQuantity(quantity > 0);
      setIsValidPrice(price > 0);
      swal({
        title: "입력 오류",
        text: "수량과 가격을 정확히 입력해주세요!",
        icon: "warning",
      });
      return;
    }

    if (selectedStock) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/v1/portfolio/${id}/holding/${selectedStock.code}`,
          { quantity, price },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "자산 추가가 되었습니다.",
              text: "성공적으로 완료되었습니다",
              icon: "success",
            });
            onConfirm(quantity, price);
            onClose();
            setChange(!change);
          }
        })
        .catch((error) => {
          swal({
            title: "추가에 실패하셨습니다.",
            text: "다시 시도해주세요!",
            icon: "error",
          });

          setPrice(0);
          setQuantity(0);
        });
    }
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
            <M.Div>수량 (최대 99,999주)</M.Div>
            <Input
              placeholder="수량"
              size="medium"
              colorType="fillType"
              errorMessage="수량을 입력해주세요"
              isValid={isValidQuantity || quantity > 0}
              value={quantity.toString()}
              onChange={handleChangeQuantity}
              maxLength={5}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <M.Div>평균 단가 (최대 9,999,999,999원)</M.Div>
            <Input
              placeholder="단가"
              size="medium"
              colorType="fillType"
              errorMessage="단가를 입력해주세요"
              isValid={isValidPrice || price > 0}
              value={price.toString()}
              onChange={handleChangePrice}
              maxLength={10}
            />
          </div>
        </M.Container>
      </div>
    </ModalOpen>
  );
};

export default AddOrEditModal;
