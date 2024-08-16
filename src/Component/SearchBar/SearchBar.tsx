import styled from "styled-components";
import searchImg from "../../img/search.png";
import { useState } from "react";
import { data } from "../../data/data";
import { StockItemProps } from "../../constants/interface";
import StockItem from "../List/StockItem";

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

const LiStyle = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  width: 20px;
  height: 20px;
`;

const SearchBar = () => {
  const [list, setList] = useState<StockItemProps[]>(data);
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
          {list.length == 0
            ? "일치하는 검색결과가 없습니다"
            : list.map((el) => (
                <LiStyle key={el.id}>
                  <StockInfo>
                    <Img src={el.logo} />
                    <StockName>
                      <span>{el.name}</span>
                      <span>{el.code}</span>
                    </StockName>
                  </StockInfo>
                  <div>
                    <div>{el.price}</div>
                    <span>{el.growth}</span>
                  </div>
                </LiStyle>
              ))}
        </SearchResult>
      )}
    </>
  );
};

export default SearchBar;
