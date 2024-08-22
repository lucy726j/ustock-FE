import React, { useEffect, useState } from "react";
import { StockProps, PlusProps } from "../../constants/interface";
import "./StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../util/util";
import AddOrEditModal from "../Modal/addStock";
import StockPlusModal from "../Modal/plusStock";
import DeleteConfirmationModal from "../Modal/deleteProtfolio";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

interface MyStockItemProps extends StockProps {
  portfolioId: number;
}

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
  const [userStocks, setUserStocks] = useState<PlusProps[]>([
    {
      code,
      name,
      quantity,
      average,
      portfolioId,
      logo: logo || "default_logo",
    },
  ]);

  console.log("ror", ror / 100);

  // 처음 렌더링 시 useEffect로 초기 값 설정 (이미 위에서 초기화한 경우 불필요할 수 있음)
  useEffect(() => {
    setUserStocks([
      {
        code,
        name,
        quantity,
        average,
        portfolioId,
        logo: logo || "default_logo",
      },
    ]);
    console.log("ttttt", userStocks);
  }, [code, name, quantity, average, ror, portfolioId]);
  const handleConfirm = (quantity: number, price: number) => {
    if (modalAction === "plus") {
      // console.log(quantity, price);
      axios
        .patch(
          `http://localhost:8080/v1/portfolio/${portfolioId}/holding/${code}`,
          { quantity, price },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            swal({
              title: "추가 등록완료!",
              icon: "success",
            });
            setIsPlusOpen(false);
            setSelectedStock(null);
            setModalAction(null);
            navigate(`/portfolio/${portfolioId}`);
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
          console.log(error);
        });
    } else if (modalAction === "edit") {
      axios
        .put(
          `http://localhost:8080/v1/portfolio/${portfolioId}/holding/${code}`,
          { quantity, price },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            swal({
              title: "수정 완료!",
              icon: "success",
            });
            setIsFormOpen(false);
            navigate(`/portfolio/${portfolioId}`);
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
            console.log(error);
          }
        });
    }
  };

  const deleteHandle = () => {
    axios
      .delete(
        `http://localhost:8080/v1/portfolio/${portfolioId}/holding/${code}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        swal({
          title: "삭제 완료!",
          icon: "success",
        });
        setIsDeleteOpen(false);
        setSelectedStock(null);
        setModalAction(null);
      })
      .catch((error) => {
        swal({
          title: "삭제에 실패하셨습니다.",
          text: "다시 시도해주세요!",
          icon: "error",
        });

        setSelectedStock(null);
        setModalAction(null);
        console.log(error);
      });
  };

  // 모달 액션(종목추가를 누르면 종목 검색 모달이 먼저 뜨게 구현)
  const openModal = (action: "edit" | "delete" | "plus") => {
    setModalAction(action);
    setSelectedStock({
      portfolioId,
      code,
      name,
      quantity,
      average,
      ror,
      logo: selectedStock?.logo || selectedStock?.name,
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
        <div className="growth-section" style={{ color: getGrowthColor(ror) }}>
          {ror.toFixed(2)}%
        </div>
        <div className="price-section">
          <p>수량 {quantity}</p>
          <div>{formatPrice(average)}원</div>
          {/* 수량 * 평단가 * ( 1 + 수익률 / 100) */}
          {/* 수량* 평단가 = 투자금액
          투자금액 * 수익률(1+) */}
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
