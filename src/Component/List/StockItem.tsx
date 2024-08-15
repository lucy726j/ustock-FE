import React from 'react';
import { StockItemProps } from '../../constants/interface';
import "./StockItemStyle.css"
import { getGrowthColor, formatPrice } from '../../util/util';

const StockItem: React.FC<StockItemProps> = ({ id, name, logo, code, price, growth }) => {
    return (
        <div className="StockItem">
            <img className='logo' src={logo}></img>
            <div className="info-section">
                <h2>{name}</h2>
                <p>{code}</p>
            </div>
            <div className="price">{formatPrice(price)}원</div>
            <div
                className="growth"
                style={{color : getGrowthColor(growth)}}
            >
                {growth}%</div>
        </div>
    );
}

export default StockItem;
