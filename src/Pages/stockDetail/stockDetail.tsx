import styled from "styled-components";
import Calculator from "../../Component/Calculator/calculator";
import CalculResult from "../../Component/Calculator/calculResult";
import Chart from "../../Component/Chart/chart";
import { Colors } from "../../Styles/Colors";
import { useEffect, useState } from "react";
import { ViewSelectProps, StockDataProps } from "../../constants/interface";
import * as S from "./stockDetailStyle";
import axios from "axios";
import { useParams } from "react-router-dom";

type ViewList = "일" | "주" | "월" | "1년";

const StockDetail: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ViewList>("일");

  const { stockId } = useParams();

  // 주식 상세 정보 불러오기
  // const [stockData, setStockData] = useState<StockDataProps | null>(null);
  // useEffect(() => {
  //   if (stockId)
  //     axios
  //       .post(`https://api.ustock.site/v1/stocks/${stockId}`)
  //       .then((res) => {
  //         console.log(res);
  //         setStockData(res.data);
  //       })
  //       .catch((err) => console.log(err));
  // }, [stockId]);

  // API 데이터로 바꿀 때, stockData 옆에 붙은 [0] 삭제 필요
  const stockData = [
    {
      code: "005930",
      name: "삼성전자",
      price: 80000,
      change: 3000,
      changeRate: 3.9,
    },
  ];

  return (
    <S.Container>
      {stockData ? (
        <>
          <S.InfoContainer>
            <div>
              <S.StockName>{stockData[0].name}</S.StockName>
              <S.CodeContainer>
                <S.StockCode>{stockData[0].code}</S.StockCode>
                {/* 데이터 없음. 삭제 */}
                {/* <S.StockCode>첨단 기술</S.StockCode> */}
              </S.CodeContainer>
            </div>
            <S.PriceContainer>
              <S.StockPrice>{stockData[0].price}원</S.StockPrice>
              <S.ChangeContainer>
                <S.StockChange>{stockData[0].change}원</S.StockChange>
                <S.StockChange>{stockData[0].changeRate}%</S.StockChange>
              </S.ChangeContainer>
            </S.PriceContainer>
          </S.InfoContainer>
          <S.ViewSelectContainer>
            {["일", "주", "월", "1년"].map((view) => (
              <S.ViewSelectBox
                key={view}
                isSelected={selectedView === view}
                onClick={() => setSelectedView(view as ViewList)}
              >
                {view}
              </S.ViewSelectBox>
            ))}
          </S.ViewSelectContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Chart />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Calculator />
            <CalculResult />
          </div>
        </>
      ) : (
        <p>Loading...</p> //
      )}
    </S.Container>
  );
};

export default StockDetail;
