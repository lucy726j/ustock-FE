import { Input } from "../Input/input";
import ModalOpen from "./modal";
import * as M from "../List/modalStyle";
import { useState } from "react";
import { PlusProps } from "../../constants/interface";

interface StockPlusModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: (quantity: number, price: number) => void;
    userStocks: PlusProps[];
}

const StockPlusModal: React.FC<StockPlusModalProps> = ({
    isOpen,
    onRequestClose,
    onConfirm,
    userStocks,
}) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [isValidQuantity, setIsValidQuantity] = useState(true);
    const [isValidPrice, setIsValidPrice] = useState(true);

    const handleConfirm = () => {
        if (!quantity || !price) {
            setIsValidQuantity(false);
            setIsValidPrice(false);
            return;
        }
        onConfirm(quantity, price);
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setQuantity(isNaN(value) ? 0 : value);
        setIsValidQuantity(true);
    };

    const handelChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setPrice(isNaN(value) ? 0 : value);
        setIsValidPrice(true);
    };

    const calculateTotal = (stock: PlusProps) => {
        const totalQuantity = stock.quantity + quantity;
        const totalInvestment =
            stock.quantity * stock.average + quantity * price;
        return { totalQuantity, totalInvestment };
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
                {userStocks.length > 0 ? (
                    userStocks.map((stock) => {
                        const { totalQuantity, totalInvestment } =
                            calculateTotal(stock);
                        return (
                            <div key={stock.code}>
                                <M.Box>
                                    {stock.logo ? (
                                        <img
                                            src={stock.logo}
                                            alt={`${stock.name} logo`}
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
                                            {stock.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h2>{stock.name}</h2>
                                        <M.P>{stock.code}</M.P>
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
                                                <td>{stock.quantity}</td>
                                                <td>
                                                    {stock.average.toLocaleString()}
                                                </td>
                                                <td>
                                                    {(
                                                        stock.quantity *
                                                        stock.average
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>추가</td>
                                                {/* 사용자가 입력한  수량*/}
                                                <td>{quantity}</td>
                                                {/* 사용자가 입력한 구매금액 */}
                                                <td>
                                                    {price.toLocaleString()}
                                                </td>
                                                {/* 사용자가 입력한 수령 * 구매금액 = 총 투자금액 */}
                                                <td>
                                                    {(
                                                        quantity * price
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>합계</td>
                                                <td>{totalQuantity}</td>
                                                <td></td>
                                                <td>
                                                    {totalInvestment.toLocaleString()}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </M.Container>
                                <M.Div>수량 (최대 99,999주)</M.Div>
                                <Input
                                    placeholder="ex) 100"
                                    size="medium"
                                    colorType="fillType"
                                    errorMessage="수량을 입력해주세요"
                                    value={quantity.toString()}
                                    isValid={isValidQuantity || !!quantity}
                                    onChange={handleChangeQuantity}
                                    maxLength={5}
                                />
                                <div style={{ marginTop: "1rem" }}>
                                    <M.Div>
                                        구매 가격 (최대 9,999,999,999원)
                                    </M.Div>
                                    <Input
                                        placeholder="ex) 10,000"
                                        size="medium"
                                        colorType="fillType"
                                        errorMessage="단가를 입력해주세요"
                                        isValid={isValidPrice || !!price}
                                        value={price.toString()}
                                        onChange={handelChangePrice}
                                        maxLength={10}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>사용자의 종목이 없습니다.</p>
                )}
            </div>
        </ModalOpen>
    );
};

export default StockPlusModal;
