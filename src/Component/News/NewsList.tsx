import React, { useState } from "react";
import styled from "styled-components";
import { newsData } from "../../data/data";
import NewsItem from "./NewsItem";
import { NewsProps } from "../../constants/interface";
import "./NewsItemStyle.css";
import { useEffect } from "react";
import axios from "axios";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const NewsList: React.FC = () => {
  // 나만의 뉴스 데이터
  const [News, setNews] = useState([]);
  const NewsData = useEffect(() => {
    axios
      .post(`https://api.ustock.site/v1/news/my`)
      .then((res) => {
        console.log(res);
        setNews(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <ListWrapper>
        {newsData.map((news: NewsProps) => (
          <NewsItem key={news.id} {...news} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default NewsList;
