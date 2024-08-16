import React, { useState } from "react";
import ModalOpen from "./modal";
import { Input } from "../Input/input";
import { StockItemProps } from "../../constants/interface";
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

interface StockSearchProps {
  isOpen: boolean;
  onSelect: (selectedStock: StockItemProps) => void;
  onClose: () => void;
  data: StockItemProps[];
}

const StockSearch: React.FC<StockSearchProps> = ({
  onSelect,
  onClose,
  data,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<StockItemProps[]>(data);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const results = data.filter(
      (stock) => stock.name.includes(term) || stock.code.includes(term)
    );
    setSearchResults(results);
  };

  const handleSelect = (stock: StockItemProps) => {
    onSelect(stock);
  };

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
          <SearchImg src={Search} />
          <Input
            placeholder="검색어 입력"
            size="large"
            colorType="fillType"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Ul>
            {searchResults.length > 0 ? (
              searchResults.map((stock) => (
                <Li key={stock.code} onClick={() => handleSelect(stock)}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={stock.logo}
                      alt={`${stock.name} logo`}
                      style={{
                        width: "25px",
                        height: "25px",
                        marginRight: "34px",
                      }}
                    />
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
                        color: stock.growth < 0 ? "#ff5759" : "#615EFC",
                      }}
                    >
                      {stock.growth}%
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
