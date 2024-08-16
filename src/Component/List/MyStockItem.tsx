import React, { useState } from "react";
import { StockItemProps } from "../../constants/interface";
import "./StockItemStyle.css";
import { getGrowthColor, formatPrice } from "../../util/util";
import ModalOpen from "../Modal/modal";
import GukBap from "../../img/Gukbap.png";
import { Input } from "../Input/input";
import * as M from "./modalStyle";

const MyStockItem: React.FC<StockItemProps> = ({
  id,
  name,
  logo,
  code,
  price,
  growth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "add" | "edit" | "delete" | "plus" | null
  >(null);

  // 확인버튼 눌렀을때 어떻게 될 건지 넣어야함
  const handleConfirm = () => {
    if (modalAction === "add") {
    } else if (modalAction === "edit") {
    } else if (modalAction === "delete") {
    } else {
    }
  };

  // 어떤 버튼을 눌렀냐에 따라 text가 달라짐
  const getButtonText = () => {
    if (modalAction === "add") return "자산 추가";
    if (modalAction === "edit") return "자산 수정";
    if (modalAction === "plus") return "추가 매수";
    if (modalAction === "delete") return "삭제";
    return "확인";
  };

  const showOneConfirmBtn = modalAction !== "delete";
  const showConfirmButton = modalAction === "delete" ? "true" : "";
  const showCancelButton = modalAction === "delete" ? "true" : "";

  // 모달 액션
  const openModal = (action: "add" | "edit" | "delete" | "plus") => {
    setModalAction(action);
    setIsOpen(true);
  };

  return (
    <div className="MyStockItem">
      <div className="button-section">
        <button onClick={() => openModal("add")}>종목 추가</button>
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
          <p>수량 {id}</p>
          <div>{formatPrice(price)}원</div>
          <p>{formatPrice(id * price)}</p>
        </div>
      </div>

      <ModalOpen
        title={
          modalAction === "plus"
            ? "종목 추가"
            : modalAction === "add"
            ? "추가 매수"
            : modalAction === "edit"
            ? "자산 수정"
            : "종목 삭제"
        }
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        showOneConfirmBtn={showOneConfirmBtn}
        text={getButtonText()}
        onConfirm={handleConfirm}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        confirmLabel="확인"
        cancelLabel="취소"
      >
        {(modalAction === "add" || modalAction === "edit") && (
          <div>
            <M.Box>
              <M.Img src={GukBap} alt="주식 종목" />
              <div>
                <h2>APS</h2>
                <M.P>05462</M.P>
              </div>
            </M.Box>
            <M.Container>
              <div>
                <M.Div>수량</M.Div>
                <Input placeholder="수량" size="medium" colorType="fillType" />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <M.Div>평균 단가</M.Div>
                <Input placeholder="단가" size="medium" colorType="fillType" />
              </div>
            </M.Container>
          </div>
        )}
        {modalAction === "plus" && (
          <div>
            <M.Box>
              <M.Img src={GukBap} alt="주식 종목" />
              <div>
                <h2>APS</h2>
                <M.P>054620</M.P>
              </div>
            </M.Box>
            <M.Container>
              <table
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>수량</th>
                    <th>구매 가격 (₩)</th>
                    <th>투자 금액(₩)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>현재</td>
                    <td>50</td>
                    <td>5,000</td>
                    <td>250,000</td>
                  </tr>
                  <tr>
                    <td>추가</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>합계</td>
                    <td>50</td>
                    <td>5,000</td>
                    <td>250,000</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <M.Div>수량</M.Div>
                <Input
                  placeholder="ex) 100"
                  size="medium"
                  colorType="fillType"
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <M.Div>평균 단가</M.Div>
                <Input
                  placeholder="ex) 10,000"
                  size="medium"
                  colorType="fillType"
                />
              </div>
            </M.Container>
          </div>
        )}
        {modalAction === "delete" && (
          <div
            style={{
              display: "flex",
              marginTop: "50px",
              justifyContent: "center",
            }}
          >
            <p>정말 이 항목을 삭제하시겠습니까?</p>
          </div>
        )}
      </ModalOpen>
    </div>
  );
};

export default MyStockItem;
