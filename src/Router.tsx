import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import Layout from "./Component/Layout/Layout";
import SearchStock from "./Pages/searchStock";
import PortfolioPage from "./Pages/portfolio";
import CallBackPage from "./Component/GoogleLogin/callback";
import StockDetail from "./Pages/stockDetail/stockDetail";
import PortfolioNo from "./Pages/PortfolioNo";
import PortfolioDetailPage from "./Pages/PortfolioDetailPage";
import SkrrrGamePage from "./Pages/skrrrGame";
import { useAuth } from "./contexts/authContext";
import NoUserPage from "./Pages/404/noUser";
import LoginPage from "./Pages/404/loginPage";

const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/nologin" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<SearchStock />} />
          <Route path="/stocks/:id" element={<StockDetail />} />
          {user ? (
            <>
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/no" element={<PortfolioNo />} />
              <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
            </>
          ) : (
            <Route path="/*" element={<NoUserPage />} />
          )}
          <Route path="/game" element={<SkrrrGamePage />} />
          <Route path="/auth/callback" element={<CallBackPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
