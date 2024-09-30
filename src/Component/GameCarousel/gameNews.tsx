import React from "react";
import styled from "styled-components";
import { GameNewsProps } from "../../constants/interface";
import { HiOutlineExternalLink } from "react-icons/hi";

const NewsItem = styled.a`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #d1d1d1;
  padding: 15px 15px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const NewsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  width: 100%;
`;

const NewsInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 17px;
`;
const Publisher = styled.p`
  font-size: 15px;
`;
const Date = styled.p`
  font-size: 15px;
`;

const GameNews: React.FC<GameNewsProps> = ({ title, url, publisher, date }) => {
  return (
    <>
      <NewsItem href={url} target="_blank" rel="noopener noreferrer nofollow">
        <NewsSection>
          <Title>{title}</Title>
          <NewsInfo>
            <Publisher>{publisher}</Publisher>
            <Date>{date}</Date>
          </NewsInfo>
        </NewsSection>
        <HiOutlineExternalLink />
      </NewsItem>
    </>
  );
};
export default GameNews;
