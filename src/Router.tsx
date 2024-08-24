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
import ReactGA from "react-ga";
import { useEffect } from "react";

// 구글 애널리틱스 설정
const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기

if (gaTrackingId) {
  ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
} else {
  console.error("Google Analytics tracking ID is not defined");
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (gaTrackingId) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);
};

const Router = () => {
  const { user } = useAuth();
  usePageTracking();

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
