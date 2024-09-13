import React, { useState } from "react";
import Shop from "./Shop/shop";
import styled from "styled-components";
import StockItem from "../Component/Dropdown/gameDropdown";
import Button from "../Component/Button/button";
import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <Container>
      <Div>
        현재 내 자산 : <p style={{}}>{""}</p>
      </Div>
      <StockItem onSelectStock={setSelectedStock} />
      <Shop selectedStock={selectedStock} />
    </Container>
  );
};

export default ExchangeStoreMain;
