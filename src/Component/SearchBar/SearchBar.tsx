import styled from "styled-components";
import searchImg from "../../img/search.png";
import React, { ChangeEvent, useState } from "react";
import { data } from "../../data/data";
import { StockItemProps } from "../../constants/interface";
import StockItem from "../List/StockItem";
import { getGrowthColor, formatPrice } from "../../util/util";
import { SearchBarProps } from "../../constants/interface";
import * as S from "./SearchBarStyle";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC<SearchBarProps> = ({ onSelect }) => {
  const [list, setList] = useState<StockItemProps[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searching = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event: string) => {
    setKeyword(event);
    const searchResult = data.filter(
      (el) => el.name.includes(event) || el.code.includes(event)
    );
    setList(searchResult);
  };

  const nav = useNavigate();
  const handleSelectStock = (event: StockItemProps) => {
    console.log(event.id);
    nav(`/stocks/${event.id}`);
  };

  return (
    <>
      <S.SearchBarStyle>
        <S.SearchImg src={searchImg} alt="검색 돋보기 이미지" />
        <S.SearchInput
          placeholder="검색어를 입력해주세요"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={searching}
          onBlur={searching}
        />
      </S.SearchBarStyle>
      {isOpen && (
        <S.SearchResult>
          {list.length == 0 || keyword == ""
            ? "일치하는 검색결과가 없습니다"
            : list.map((el) => (
                <S.StockItemContainer
                  key={el.id}
                  onMouseDown={(e) => handleSelectStock(el)}
                >
                  <S.Img src={el.logo} />
                  <S.InfoSection>
                    <S.Name>{el.name}</S.Name>
                    <S.Code>{el.code}</S.Code>
                  </S.InfoSection>
                  <S.Price>{formatPrice(el.price)}원</S.Price>
                  <S.Growth style={{ color: getGrowthColor(el.growth) }}>
                    {el.growth}%
                  </S.Growth>
                </S.StockItemContainer>
              ))}
        </S.SearchResult>
      )}
    </>
  );
};

export default SearchBar;
