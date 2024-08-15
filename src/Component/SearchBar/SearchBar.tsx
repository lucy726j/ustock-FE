import styled from "styled-components";
import searchImg from "../../img/search.png";

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
  return (
    <div>
      <SearchBarStyle>
        <SearchImg src={searchImg} alt="검색 돋보기 이미지" />
        <SearchInput placeholder="검색어를 입력해주세요" />
      </SearchBarStyle>
    </div>
  );
};

export default SearchBar;
