import React, { useState } from "react";
import { PlusProps, StockItemProps } from "../../constants/interface";
import "./StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../util/util";
import AddOrEditModal from "../Modal/addStock";
import StockPlusModal from "../Modal/plusStock";
import DeleteConfirmationModal from "../Modal/deleteProtfolio";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const MyStockItem: React.FC<StockItemProps> = ({
  id: pfId,
  name,
  logo,
  code,
  price,
  growth,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockItemProps | null>(
    null
  );
  const [modalAction, setModalAction] = useState<
    "edit" | "delete" | "plus" | null
  >(null);
  const navigate = useNavigate();
  const [userStocks, setUserStocks] = useState<PlusProps[]>([]); // 사용자가 구매한 종목들

  const handleConfirm = (quantity: number, price: number) => {
    if (modalAction === "plus") {
      console.log(quantity, price);
      axios
        .patch(
          `https://api.ustock.site/v1/portfolio/${pfId}/${code}`,
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
            navigate(`/protfolio/${pfId}`);
          }
        })
        .catch((error) => {
          swal({
            title: "등록에 실패하셨습니다.",
            text: "다시 시도해주세요!",
            icon: "error",
          });
          console.log(error);
        });
    } else if (modalAction === "edit") {
      axios
        .put(
          `https://api.ustock.site/v1/portfolio/${pfId}/${code}`,
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
            navigate(`/protfolio/${pfId}`);
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
            console.log(error);
          }
        });
    }
  };

  const deleteHandle = () => {
    axios
      .delete(`https://api.ustock.site/v1/portfolio/${pfId}/${code}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        swal({
          title: "삭제 완료!",
          icon: "success",
        });
        setIsDeleteOpen(false);
      })
      .catch((error) => {
        swal({
          title: "삭제에 실패하셨습니다.",
          text: "다시 시도해주세요!",
          icon: "error",
        });
        console.log(error);
      });
  };

  // 모달 액션(종목추가를 누르면 종목 검색 모달이 먼저 뜨게 구현)
  const openModal = (action: "edit" | "delete" | "plus") => {
    setModalAction(action);
    setSelectedStock({
      id: pfId,
      name,
      logo,
      code,
      price,
      growth,
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
        <img className="logo" src={logo}></img>
        <div className="info-section">
          <h2>{name}</h2>
          <p>{code}</p>
        </div>
        <div
          className="growth-section"
          style={{ color: getGrowthColor(growth) }}
        >
          {growth}%
        </div>
        <div className="price-section">
          <p>수량 {pfId}</p>
          <div>{formatPrice(price)}원</div>
          <p>{formatPrice(pfId * price)}</p>
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
