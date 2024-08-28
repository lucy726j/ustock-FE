import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swipe from "../Swipe/Swipe";
import PfCard from "./PfCard";
import PieChart from "../Chart/PieChart";
import axios from "axios";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import DeleteConfirmationModal from "../Modal/deleteProtfolio";
import swal from "sweetalert";

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
  const ret = usePortfolioStore((state) => state.ret);
  const ror = usePortfolioStore((state) => state.ror);
  const changeStatus = usePortfolioStore((state) => state.change);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const change = usePortfolioStore((state) => state.change);
  const setChange = usePortfolioStore((state) => state.setChange);

  // const changeCheck = usePortfolioStore((state) => state.setChange);
  const deletePortfolio = async (id: number) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/v1/portfolio/${id}`,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      setChange(!change);
      swal({
        title: "삭제 완료!",
        icon: "success",
      }).then(() => {
        nav("/portfolio");
      });
      setIsDeleteOpen(false);
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
            res.data.ret,
            res.data.ror
          );
        } else if (res.status === 401) {
          alert("401");
        }
      })
      .catch((e) => {
        nav("/error");
      });
  }, [setPortfolio, setFinancialData, changeStatus]);

  if (!data) {
    return <div>포트폴리오를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h2 style={{ marginLeft: "60px", marginBottom: "15px" }}>{pfName}</h2>
        <button
          className="embla_delete"
          onClick={() => setIsDeleteOpen(true)}
          style={{
            position: "absolute",
            zIndex: "10",
            top: "6px",
            left: "400px",
          }}
        >
          삭제
        </button>
        {isDeleteOpen && (
          <DeleteConfirmationModal
            isOpen={isDeleteOpen}
            onConfirm={() => deletePortfolio(id)} // 삭제 함수 호출
            onRequestClose={() => setIsDeleteOpen(false)} // 모달 닫기
            showCancelButton={true}
          />
        )}
      </div>
      <PfCard />
      <PieChart stockData={stockData} />
      <Swipe portfolioId={id} />
    </div>
  );
};

export default PortfolioDetail;
