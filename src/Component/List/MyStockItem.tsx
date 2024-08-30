import React, { useState } from "react";
import { StockProps, PlusProps } from "../../constants/interface";
import "./StockItemStyle.css";
import { formatROR, formatPrice } from "../../util/util";
import AddOrEditModal from "../Modal/addStock";
import StockPlusModal from "../Modal/plusStock";
import DeleteConfirmationModal from "../Modal/deletePortfolio";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { usePortfolioStore } from "../../store/usePortfolioStore";

const MyStockItem: React.FC<StockProps> = ({
  code,
  name,
  quantity,
  average,
  ror,
  portfolioId,
  logo,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockProps | null>(null);

  const [modalAction, setModalAction] = useState<
    "edit" | "delete" | "plus" | null
  >(null);
  const navigate = useNavigate();

  const addStockToStore = usePortfolioStore((state) => state.addStock);
  const updateStockInStore = usePortfolioStore((state) => state.updateStock);
  const deleteStockFromStore = usePortfolioStore((state) => state.deleteStock);
  const calculateROR = usePortfolioStore((state) => state.calculateROR);
  const setChange = usePortfolioStore((state) => state.setChange);
  const change = usePortfolioStore((state) => state.change);

  const userStocks: PlusProps[] = [
    {
      code,
      name,
      quantity,
      average,
      portfolioId,
      logo: logo || "default_logo",
    },
  ];

  const handleConfirm = (newQuantity: number, newPrice: number) => {
    if (modalAction === "plus") {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/v1/portfolio/${portfolioId}/holding/${code}`,
          { quantity: newQuantity, price: newPrice },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            const updatedStock: StockProps = {
              code,
              name,
              quantity: newQuantity,
              average: newPrice,
              ror,
              portfolioId,
              logo,
            };
            addStockToStore(updatedStock);
            calculateROR();
            setChange(!change);
            swal({
              title: "추가 등록완료!",
              icon: "success",
            });
            setIsPlusOpen(false);
            setSelectedStock(null);
            setModalAction(null);
          }
        })
        .catch((error) => {
          swal({
            title: "등록에 실패하셨습니다.",
            text: "다시 시도해주세요!",
            icon: "error",
          });
          setSelectedStock(null);
          setModalAction(null);
        });
    } else if (modalAction === "edit") {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/v1/portfolio/${portfolioId}/holding/${code}`,
          { quantity: newQuantity, price: newPrice },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            const oldStockValue = quantity * average;
            const newStockValue = newQuantity * newPrice;
            const valueDifference = newStockValue - oldStockValue;

            const updatedStock: StockProps = {
              code,
              name,
              quantity: newQuantity,
              average: newPrice,
              ror,
              portfolioId,
              logo,
            };
            updateStockInStore(updatedStock);
            calculateROR();
            setChange(!change);
            swal({
              title: "수정 완료!",
              icon: "success",
            });
            setIsFormOpen(false);
          } else if (res.status === 401) {
            swal({
              title: "수정 실패하셨습니다.",
              text: "다시 시도해주세요!",
              icon: "error",
            }).then(() => {
              navigate("/login");
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            swal({
              title: "Unauthorized",
              text: "로그인을 다시 시도해주세요.",
              icon: "warning",
            }).then(() => {
              navigate("/login");
            });
          } else {
            swal({
              title: "Edit failed",
              text: "다시 시도해주세요",
              icon: "error",
            });
            setSelectedStock(null);
            setModalAction(null);
          }
        });
    }
  };

  const deleteHandle = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/v1/portfolio/${portfolioId}/holding/${code}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const deletedStockValue = quantity * average;

          deleteStockFromStore(code, deletedStockValue);

          calculateROR();
          setChange(!change);

          swal({
            title: "삭제 완료!",
            icon: "success",
          });
          setIsDeleteOpen(false);
          setSelectedStock(null);
          setModalAction(null);
        }
      })
      .catch((error) => {
        swal({
          title: "삭제에 실패하셨습니다.",
          text: "다시 시도해주세요!",
          icon: "error",
        });
        setSelectedStock(null);
        setModalAction(null);
      });
  };

  const openModal = (action: "edit" | "delete" | "plus") => {
    setModalAction(action);
    setSelectedStock({
      portfolioId,
      code,
      name,
      quantity,
      average,
      ror,
      logo: selectedStock?.logo || logo,
    });
    if (action === "delete") {
      setIsDeleteOpen(true);
    } else if (action === "plus") {
      setIsPlusOpen(true);
    } else {
      setIsFormOpen(true);
    }
  };

  return (
    <div className="MyStockItem">
      <div className="button-section">
        <button onClick={() => openModal("plus")}>추가매수</button>
        <button onClick={() => openModal("edit")}>수정</button>
        <button onClick={() => openModal("delete")}>삭제</button>
      </div>
      <div className="MyStockItemWrapper">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
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
            {name.charAt(0)}
          </div>
        )}
        <div className="info-section">
          <h2>{name}</h2>
          <p>{code}</p>
        </div>
        <div className="growth-section" style={{ color: formatROR(ror).color }}>
          {`${formatROR(ror).value} %`}
        </div>
        <div className="price-section">
          <p>수량 {formatPrice(quantity)}</p>
          <div>{formatPrice(average)}원</div>
          <p>
            {formatPrice(
              quantity * average * (1 + ror / 100) - quantity * average
            )}
            원
          </p>
        </div>
      </div>
      {isFormOpen && selectedStock && (
        <AddOrEditModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onConfirm={handleConfirm}
          action={modalAction === "edit" ? "edit" : undefined}
          selectedStock={selectedStock}
        />
      )}

      {isPlusOpen && (
        <StockPlusModal
          isOpen={isPlusOpen}
          onRequestClose={() => setIsPlusOpen(false)}
          onConfirm={handleConfirm}
          userStocks={userStocks}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onConfirm={deleteHandle}
          onRequestClose={() => setIsDeleteOpen(false)}
          showCancelButton={true}
        />
      )}
    </div>
  );
};

export default MyStockItem;
