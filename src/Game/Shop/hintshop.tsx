import { useState } from "react";
import { ShopProps } from "./shop";
import { usePurchaseStore } from "../../store/hintStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Ingredient, initialTabs as tabs } from "./ingredient";
import { useStock } from "../../store/stockContext";
import swal from "sweetalert";
import Button from "../../Component/Button/button";
import * as S from "./shopStyle";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const HintShop: React.FC<ShopProps> = ({
  selectedStock,
  budget,
  setBudget,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [hint, setHint] = useState<{ [level: string]: string | null }>({
    1: null,
    2: null,
    3: null,
  }); // 힌트 상태로 뉴스 표시 여부 관리
  const purchaseComplete = usePurchaseStore((state) => state.purchaseComplete); // 단계별 구매 상태
  const setPurchaseComplete = usePurchaseStore(
    (state) => state.setPurchaseComplete
  );

  const location = useLocation();
  const year = location.pathname.split("/")[3];
  const { stockData } = useStock();
  const navigate = useNavigate();

  const selectedStockData = stockData?.find(
    (stock) => stock.stockId === selectedStock
  );

  function handleGame() {
    navigate(`/game/play/${year}`);
  }

  const onSubmitHandler = async () => {
    if (!selectedStock) {
      swal({
        icon: "error",
        title: "종목을 선택해주세요!",
      });
      return;
    }

    if (budget < parseInt(selectedTab.price.replace(/[^\d]/g, ""), 10)) {
      swal({
        icon: "error",
        title: "잔액이 부족합니다.",
      });
      return;
    }

    // 해당 단계가 이미 전역 상태에서 구매되었는지 확인
    if (purchaseComplete[selectedStock]?.[selectedTab.level]) {
      swal({
        icon: "error",
        title: "이 단계의 정보는 이미 구매하였습니다.",
      });
      return;
    }

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
          title: "구매가 완료되었습니다.",
        });
        setHint(res.data.hint);
        setBudget(
          budget - parseInt(selectedTab.price.replace(/[^\d]/g, ""), 10)
        );
        setPurchaseComplete(selectedStock, selectedTab.level); // 해당 단계 구매 상태 없데이트
      }
    } catch (error) {
      console.error("server Error : ", error);
    }
  };

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
                  {/* 해당 단게의 힌트가 있으면 뉴스를 표시 */}
                  {hint[selectedTab.level] ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        padding: "0px",
                        gap: "3rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <h2 style={{ fontSize: "34px" }}>Skrr News</h2>
                        <hr
                          style={{
                            width: "90%",
                            borderTop: "2px solid #000000",
                          }}
                        />
                        <hr
                          style={{
                            width: "90%",
                            borderTop: "1px solid #000000",
                            marginBottom: "1rem",
                          }}
                        />
                        <div
                          style={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "15px",
                            marginBottom: "2rem",
                          }}
                        >
                          <p
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            {selectedStockData ? selectedStockData.name : ""}{" "}
                            {""}
                            {selectedTab.level}
                          </p>
                          <p style={{ color: "#999999", fontWeight: "600" }}>
                            {year}
                          </p>
                        </div>
                        <div
                          style={{ width: "90%", border: "2px solid #000000" }}
                        >
                          <p
                            style={{
                              fontSize: "14px",
                              textAlign: "center",
                              padding: "1rem",
                            }}
                          >
                            {hint[selectedTab.level]}
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
                  ) : (
                    // 구매 가능한 상태 표시
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
                          onClick={onSubmitHandler}
                        >
                          구매
                        </Button>
                      </div>
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

export default HintShop;
