import React, { useEffect, useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import CarouselItem from "./carouselItem";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import axios from "axios";

const Data = [
  {
    stockId: 1,
    fakeName: "A전자",
    realName: "삼성전자",
    chart: [
      { x: "2020", y: 121212 },
      { x: "2021", y: 151212 },
      { x: "2022", y: 181212 },
      { x: "2023", y: 121212 },
      { x: "2024", y: 221212 },
    ],
    news: [
      {
        title: "제목1",
        url: "acb",
        publisher: "럭키일보",
        date: "2020-01-01",
      },
      {
        title: "제목 2번이다",
        url: "dsf",
        publisher: "럭키일보",
        date: "2021-01-01",
      },
      {
        title: "CSS 너무 귀찮아요",
        url: "sdfa",
        publisher: "럭키일보",
        date: "2022-01-01",
      },
      {
        title: "세븐틴 마에스트로",
        url: "asdfd",
        publisher: "럭키일보",
        date: "2023-01-01",
      },
    ],
  },
  {
    stockId: 2,
    fakeName: "B엔터",
    realName: "빅히트엔터테인먼트",
    chart: [
      { x: "2020", y: 121212 },
      { x: "2021", y: 151212 },
      { x: "2022", y: 181212 },
      { x: "2023", y: 121212 },
      { x: "2024", y: 221212 },
    ],
    news: [
      {
        title: "제목1",
        url: "string",
        publisher: "string",
        date: "2020-01-01",
      },
      {
        title: "string",
        url: "string",
        publisher: "string",
        date: "2021-01-01",
      },
      {
        title: "string",
        url: "string",
        publisher: "string",
        date: "2022-01-01",
      },
      {
        title: "string",
        url: "string",
        publisher: "string",
        date: "2023-01-01",
      },
    ],
  },
  {
    stockId: 3,
    fakeName: "C IT",
    realName: "카카오",
    chart: [
      { x: "2020", y: 121212 },
      { x: "2021", y: 151212 },
      { x: "2022", y: 181212 },
      { x: "2023", y: 121212 },
      { x: "2024", y: 221212 },
    ],
    news: [
      {
        title: "제목1",
        url: "string",
        publisher: "string",
        date: "2020-01-01",
      },
      {
        title: "string",
        url: "string",
        publisher: "string",
        date: "2021-01-01",
      },
      {
        title: "string",
        url: "string",
        publisher: "string",
        date: "2022-01-01",
      },
      {
        title: "string",
        url: "string",
        publisher: "string",
        date: "2023-01-01",
      },
    ],
  },
];

const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;
const BtnStyle = styled.button`
  padding: 10px 20px;
  background-color: ${Colors.main};
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-family: "SCDream6";
`;

const ChartStyle = styled.div`
  overflow: hidden;
`;

const GameCarousel = () => {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/v1/game/result`, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status === 200) {
  //           setData(res.data);
  //         }
  //       });
  //   }, []);

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      items: Data.map((item, index) => ({
        id: `item-${index}`,
        renderItem: <CarouselItem data={item} />,
      })),
    });

  return (
    <>
      <ChartStyle>{carouselFragment}</ChartStyle>
      <BtnContainer>
        <BtnStyle onClick={slideToPrevItem}>이전</BtnStyle>
        <BtnStyle onClick={slideToNextItem}>다음</BtnStyle>
      </BtnContainer>
    </>
  );
};

export default GameCarousel;
