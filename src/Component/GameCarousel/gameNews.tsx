import React from "react";
import { GameNewsProps } from "../../constants/interface";
import { HiOutlineExternalLink } from "react-icons/hi";
import * as S from "./gameNewsStyle";

const GameNews: React.FC<GameNewsProps> = ({ title, url, publisher, date }) => {
  return (
    <>
      <S.NewsItem href={url} target="_blank" rel="noopener noreferrer nofollow">
        <S.NewsSection>
          <S.Title>{title}</S.Title>
          <S.NewsInfo>
            <S.Publisher>{publisher}</S.Publisher>
            <S.Date>{date}</S.Date>
          </S.NewsInfo>
        </S.NewsSection>
        <HiOutlineExternalLink />
      </S.NewsItem>
    </>
  );
};
export default GameNews;
