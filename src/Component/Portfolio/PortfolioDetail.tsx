import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swipe from "../Swipe/Swipe";
import PfCard from "./PfCard";
import PieChart from "../Chart/PieChart";
import axios from "axios";
import { usePortfolioStore } from "../../store/usePortfolioStore";

const PortfolioDetail = () => {
  const location = useLocation();
  const id = Number(location.pathname.split("/")[2]);

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
  // const changeCheck = usePortfolioStore((state) => state.setChange);

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
          // console.log("개별 포트폴리오 조회", res);
          setPortfolio(res.data.name, res.data, res.data.stocks);
          setFinancialData(
            res.data.budget,
            res.data.principal,
            res.data.ret,
            res.data.ror
          );
          //alert("성공");
          // console.log(res.data.name, res.data, res.data.stocks);
          // console.log("Portfolio and financial data updated:", res.data);
        } else if (res.status === 401) {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
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
      <h2 style={{ marginLeft: "-200px", marginBottom: "30px" }}>{pfName}</h2>
      <PfCard />
      <PieChart stockData={stockData} />
      <Swipe portfolioId={id} />
    </div>
  );
};

export default PortfolioDetail;
