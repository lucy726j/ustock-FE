import React, { useEffect, useState } from "react";
import NewsList from "../Component/News/NewsList";
import { MarketDataProps } from "../constants/interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "./homeStyle";
import StockDataList from "../Component/List/Data/stockDataList";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Colors } from "../Styles/Colors";

const Home: React.FC = () => {
  const nav = useNavigate();
  const [market, setMarket] = useState<MarketDataProps | null>(null);
  const [list, setList] = useState([]);

  // 오늘의 증시 데이터
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/stocks/market`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const marketData = res.data;
          setMarket(marketData);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        nav("/error");
      });
  }, []);

  // 인기 종목 리스트 데이터
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/stocks?order=top`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const stockData = res.data;
          setList(stockData);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        nav("/error");
      });
  }, []);

  return (
    <S.Container>
      <S.Title>오늘의 증시</S.Title>
      <S.MarketContainer>
        <S.Kospi>
          <span>KOSPI</span>
          {market ? (
            <S.Info $isNegative={market.kospi.changeRate < 0}>
              <span>{market.kospi.price}</span>
              <span>
                {market.kospi.change < 0 ? (
                  <GoTriangleDown />
                ) : (
                  <GoTriangleUp />
                )}
                {Math.abs(market.kospi.change)}
              </span>
              <span>{market.kospi.changeRate}%</span>
            </S.Info>
          ) : (
            <div>로딩중</div>
          )}
        </S.Kospi>
        <S.Kosdaq>
          <span>KOSDAQ</span>
          {market ? (
            <S.Info $isNegative={market.kosdaq.changeRate < 0}>
              <span>{market.kosdaq.price}</span>
              <span>
                {market.kosdaq.change < 0 ? (
                  <GoTriangleDown />
                ) : (
                  <GoTriangleUp />
                )}
                {Math.abs(market.kosdaq.change)}
              </span>
              <span>{market.kosdaq.changeRate}%</span>
            </S.Info>
          ) : (
            <div>로딩중</div>
          )}
        </S.Kosdaq>
      </S.MarketContainer>
      <hr style={{ marginBottom: "1.5rem" }} />
      <S.Title>오늘의 인기 종목</S.Title>
      <S.SubTitle>🏆 오늘 가장 거래가 많은 종목을 확인해보세요 !</S.SubTitle>
      <S.ListContainer>
        <S.StockWrapper>
          {list ? <StockDataList data={list} /> : <div>로딩중</div>}
        </S.StockWrapper>
      </S.ListContainer>
      <hr style={{ marginBottom: "1.5rem" }} />
      <S.NewsContainer>
        <S.Title>나만의 뉴스</S.Title>
        <S.SubTitle>
          👀 내 포트폴리오에 등록된 종목들의 뉴스만 모아서 확인할 수 있어요 !
        </S.SubTitle>
        <NewsList />
      </S.NewsContainer>
    </S.Container>
  );
};

export default Home;
