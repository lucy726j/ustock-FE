import React, { useState } from "react";
import Shop from "./shop";
import styled from "styled-components";
import StockItem from "../../Component/Dropdown/gameDropdown";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 500px;
  padding: 50px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    padding-bottom: 60px;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const ExchangeStoreMain = () => {
  const [selectedStock, setSelectedStock] = useState<number | null>(null);
  const location = useLocation();

  const budget = location.state?.budget || 0;

  return (
    <Container>
      <Div>
        현재 내 자산 : <p style={{}}>{budget}</p>
      </Div>
      <StockItem onSelectStock={setSelectedStock} />
      <Shop selectedStock={selectedStock} />
    </Container>
  );
};

export default ExchangeStoreMain;
