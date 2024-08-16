import styled from "styled-components";
import Dropdown from "../Component/Dropdown/Dropdown";
import StockList from "../Component/List/StockList";
import SearchBar from "../Component/SearchBar/SearchBar";
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
  return (
    <Container>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <FilterContainer>
        <div>종목 리스트</div>
        <Dropdown />
      </FilterContainer>
      <div>
        <StockList />
      </div>
    </Container>
  );
};

export default SearchStock;
