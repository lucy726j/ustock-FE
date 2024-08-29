import React, { useEffect, useState } from "react";
import portfolioImg from "../../img/portfolioImg.png";
import styled from "styled-components";
import Button from "../Button/button";
import AddPortfolioModal from "../Modal/AddPortfolio";
import axios from "axios";
import swal from "sweetalert";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 스타일드 컴포넌트 정의
const PfCreateContainer = styled.div`
  text-align: center;
  margin-top: 10vh;
  margin-bottom: 2rem;
  width: 330px;
  height: 320px;
  border-radius: 20px;
  background-color: rgb(97, 94, 252, 0.28);
  padding: 3rem 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PfCreateImage = styled.img`
  width: 112px;
  height: 112px;
`;

const PfCreateTitle = styled.h3`
  font-size: 17px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: #555555;
`;

const PfCreateDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #888888;
`;

const PfCreate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const isPortfolio = usePortfolioStore((state) => state.isPortfolio);
  const portfolioChange = usePortfolioStore((state) => state.portfolioChange);
  const nav = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/portfolio`,
        { name: portfolioName },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          closeModal();
          swal({
            title: "포트폴리오를 생성했습니다.",
            icon: "success",
          });
          isPortfolio(!portfolioChange);
        } else {
          isPortfolio(portfolioChange);
        }
      })
      .catch((e) => {
        nav("/error");
      });
  };

  return (
    <Box>
      <PfCreateContainer>
        <PfCreateImage src={portfolioImg} alt="Portfolio" />
        <PfCreateTitle>나만의 포트폴리오를 만들어보세요!</PfCreateTitle>
        <PfCreateDescription>
          내가 원하는 종목과 금액으로 <br />
          나만의 포트폴리오를 구성하고
          <br />
          수익률을 확인해보세요.
        </PfCreateDescription>
      </PfCreateContainer>
      <div>
        <Button
          onClick={openModal}
          $size="large"
          $colorType="main"
          $state="normal"
        >
          포트폴리오 만들기
        </Button>
      </div>
      <AddPortfolioModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleConfirm}
        portfolioName={portfolioName}
        setPortfolioName={setPortfolioName}
      />
    </Box>
  );
};

export default PfCreate;
