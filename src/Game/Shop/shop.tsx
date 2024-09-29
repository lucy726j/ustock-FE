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
import { useHintStore, usePurchaseStore } from "../../store/hintStore";
import ModalOpen from "../../Component/Modal/modal";

export interface ShopProps {
  selectedStock: number | null;
  budget: number;
  setBudget: (newBudget: number) => void;
}

interface PurchaseHints {
  [key: string]: {
    [level: string]: boolean;
  };
}

const Shop: React.FC<ShopProps> = ({ selectedStock, budget, setBudget }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [hint, setHint] = useState<string | null>(null);
  const [purchaseComplete, setPurchaseComplete] = useState<PurchaseHints>({});

  const purchaseHints = useHintStore((state) => state.purchaseHints); // 단계별 구매 상태
  const setPurchaseHints = useHintStore((state) => state.setPurchaseHints);

  const location = useLocation();
  const year = location.pathname.split("/")[3];
  const { stockData } = useStock();
  // const numberYear = Number(year);
  const navigate = useNavigate();

  const selectedStockData = stockData?.find(
    (stock) => stock.stockId === selectedStock
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    navigate(`/game/play/${year}`);
  };

  const handleGame = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (
      selectedStock !== null &&
      purchaseHints[selectedStock] &&
      purchaseHints[selectedStock][selectedTab.level]
    ) {
      // 힌트 상태를 설정
      // 이미 구매한 힌트 정보를 보여줌 (로컬 저장소 또는 Zustand에서 불러온 힌트 데이터 사용)
      const savedHint =
        purchaseHints[selectedStock][selectedTab.level]?.hintData;

      if (savedHint) {
        setHint(savedHint); // 힌트 데이터를 설정
      } else {
        setHint("힌트 데이터를 찾을 수 없습니다."); // 힌트 데이터가 없을 경우 처리
      }
    }
  }, [purchaseHints, selectedStock, selectedTab.level]);

  //구매 요청 처리
  const onSubmitHandler = async (data: Ingredient) => {
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
        const hintData = res.data.hint;
        setHint(hintData);
        setBudget(
          budget - parseInt(selectedTab.price.replace(/[^\d]/g, ""), 10)
        );
        useHintStore
          .getState()
          .setPurchaseHints(selectedStock, selectedTab.level, hintData);
        setPurchaseComplete((prev) => ({
          ...prev,
          [selectedStock]: {
            ...prev[selectedStock],
            [selectedTab.level]: true,
          },
        }));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          swal({
            icon: "error",
            title: "해당 단계의 힌트는 이미 구매하였습니다.",
          });
        } else {
          console.error("server Error : ", error);
        }
      } else {
        // 예상치 못한 에러 처리
        console.error("Unknown Error:", error);
        swal({
          icon: "error",
          title: "알 수 없는 에러가 발생했습니다.",
        });
      }
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
          <ModalOpen
            title="정보거래소"
            isOpen={isOpen}
            showCancelButton={true}
            showOneConfirmBtn={false}
            onConfirm={handleConfirm}
            onRequestClose={handleCancel}
            confirmLabel="돌아가기"
            cancelLabel="취소"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>
                정보거래소를 나가면 구매한 해당 뉴스를
                <br /> 다시 볼 수 없습니다.
              </p>
              <p> 괜찮으십니까? </p>
            </div>
          </ModalOpen>
        </S.Main>
      </S.Window>
    </>
  );
};

export default Shop;
