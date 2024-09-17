import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swipe from "../Swipe/Swipe";
import PfCard from "./PfCard";
import PieChart from "../Chart/PieChart";
import axios from "axios";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import DeleteConfirmationModal from "../Modal/deletePortfolio";
import swal from "sweetalert";
import DeleteButton from "../Button/DeleteButton";
import DeleteButton2 from "../Button/DeleteButton2";
import styled from "styled-components";

const TitleDiv = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 1rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PortfolioDetail = () => {
  const location = useLocation();
  const id = Number(location.pathname.split("/")[2]);
  const nav = useNavigate();

  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);
  const setFinancialData = usePortfolioStore((state) => state.setFinancialData);
  const pfName = usePortfolioStore((state) => state.pfName);
  const data = usePortfolioStore((state) => state.data);
  const stockData = usePortfolioStore((state) => state.stockData);
  const budget = usePortfolioStore((state) => state.budget);
  const principal = usePortfolioStore((state) => state.principal);
  const profit = usePortfolioStore((state) => state.profit);
  const profitRate = usePortfolioStore((state) => state.profitRate);
  const changeStatus = usePortfolioStore((state) => state.change);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const change = usePortfolioStore((state) => state.change);
  const setChange = usePortfolioStore((state) => state.setChange);

  const deletePortfolio = async (id: number) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/v1/portfolio/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        swal({
          title: "삭제 완료!",
          icon: "success",
        }).then(() => {
          nav("/portfolio");
          setChange(!change);
        });
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        nav("/portfolio");
      }
    }
  };

  // 포트폴리오 상세 조회
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/portfolio/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPortfolio(res.data.name, res.data, res.data.stocks);
          setFinancialData(
            res.data.budget,
            res.data.principal,
            res.data.profit,
            res.data.profitRate
          );
        } else if (res.status === 401) {
          alert("401");
        }
      })
      .catch((e) => {
        // alert(e);
      });
  }, [setPortfolio, setFinancialData, changeStatus]);

  if (!data) {
    return <div>포트폴리오를 찾을 수 없습니다.</div>;
  }

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <TitleDiv>
        <h2 style={{ marginBottom: "15px" }}>{pfName}</h2>
        <DeleteButton2 onClick={openDeleteModal} />
      </TitleDiv>
      <PfCard />
      <PieChart stockData={stockData} />
      <Swipe portfolioId={id} />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onConfirm={() => deletePortfolio(id)} // 삭제 함수 호출
        onRequestClose={() => setIsDeleteOpen(false)} // 모달 닫기
        showCancelButton={true}
      />
    </div>
  );
};

export default PortfolioDetail;
