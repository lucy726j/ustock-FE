import React from 'react';
import EmblaCarousel from '../Component/Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel'
import "../Component/Carousel/embla.css"
import { data } from "../data/data"
import MyStockList from '../Component/List/MyStockList';
import StockList from '../Component/List/StockList';
import NewsList from '../Component/News/NewsList';

const OPTIONS: EmblaOptionsType = { loop: true }


const Nica: React.FC = () => {

    return (
        <>
            <EmblaCarousel data={data} options={OPTIONS} />
            <MyStockList />
            <NewsList />
        </>
    );
}

export default Nica;
