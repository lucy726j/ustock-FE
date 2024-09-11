import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "./shopStyle";
import { initialTabs as tabs } from "./ingredient";
import Button from "../../Component/Button/button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Ingredient } from "./ingredient";
import swal from "sweetalert";

interface ShopProps {
  selectedStock: number | null;
}

const Shop: React.FC<ShopProps> = ({ selectedStock }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [hint, setHint] = useState<string | null>(null);
  const location = useLocation();
  const year = location.pathname.split("/")[3];
  // const numberYear = Number(year);
  const navigate = useNavigate();

  function handleGame() {
    navigate(`/game/play/${year}`);
  }

  // const getPriceByLevel = (level: string, numberYear: number): number => {
  //   const basePrices: { [key: string]: number } = {
  //     "ONE": 10000,
  //     "TWO": 50000,
  //     "THREE": 100000,
  //   };
  //   const basePrice = basePrices[level] || 0;
  //   const yearMultiplier = Math.pow(2, numberYear - 2014);
  //   return basePrice * yearMultiplier;
  // };

  //구매 요청 처리
  const onSubmitHandler = async (data: Ingredient) => {
    if (!selectedStock) {
      swal({
        icon: "error",
        title: "종목을 선택해주세요!",
      });
      return;
    }
    // console.log(selectedStock.id);
    console.log(selectedTab.id);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/game/hint`,
        {
          params: {
            stockId: selectedStock,
            level: selectedTab.id,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        swal({
          icon: "success",
          title: "구매가 되었습니다.",
        });
        setHint(res.data.hint);
        console.log("힌트는 ", res.data.hint);
      }
    } catch (error) {
      console.error("server Error : ", error);
    }
  };

  console.log(selectedStock);

  return (
    <>
      <S.Window>
        <S.Nav>
          <S.Ul>
            {tabs.map((item) => (
              <S.Li
                key={item.id}
                className={item === selectedTab ? "selected" : ""}
                onClick={() => setSelectedTab(item)}
              >
                {`${item.icon} ${item.label}`}
                {item === selectedTab ? (
                  <S.Underline layoutId="underline" />
                ) : null}
              </S.Li>
            ))}
          </S.Ul>
        </S.Nav>
        <S.Main>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "20px", fontWeight: "700" }}>
                    {selectedTab.icon} {selectedTab.level} 정보
                  </p>
                  <p style={{ fontSize: "16px", margin: 0 }}>
                    {year}년 {selectedStock}의 정보는 {selectedTab.price}원
                    입니다.
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      marginTop: "0.5rem",
                      textAlign: "left",
                      marginBottom: "1.5rem",
                    }}
                  >
                    구매하시겠습니까?
                  </p>
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      $state="normal"
                      $size="small"
                      $colorType="cancel"
                      onClick={handleGame}
                    >
                      돌아가기
                    </Button>
                    <div style={{ marginLeft: "1rem" }}></div>
                    <Button
                      $state="normal"
                      $size="small"
                      $colorType="main"
                      onClick={() => onSubmitHandler(selectedTab)}
                    >
                      구매
                    </Button>
                  </div>
                  {hint && <p style={{ fontSize: "12px" }}>힌트 : {hint}</p>}
                </div>
              ) : (
                "😋"
              )}
            </motion.div>
          </AnimatePresence>
        </S.Main>
      </S.Window>
    </>
  );
};

export default Shop;
