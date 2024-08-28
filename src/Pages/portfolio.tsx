import { usePortfolioStore } from "../store/usePortfolioStore";
import PortfolioNo from "./PortfolioNo";
import axios from "axios";
import { useState } from "react";
import Portfolio from "../Component/Portfolio/portfolio";
import "../Component/Carousel/embla.css";

const PortfolioPage = () => {
  const isProfile = usePortfolioStore((state) => state.isPortfolio);
  const portfolioChange = usePortfolioStore((state) => state.portfolioChange);

  axios
    .get(`${process.env.REACT_APP_API_URL}/v1/portfolio/check`, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data === true) {
        isProfile(true);
      } else {
        isProfile(false);
      }
    });

  return <>{portfolioChange ? <Portfolio /> : <PortfolioNo />}</>;
};

export default PortfolioPage;
