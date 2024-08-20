import styled from "styled-components";
import Dropdown from "../Component/Dropdown/Dropdown";
import StockList from "../Component/List/StockList";
import SearchBar from "../Component/SearchBar/SearchBar";
import StockItem from "../Component/List/StockItem";
import { useState } from "react";
import { StockListProps } from "../constants/interface";

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
  const [selectedStockId, setSelectedStockId] = useState<number | null>(null);
  // 아무것도 아님
  const [nothing, setNothing] = useState([]);

  const handleSelectStock = (stockId: number) => {
    setSelectedStockId(stockId);
    console.log("Selected stock code:", stockId); // 선택된 종목 코드를 출력
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
        <StockList data={nothing} />
      </div>
    </Container>
  );
};

export default SearchStock;
