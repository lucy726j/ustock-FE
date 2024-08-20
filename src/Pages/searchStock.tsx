import styled from "styled-components";
import Dropdown from "../Component/Dropdown/Dropdown";
import StockList from "../Component/List/StockList";
import SearchBar from "../Component/SearchBar/SearchBar"
import StockItem from "../Component/List/StockItem";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 25px;
`;

const SearchStock = () => {
  const category = ["시가총액순", "거래량", "등락율"];
  const [selectedStockCode, setSelectedStockCode] = useState<string | null>(
    null
  );

  const handleSelectStock = (stockCode: string) => {
    setSelectedStockCode(stockCode);
    console.log("Selected stock code:", stockCode); // 선택된 종목 코드를 출력
  };

  return (
    <Container>
      <SearchContainer>
        <SearchBar onSelect={handleSelectStock} />
      </SearchContainer>
      <FilterContainer>
        <div>종목 리스트</div>
        <Dropdown dropList={category} />
      </FilterContainer>
      <div>
        <StockList />
      </div>
    </Container>
  );
};

export default SearchStock;
