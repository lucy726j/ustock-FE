import React, { useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import { NewsProps } from "../../constants/interface";
import "./NewsItemStyle.css";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NoNews from "./\bnoNews";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const NewsList: React.FC = () => {
  // 나만의 뉴스 데이터
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const nav = useNavigate();
  // const change = usePortfolioStore((state) => state.change);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/news/user`,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setNews(res.data);
        } else if (res.status === 204) {
          setNews([]);
        } else if (res.status === 401) {
          navigate("/noLogin");
        }
      })
      .catch((e) => {});
  }, [location]);

  return (
    <div>
      <ListWrapper>
        {news.length > 0 ? (
          news.map((news: NewsProps) => <NewsItem key={news.code} {...news} />)
        ) : (
          <NoNews />
        )}
      </ListWrapper>
    </div>
  );
};

export default NewsList;
