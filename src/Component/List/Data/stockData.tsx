import React from "react";
import {
    StockDataPropList,
    StockDataProps,
} from "../../../constants/interface";
import "../StockItemStyle.css";
import { formatPrice, formatROR } from "../../../util/util";
import { useNavigate } from "react-router-dom";

const StockData: React.FC<StockDataProps> = ({
    code,
    name,
    price,
    logo,
    change,
    changeRate,
}) => {
    const nav = useNavigate();
    const handleStockSelect = () => {
        nav(`/stocks/${code}`);
    };

    // formatROR 함수로 값과 색상 가져오기
    const { value: formattedROR, color } = formatROR(changeRate);

    return (
        <div className="StockItem" id={code} onClick={handleStockSelect}>
            {logo ? (
                <img
                    src={logo}
                    alt={`${name} logo`}
                    style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "20px",
                        marginLeft: "1rem",
                        borderRadius: "10px",
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
                        marginLeft: "1rem",
                    }}
                >
                    {name.charAt(0)}
                </div>
            )}

            <div className="info-section">
                <h2>{name}</h2>
                <p>{code}</p>
            </div>
            <div className="price">{formatPrice(price)}원</div>
            <div
                className="growth"
                style={{ color: color }} // formatROR에서 반환된 color 사용
            >
                {formattedROR}% {/* 포맷된 수익률 표시 */}
            </div>
        </div>
    );
};

export default StockData;
