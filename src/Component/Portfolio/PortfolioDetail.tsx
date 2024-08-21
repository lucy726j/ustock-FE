import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swipe from "../Swipe/Swipe";
import PfCard from "./PfCard";
import PieChart from "../Chart/PieChart";
import axios from "axios";
import { PortfolioProps, StockProps } from "../../constants/interface";

const PortfolioDetail = () => {
  const location = useLocation();
  const id = Number(location.pathname.split("/")[2]);
  const [pfName, setPfName] = useState("");
  const [data, setData] = useState<PortfolioProps | null>(null);
  const [stockData, setStockData] = useState<StockProps[]>([]);

  // 포트폴리오 상세 조회
  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/portfolio/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPfName(res.data.name);
          setData(res.data);
          setStockData(res.data.stocks);
        } else if (res.status === 401) {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

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
      <PfCard data={data} />
      <PieChart stockData={stockData} />
      <Swipe stockData={stockData} portfolioId={id} />
    </div>
  );
};

export default PortfolioDetail;
