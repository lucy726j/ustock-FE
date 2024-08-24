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
const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
const clarityTrakingId = process.env.REACT_APP_CLARITY_TRACKING_ID;

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

// MicroSoft Clarity 설정
// 타입 에러 때문에,,, c,a,i any로 변경
useEffect(() => {
  (function (
    c: any,
    l: Document,
    a: any,
    r: keyof HTMLElementTagNameMap,
    i: any
  ) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };

    const t: HTMLScriptElement = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;

    const y = l.getElementsByTagName(r)[0] as HTMLElement; // Explicitly cast to HTMLElement
    if (y && y.parentNode) {
      y.parentNode.insertBefore(t, y);
    }
  })(window, document, "clarity", "script", clarityTrakingId);
}, []);
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
