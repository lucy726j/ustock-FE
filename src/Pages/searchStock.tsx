import styled from "styled-components";
import Dropdown from "../Component/Dropdown/Dropdown";
import StockList from "../Component/List/StockList";
import SearchBar from "../Component/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();

  const category = ["capital", "trade", "change"];
  const [selectedStockId, setSelectedStockId] = useState<number | null>(null);
  const [list, setList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(category[0]);

  // 리스트에서 종목 클릭시
  const handleSelectStock = (stockId: number) => {
    setSelectedStockId(stockId);
    console.log("Selected stock code:", stockId);
  };

  // 카테고리 set
  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // 정렬된 종목 리스트 API
  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/stocks?order=${selectedCategory}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("종목리스트API" + JSON.stringify(res.data.stock));
          const stockData = res.data.stock;
          setList(stockData);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedCategory]);

  return (
    <Container>
      <SearchContainer>
        <SearchBar onSelect={handleSelectStock} />
      </SearchContainer>
      <FilterContainer>
        <div>종목 리스트</div>
        <Dropdown dropList={category} onSelect={handleSelectedCategory} />
      </FilterContainer>
      <div>
        <StockList data={list} />
      </div>
    </Container>
  );
};

export default SearchStock;
