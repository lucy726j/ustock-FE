import styled from "styled-components";
import searchImg from "../../img/search.png";
import { useState } from "react";

const SearchBarStyle = styled.div`
  width: 450px;
  height: 40px;
  box-shadow: 0px 2px 5px -2px #ada9bb;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
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

const SearchBar = () => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (event: any) => {
    setKeyword(event.target.value.toLowerCase());
  };

  // api로 종목 리스트 받아서 list 저장하고
  // onChange할 때마다 filter한 리스트로 setList해서 목록 보여주기
  // const searched = list.filter((el) => {
  //   if (!el.name || !el.code) return false;
  //   return el.name.toLowerCase().includes(keyword) || el.code.includes(keyword);
  // });

  return (
    <div>
      <SearchBarStyle>
        <SearchImg src={searchImg} alt="검색 돋보기 이미지" />
        <SearchInput
          placeholder="검색어를 입력해주세요"
          onChange={handleSearch}
        />
      </SearchBarStyle>
    </div>
  );
};

export default SearchBar;
