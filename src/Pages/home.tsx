import React from "react";
import Chart from "../Component/Chart/chart";
import { Input } from "../Component/Input/input";
import NewsList from "../Component/News/NewsList";
import StockList from "../Component/List/StockList";
import styled from "styled-components";
import { ValueProps } from "../constants/interface";

const marketData = [
  {
    KOSPI: {
      price: 2777.68,
      change: 6.99,
      changeRate: +0.25,
    },
    KOSDAQ: {
      price: 2777.68,
      change: 6.99,
      changeRate: -0.25,
    },
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarketContainer = styled.div`
  width: 100%;
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
  font-size: 20px;
  margin-bottom: 5px;
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
  return (
    <Container>
      <MarketContainer>
        {marketData.map((el) => (
          <Kospi>
            <span>KOSPI</span>
            <Info isNegative={el.KOSPI.changeRate < 0}>
              <span>{el.KOSPI.price}</span>
              <span>{el.KOSPI.change}</span>
              <span>{el.KOSPI.changeRate}</span>
            </Info>
          </Kospi>
        ))}
        {marketData.map((el) => (
          <Kosdaq>
            <span>KOSDAQ</span>
            <Info isNegative={el.KOSDAQ.changeRate < 0}>
              <span>{el.KOSDAQ.price}</span>
              <span>{el.KOSDAQ.change}</span>
              <span>{el.KOSDAQ.changeRate}</span>
            </Info>
          </Kosdaq>
        ))}
      </MarketContainer>
      <ListContainer>
        <Title>오늘의 인기 종목</Title>
        <StockWrapper>
          <StockList />
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
