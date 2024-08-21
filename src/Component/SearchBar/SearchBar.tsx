import searchImg from "../../img/search.png";
import React, { useEffect, useState } from "react";
// import { data } from "../../data/data";
import { StockItemProps } from "../../constants/interface";
import { getGrowthColor, formatPrice } from "../../util/util";
import { SearchBarProps } from "../../constants/interface";
import * as S from "./SearchBarStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar: React.FC<SearchBarProps> = () => {
  const [list, setList] = useState<StockItemProps[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  const searching = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setKeyword(input);
  };

  useEffect(() => {
    if (keyword.trim() === "") {
      setList([]); // Clear the list if the keyword is empty
    }
    axios
      .get(`http://localhost:8080/v1/stocks/search?query=${keyword}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.stocks);
          const result = res.data.stocks;
          setList(result);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [keyword]);

  // const handleSearch = (event: string) => {
  //   setKeyword(event);
  //   const searchResult = data.filter(
  //     (el) => el.name.includes(event) || el.code.includes(event)
  //   );
  //   setList(searchResult);
  // };

  const handleSelectStock = (event: StockItemProps) => {
    console.log(event.code);
    nav(`/stocks/${event.code}`);
  };

  return (
    <>
      <S.SearchBarStyle>
        <S.SearchImg src={searchImg} alt="검색 돋보기 이미지" />
        <S.SearchInput
          placeholder="검색어를 입력해주세요"
          onChange={handleSearch}
          onFocus={searching}
          onBlur={searching}
        />
      </S.SearchBarStyle>
      {isOpen && (
        <S.SearchResult>
          {list.length == 0 || keyword == ""
            ? "일치하는 검색결과가 없습니다"
            : list.map((el) => (
                <S.StockItemContainer
                  key={el.id}
                  onMouseDown={() => handleSelectStock(el)}
                >
                  <S.Img src={el.logo} />
                  <S.InfoSection>
                    <S.Name>{el.name}</S.Name>
                    <S.Code>{el.code}</S.Code>
                  </S.InfoSection>
                  <S.Price>{formatPrice(el.price)}원</S.Price>
                  <S.Growth style={{ color: getGrowthColor(el.growth) }}>
                    {el.growth}%
                  </S.Growth>
                </S.StockItemContainer>
              ))}
        </S.SearchResult>
      )}
    </>
  );
};

export default SearchBar;
