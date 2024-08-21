import styled from "styled-components";
import Calculator from "../../Component/Calculator/calculator";
import CalculResult from "../../Component/Calculator/calculResult";
import Chart from "../../Component/Chart/chart";
import { Colors } from "../../Styles/Colors";
import { useEffect, useState } from "react";
import { ViewSelectProps, StockDataProps } from "../../constants/interface";
import * as S from "./stockDetailStyle";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type ViewList = "일" | "주" | "월" | "1년";

// viewList를 정수랑 매핑
const viewListToInt: Record<ViewList, number> = {
  일: 1,
  주: 2,
  월: 3,
  "1년": 4,
};

// viewList값을 정수로 변환
const convertViewListToInt = (view: ViewList): number => {
  return viewListToInt[view];
};

const StockDetail: React.FC = () => {
  const location = useLocation();
  const stockCode = location.pathname.split("/")[2];
  const nav = useNavigate();
  const [selectedView, setSelectedView] = useState<ViewList>("일");

  const selectedViewInt = convertViewListToInt(selectedView);

  // 클릭한 기준 css 변경 && INT로 변환
  const handleClick = (view: ViewList) => {
    setSelectedView(view);
    const viewInt = convertViewListToInt(view);
    console.log(viewInt);
  };

  // 주식 상세 정보 불러오기 API 연결
  const [stockData, setStockData] = useState<StockDataProps | null>(null);
  useEffect(() => {
    if (stockCode)
      axios
        .get(`http://localhost:8080/v1/stocks/${stockCode}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(JSON.stringify(res.data));
            const result = res.data;
            setStockData(result);
          } else if (res.status === 400) {
            nav("/login");
          }
        })
        .catch((err) => console.log(err));
  }, []);

  // API 데이터로 바꿀 때, stockData 옆에 붙은 [0] 삭제 필요
  // 데이터 확인용 dummy
  // const stockData = [
  //   {
  //     code: "005930",
  //     name: "삼성전자",
  //     price: 80000,
  //     change: 3000,
  //     changeRate: 3.9,
  //   },
  // ];

  // 쿼리스트링으로 보낼 때, 시작/종료 날짜 보내야하는지 확인
  // 상태저장해서 Chart 컴포넌트 Props로 넘겨줘야하는지 확인
  useEffect(() => {
    console.log(selectedViewInt);
    axios
      .post(
        `http://localhost:8080/v1/stocks/${stockCode}/chart?period=${selectedViewInt}/`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [selectedView]);

  return (
    <S.Container>
      {stockData ? (
        <>
          <S.InfoContainer>
            <div>
              {/* <S.StockName>{stockData.name}</S.StockName> */}
              <S.CodeContainer>
                {/* <S.StockCode>{stockData.code}</S.StockCode> */}
                {/* 데이터 없음. 삭제 */}
                {/* <S.StockCode>첨단 기술</S.StockCode> */}
              </S.CodeContainer>
            </div>
            <S.PriceContainer>
              {/* <S.StockPrice>{stockData.price}원</S.StockPrice> */}
              <S.ChangeContainer>
                {/* <S.StockChange>{stockData.change}원</S.StockChange> */}
                {/* <S.StockChange>{stockData.changeRate}%</S.StockChange> */}
              </S.ChangeContainer>
            </S.PriceContainer>
          </S.InfoContainer>
          <S.ViewSelectContainer>
            {["일", "주", "월", "1년"].map((view) => (
              <S.ViewSelectBox
                key={view}
                isSelected={selectedView === view}
                onClick={() => handleClick(view as ViewList)}
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
