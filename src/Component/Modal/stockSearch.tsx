import React, { useEffect, useState } from "react";
import ModalOpen from "./modal";
import { Input } from "../Input/input";
import { ListProps } from "../../constants/interface";
import { formatPrice } from "../../util/util";
import {
  Ul,
  Li,
  Div,
  Name,
  Description,
  Price,
  Growth,
  SearchImg,
} from "./modalStyle";
import Search from "../../img/search.png";
import axios from "axios";

interface StockSearchProps {
  isOpen: boolean;
  onSelect: (selectedStock: ListProps) => void;
  onClose: () => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ListProps[]>([]);
  const [hoveredStock, setHoveredStock] = useState<string | null>(null); // 현재 호버 중인 종목을 추적하는 상태
  const [isValid, setIsValid] = useState(true);
  const [stockList, setStockList] = useState<ListProps[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const results = stockList.filter(
      (stock) => stock.name.includes(term) || stock.code.includes(term)
    );
    setSearchResults(results);
  };

  const handleSelect = (stock: ListProps) => {
    if (hoveredStock === stock.code) {
      onSelect(stock);
    } else {
      setHoveredStock(stock.code);
    }
  };

  useEffect(() => {
    axios
      .get(
        // `${process.env.REACT_APP_API_URL}/v1/stocks?order=capital`,
        `http://localhost:8080/v1/stocks?order=capital`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.stock);
        setStockList(res.data.stock);
        setSearchResults(res.data.stock);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ModalOpen
        title="종목 검색"
        isOpen={true}
        onRequestClose={onClose}
        showOneConfirmBtn={false}
        showCancelButton={false}
      >
        <div>
          <Input
            placeholder="검색어 입력"
            size="large"
            colorType="fillType"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            icon={<SearchImg src={Search} />}
            errorMessage="종목을 선택해주세요"
            isValid={isValid}
          />
          <Ul>
            {searchResults.length > 0 ? (
              searchResults.map((stock) => (
                <Li
                  key={stock.portfolioId}
                  onClick={() => handleSelect(stock)}
                  onMouseEnter={() => setHoveredStock(stock.code)} // 마우스가 들어올 때 상태 설정
                  onMouseLeave={() => setHoveredStock(null)} // 마우스가 나갈 때 상태 초기화
                  style={{
                    backgroundColor:
                      hoveredStock === stock.code ? "#E6E5FF" : "transparent", // 호버된 종목에 배경색 적용
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {stock.logo ? (
                      <img
                        src={stock.logo}
                        alt={`${stock.name} logo`}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "20px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "20px",
                          borderRadius: "10px",
                          textAlign: "center",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          color: "#fff",
                          background: "#615EFC",
                        }}
                      >
                        {stock.name.charAt(0)}
                      </div>
                    )}
                    <Div>
                      <Name>{stock.name}</Name>
                      <Description>{stock.code}</Description>
                    </Div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "100px",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <Price>{formatPrice(stock.price)}</Price>
                    </div>
                    <Growth
                      style={{
                        color: stock.changeRate < 0 ? "#ff5759" : "#615EFC",
                      }}
                    >
                      {stock.changeRate}%
                    </Growth>
                  </div>
                </Li>
              ))
            ) : (
              <li>검색 결과가 없습니다</li>
            )}
          </Ul>
        </div>
      </ModalOpen>
    </div>
  );
};

export default StockSearch;
