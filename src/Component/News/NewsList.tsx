import React, { useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import { NewsProps } from "../../constants/interface";
import "./NewsItemStyle.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/news/user`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setNews(res.data);
        } else if (res.status === 401) {
          navigate("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <ListWrapper>
        {news.map((news: NewsProps) => (
          <NewsItem key={news.id} {...news} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default NewsList;
