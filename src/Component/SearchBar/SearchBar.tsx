import searchImg from "../../img/search.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StockDataProps } from "../../constants/interface";
import { getGrowthColor, formatPrice } from "../../util/util";
import { SearchBarProps } from "../../constants/interface";
import * as S from "./SearchBarStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";

const SearchBar: React.FC<SearchBarProps> = () => {
  const [list, setList] = useState<StockDataProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const nav = useNavigate();

  const searching = () => {
    setIsOpen(!isOpen);
  };

  // debounce 함수 : 1000ms 디바운스를 걸고, 마지막 keyword로만 api 요청
  const handelDebounce = useCallback(
    debounce((input: string) => {
      if (input.trim() === "") {
        setList([]);
        return;
      }
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/v1/stocks/search?query=${input}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const result = res.data;
            setList(result);
          } else if (res.status === 401) {
            nav("/login");
          }
        })
        .catch((error) => {});
    }, 300),
    []
  );

  // input 태그에 입력되는 값으로 keyword 업데이트, debounce 함수에 keyword 전달
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value;
      const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
      if (regExp.test(input)) {
        input = input.replace(regExp, "");
      }
      setKeyword(input);
      handelDebounce(input);
    },
    [handelDebounce]
  );

  // # Debounce 적용 전 ver

  // input 태그에 입력되는 값으로 keyword 업데이트, debounce 함수에 keyword 전달
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let input = e.target.value;
  //   const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  //   if (regExp.test(input)) {
  //     input = input.replace(regExp, "");
  //   }
  //   setKeyword(input);
  // };

  // useEffect(() => {
  //   if (keyword.trim() === "") {
  //     setList([]);
  //     return;
  //   }
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL}/v1/stocks/search?query=${keyword}`,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.status === 200) {
  //         const result = res.data;
  //         setList(result);
  //       } else if (res.status === 401) {
  //         nav("/login");
  //       }
  //     })
  //     .catch((error) => {});
  // }, [keyword]);

  const handleSelectStock = (event: StockDataProps) => {
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
          value={keyword}
        />
      </S.SearchBarStyle>
      {isOpen && (
        <S.SearchResult>
          {list.length === 0 || keyword === ""
            ? "일치하는 검색결과가 없습니다"
            : list.map((el) => (
                <S.StockItemContainer
                  key={el.code}
                  onMouseDown={() => handleSelectStock(el)}
                >
                  {el.logo ? (
                    <S.Img src={el.logo} alt={`${el.name} logo`} />
                  ) : (
                    <S.NoImg>{el.name.charAt(0)}</S.NoImg>
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
