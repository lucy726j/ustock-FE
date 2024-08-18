import styled from "styled-components";
import searchImg from "../../img/search.png";
import React, { ChangeEvent, useState } from "react";
import { data } from "../../data/data";
import { StockItemProps } from "../../constants/interface";
import StockItem from "../List/StockItem";
import { getGrowthColor, formatPrice } from "../../util/util";
import { SearchBarProps } from "../../constants/interface";

const SearchBarStyle = styled.div`
  width: 450px;
  height: 40px;
  box-shadow: 0px 2px 5px -2px #ada9bb;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  margin-bottom: 1px;
  position: relative;
`;

const SearchImg = styled.img`
  width: 15px;
  margin-left: 20px;
`;

const SearchInput = styled.input`
  width: 350px;
  text-align: center;
  border: none;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 450px;
  box-shadow: 0px 2px 5px -2px #ada9bb;
  border: none;
  padding: 20px;
  font-size: 12px;
  position: absolute;
  top: 115px;
  z-index: 2;
`;

const StockItemContainer = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: #eaeaea;
    transform: scale(0.98);
  }
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const StockName = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 20px;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 10px;
  font-weight: 700;
`;

const Code = styled.div`
  font-size: 8px;
  font-weight: 400;
  color: #6c757d;
`;

const Price = styled.div`
  font-size: 10px;
  font-weight: 400;
  flex: 1;
  text-align: right;
  margin-right: 30px;
  width: 20%;
`;

const Growth = styled.div`
  font-size: 8px;
  font-weight: 400;
  margin-right: 30px;
  width: 10%;
  text-align: right;
`;

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

  const handleSelectStock = (event: StockItemProps) => {
    onSelect(event.code);
    console.log(event.code);
  };

  return (
    <>
      <SearchBarStyle>
        <SearchImg src={searchImg} alt="검색 돋보기 이미지" />
        <SearchInput
          placeholder="검색어를 입력해주세요"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={searching}
          onBlur={searching}
        />
      </SearchBarStyle>
      {isOpen && (
        <SearchResult>
          {list.length == 0 || keyword == ""
            ? "일치하는 검색결과가 없습니다"
            : list.map((el) => (
                <StockItemContainer
                  key={el.code}
                  onClick={() => handleSelectStock(el)}
                >
                  <Img src={el.logo} />
                  <InfoSection>
                    <Name>{el.name}</Name>
                    <Code>{el.code}</Code>
                  </InfoSection>
                  <Price>{formatPrice(el.price)}원</Price>
                  <Growth style={{ color: getGrowthColor(el.growth) }}>
                    {el.growth}%
                  </Growth>
                </StockItemContainer>
              ))}
        </SearchResult>
      )}
    </>
  );
};

export default SearchBar;
