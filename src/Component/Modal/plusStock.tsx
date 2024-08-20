import { Input } from "../Input/input";
import ModalOpen from "./modal";
import * as M from "../List/modalStyle";
import GukBap from "../../img/Gukbap.png";
import { useState } from "react";

interface StockPlusModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (quantity: number, price: number) => void;
}

const StockPlusModal: React.FC<StockPlusModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isValid, setIsValid] = useState(true);

  const handleConfirm = () => {
    if (!quantity || !price) {
      setIsValid(false);
      return;
    }
    onConfirm(quantity, price);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setQuantity(isNaN(value) ? 0 : value);
    setPrice(isNaN(value) ? 0 : value);
    setIsValid(true);
  };

  return (
    <ModalOpen
      title="종목 추가"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      showOneConfirmBtn={true}
      text="추가 매수"
      onConfirm={handleConfirm}
    >
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
              errorMessage="수량을 입력해주세요"
              value={quantity.toString()}
              isValid={isValid || !!quantity}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <M.Div>평균 단가</M.Div>
            <Input
              placeholder="ex) 10,000"
              size="medium"
              colorType="fillType"
              errorMessage="단가를 입력해주세요"
              isValid={isValid || !!price}
              value={price.toString()}
              onChange={handleChange}
            />
          </div>
        </M.Container>
      </div>
    </ModalOpen>
  );
};

export default StockPlusModal;
