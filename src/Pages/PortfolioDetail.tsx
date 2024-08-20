import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/data"; // 데이터 임포트
import Swipe from "../Component/Swipe/Swipe";
import PfCard from "../Component/Portfolio/PfCard";
import PieChart from "../Component/Chart/PieChart";

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>(); // id를 string 타입으로 명시적으로 선언

  // id가 undefined가 아닌 경우에만 parseInt를 호출
  const portfolioItem = id ? data.find((item) => item.id === parseInt(id)) : undefined;

  if (!portfolioItem) {
    return <div>포트폴리오를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{height: '100%', display: "flex", justifyContent: "center", justifySelf: "center", flexDirection: "column"}}>
      <h2>{portfolioItem.id}</h2>
          <Swipe />
          <PfCard />
          <div>
            <PieChart />
          </div>
      </div>
  );
};

export default PortfolioDetail;
