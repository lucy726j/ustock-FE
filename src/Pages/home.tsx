import React, { useEffect, useState } from "react";
import NewsList from "../Component/News/NewsList";
import styled from "styled-components";
import { MarketDataProps, ValueProps } from "../constants/interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import StockDataList from "../Component/List/Data/stockDataList";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
`;

const MarketContainer = styled.div`
  width: 95%;
  height: 80px;
  box-shadow: 0px 4px 7px -2px #ada9bb;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  margin: 20px 0px 25px;
`;

const Kospi = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Kosdaq = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Info = styled.div<ValueProps>`
  color: ${(props) => (props.isNegative ? "#615EFC" : "#FF5759")};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const StockWrapper = styled.div`
  width: 100%;
  height: 325px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-bottom: 23px;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home: React.FC = () => {
  const nav = useNavigate();
  const [market, setMarket] = useState<MarketDataProps | null>(null);
  const [list, setList] = useState([]);

  // 오늘의 증시 데이터
  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/stocks/market`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("증시데이터API", res.data);
          const marketData = res.data;
          setMarket(marketData);
          // console.log(market);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 인기 종목 리스트 데이터
  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/stocks?order=top`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("인기종목리스트API" + JSON.stringify(res.data.stock));
          const stockData = res.data.stock;
          setList(stockData);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container>
      <MarketContainer>
        <Kospi>
          <span>KOSPI</span>
          {market ? (
            <Info isNegative={market.kospi.changeRate < 0}>
              <span>{market.kospi.price}</span>
              <span>
                {" "}
                {market.kospi.change < 0 ? (
                  <GoTriangleDown />
                ) : (
                  <GoTriangleUp />
                )}
                {market.kospi.change}
              </span>
              <span>{market.kospi.changeRate}</span>
            </Info>
          ) : (
            <div>로딩중</div>
          )}
        </Kospi>
        <Kosdaq>
          <span>KOSDAQ</span>
          {market ? (
            <Info isNegative={market.kosdaq.changeRate < 0}>
              <span>{market.kosdaq.price}</span>
              <span>
                {market.kosdaq.change < 0 ? (
                  <GoTriangleDown />
                ) : (
                  <GoTriangleUp />
                )}
                {market.kosdaq.change}
              </span>
              <span>{market.kosdaq.changeRate}</span>
            </Info>
          ) : (
            <div>로딩중</div>
          )}
        </Kosdaq>
      </MarketContainer>
      <ListContainer>
        <Title>오늘의 인기 종목</Title>
        <StockWrapper>
          {list ? <StockDataList data={list} /> : <div>로딩중</div>}
        </StockWrapper>
      </ListContainer>
      <NewsContainer>
        <Title>나만의 뉴스</Title>
        <NewsList />
      </NewsContainer>
    </Container>
  );
};

export default Home;
