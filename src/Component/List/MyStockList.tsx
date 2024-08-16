import React from 'react';
import styled from 'styled-components';
import { data } from '../../data/data';
import MyStockItem from './MyStockItem';
import { StockItemProps } from '../../constants/interface';
import "./MyStockItemStyle.css"

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 10px
`;

const MyStockList: React.FC = () => {

    return (
        <div>
            <ListWrapper>
                {data.map((item: StockItemProps) => (
                    <MyStockItem key={item.id} {...item} />
                ))}
            </ListWrapper>
        </div>
    );
}

export default MyStockList;
