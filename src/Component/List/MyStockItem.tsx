import React from 'react';
import { StockItemProps } from '../../constants/interface';
import "./StockItemStyle.css"
import { getGrowthColor, formatPrice } from '../../util/util';

const MyStockItem: React.FC<StockItemProps> = ({ id, name, logo, code, price, growth }) => {
    return (
        <div className='MyStockItem'>
            <div className='button-section'>
                <button>추가매수</button>
                <button>수정</button>
                <button>삭제</button>
            </div>
            <div className="MyStockItemWrapper">
                <img className='logo' src={logo}></img>
                <div className="info-section">
                    <h2>{name}</h2>
                    <p>{code}</p>
                </div>
                <div
                    className="growth-section"
                    style={{color : getGrowthColor(growth)}}
                >
                    {growth}%</div>
                <div className="price-section">
                    <p>수량 {id}</p>
                    <div>{formatPrice(price)}원</div>
                    <p>{formatPrice(id * price)}</p>
                </div>
            </div>
        </div>
    );
}

export default MyStockItem ;
