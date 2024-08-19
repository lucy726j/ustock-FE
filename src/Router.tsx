import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Nica from "./Pages/Nica";
import Layout from "./Component/Layout/Layout";
import SearchStock from "./Pages/searchStock";
import PortfolioPage from "./Pages/portfolio";
import CallBackPage from "./Component/GoogleLogin/callback";
import StockDetail from "./Pages/stockDetail";
import PortfolioNo from "./Pages/PortfolioNo";
import PortfolioDetail from "./Pages/PortfolioDetail";
import SkrrrGamePage from "./Pages/skrrrGame";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/nica" element={<Nica />} />
          <Route path="/stocks" element={<SearchStock />} />
          <Route path="/stocks/:id" element={<StockDetail />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/no" element={<PortfolioNo />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/game" element={<SkrrrGamePage />} />
          <Route path="/auth/callback" element={<CallBackPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
