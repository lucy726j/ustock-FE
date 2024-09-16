import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "./shopStyle";
import { initialTabs as tabs } from "./ingredient";
import Button from "../../Component/Button/button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Ingredient } from "./ingredient";
import swal from "sweetalert";
import { useStock } from "../../store/stockContext";

interface ShopProps {
  selectedStock: number | null;
}

interface PurchaseHints {
  [key: string]: {
    [level: string]: boolean;
  };
}

const Shop: React.FC<ShopProps> = ({ selectedStock }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [hint, setHint] = useState<string | null>(null);
  const [purchaseComplete, setPurchaseComplete] = useState<PurchaseHints>({});
  const location = useLocation();
  const year = location.pathname.split("/")[3];
  const { stockData } = useStock();
  // const numberYear = Number(year);
  const navigate = useNavigate();

  const selectedStockData = stockData?.find(
    (stock) => stock.stockId === selectedStock
  );

  function handleGame() {
    navigate(`/game/play/${year}`);
  }

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
            hintLevel: selectedTab.id,
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
        setPurchaseComplete((prev) => ({
          ...prev,
          [selectedStock]: {
            ...prev[selectedStock],
            [selectedTab.level]: true,
          },
        }));
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
              {selectedTab && (
                <>
                  {selectedStock === null ||
                  !purchaseComplete[selectedStock]?.[selectedTab.level] ? (
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
                        {year}년{" "}
                        {selectedStockData ? selectedStockData.name : ""}의
                        정보는 {selectedTab.price}원 입니다.
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
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h2 style={{ fontSize: "34px" }}>Skrr News</h2>
                        <hr
                          style={{
                            width: "100%",
                            borderTop: "2px solid #000000",
                          }}
                        />
                        <hr
                          style={{
                            width: "100%",
                            borderTop: "1px solid #000000",
                            marginBottom: "1rem",
                          }}
                        />
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "15px",
                            marginBottom: "2rem",
                          }}
                        >
                          <p style={{ color: "red", fontWeight: "600" }}>
                            {selectedStockData ? selectedStockData.name : ""}{" "}
                            {""}
                            {selectedTab.level}
                          </p>
                          <p style={{ color: "#999999", fontWeight: "600" }}>
                            {year}
                          </p>
                        </div>
                        <div
                          style={{ width: "100%", border: "2px solid #000000" }}
                        >
                          <p
                            style={{
                              fontSize: "14px",
                              textAlign: "center",
                              padding: "1rem",
                            }}
                          >
                            {hint}
                          </p>
                        </div>
                      </div>
                      <Button
                        $state="normal"
                        $size="large"
                        $colorType="main"
                        onClick={handleGame}
                      >
                        돌아가기
                      </Button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </S.Main>
      </S.Window>
    </>
  );
};

export default Shop;
