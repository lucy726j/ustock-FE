import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Nica from "./Pages/Nica";
import Layout from "./Component/Layout/Layout";
import SearchStock from "./Pages/searchStock";
import Portfolio from "./Pages/portfolio";
import SkrrrGame from "./Pages/skrrrGame";
import CallBackPage from "./Component/GoogleLogin/callback";
import LoginPage from "./Pages/login";
import StockDetail from "./Pages/stockDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/nica" element={<Nica />} />
          <Route path="/stocks" element={<SearchStock />} />
          <Route path="/stocks/:id" element={<StockDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/game" element={<SkrrrGame />} />
          <Route path="/auth/callback" element={<CallBackPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
