import React from 'react';
import EmblaCarousel from '../Component/Carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel'
import "../Component/Carousel/embla.css"
import { data } from "../data/data"

const OPTIONS: EmblaOptionsType = { loop: true }


const Nica: React.FC = () => {

    return (
        <>
            <EmblaCarousel data={data} options={OPTIONS} />
        </>
    );
}

export default Nica;
