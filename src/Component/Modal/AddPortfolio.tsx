import React, { useState } from "react";
import { Input } from "../Input/input";
import "./AddPortfolioStyle.css";
import Icon from "../../img/Icon.png";
import ModalOpen from "./modal";
import newPortfolio from "../../img/newPortfolio.png";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";

const Title = styled.span`
  font-size: 20px;
  color: ${Colors.main};
  font-family: "SCDream6";
`;

const Div = styled.div`
  font-size: 14px;
  font-family: "SCDream2";
  margin: 10px;
`;

interface NewPortfolioModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  portfolioName: string;
  setPortfolioName: (name: string) => void;
}

const AddPortfolioModal: React.FC<NewPortfolioModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  portfolioName,
  setPortfolioName,
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleConfirm = () => {
    console.log("핸들러 콜 ~");
    if (!portfolioName) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    onConfirm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioName(e.target.value);
    if (e.target.value) {
      setIsValid(true);
    }
  };

  return (
    <ModalOpen
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      showConfirmButton="확인"
      showCancelButton={true}
      icon={newPortfolio}
      onConfirm={handleConfirm}
      confirmLabel="확인"
    >
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <Title>새 포트폴리오 추가</Title>
      </div>
      <Div>이름</Div>
      <Input
        icon={<img src={Icon} />}
        placeholder="포트폴리오 이름을 입력해주세요"
        size="medium"
        colorType="strokeType"
        value={portfolioName}
        onChange={handleInputChange}
        isValid={isValid}
        errorMessage="포트폴리오 이름을 입력해주세요"
      />
    </ModalOpen>
  );
};

export default AddPortfolioModal;
