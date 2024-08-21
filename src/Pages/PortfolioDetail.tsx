import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/data";
import Swipe from "../Component/Swipe/Swipe";
import PfCard from "../Component/Portfolio/PfCard";
import PieChart from "../Component/Chart/PieChart";

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();

  const portfolioItem = id ? data.find((item) => item.id === parseInt(id)) : undefined;

  if (!portfolioItem) {
    return <div>포트폴리오를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{height: '100%', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <h2 style={{marginLeft: "-200px", marginBottom: "30px"}}>{portfolioItem.id}의 포트폴리오</h2>
        <PfCard />
        <PieChart />
        <Swipe />
    </div>
  );
};

export default PortfolioDetail;
