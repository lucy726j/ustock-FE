import searchImg from "../../img/search.png";
import React, { useEffect, useState } from "react";
import { StockDataProps } from "../../constants/interface";
import { getGrowthColor, formatPrice } from "../../util/util";
import { SearchBarProps } from "../../constants/interface";
import * as S from "./SearchBarStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar: React.FC<SearchBarProps> = () => {
  const [list, setList] = useState<StockDataProps[]>([]);
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
      .get(
        `${process.env.REACT_APP_API_URL}/v1/stocks/search?query=${keyword}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const result = res.data;
          setList(result);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [keyword]);

  const handleSelectStock = (event: StockDataProps) => {
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
                  key={el.code}
                  onMouseDown={() => handleSelectStock(el)}
                >
                  {el.logo ? (
                    <S.Img
                      src={el.logo}
                      alt={`${el.name} logo`}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "20px",
                        marginLeft: "1rem",
                        borderRadius: "10px",
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
                        marginLeft: "1rem",
                      }}
                    >
                      {el.name.charAt(0)}
                    </div>
                  )}
                  <S.InfoSection>
                    <S.Name>{el.name}</S.Name>
                    <S.Code>{el.code}</S.Code>
                  </S.InfoSection>
                  <S.Price>{formatPrice(el.price)}원</S.Price>
                  <S.Growth style={{ color: getGrowthColor(el.changeRate) }}>
                    {el.changeRate}%
                  </S.Growth>
                </S.StockItemContainer>
              ))}
        </S.SearchResult>
      )}
    </>
  );
};

export default SearchBar;
