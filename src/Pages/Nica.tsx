import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import "../Component/Carousel/embla.css";
import { data } from "../data/data";
import PfCreate from '../Component/Modal/PfCreate';
import { Input } from "../Component/Input/input"; // 수정된 import 문
import AddPortfolio from '../Component/Modal/AddPortfolio';

const OPTIONS: EmblaOptionsType = { loop: true };

const Nica: React.FC = () => {
    return (
        <>
            <PfCreate />
            <AddPortfolio />
        </>
    );
}

export default Nica;
