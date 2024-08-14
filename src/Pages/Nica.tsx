import React from 'react';
import MyStockList from "../Component/List/MyStockList";
import StockList from '../Component/List/StockList';

const Nica: React.FC = () => {
    return (
        <>
            <MyStockList />
            <br />
            <StockList />
        </>
    );
}

export default Nica;
