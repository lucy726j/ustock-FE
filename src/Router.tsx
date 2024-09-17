import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/home";
import Layout from "./Component/Layout/Layout";
import SearchStock from "./Pages/searchStock";
import PortfolioPage from "./Pages/portfolio";
import CallBackPage from "./Component/GoogleLogin/callback";
import StockDetail from "./Pages/stockDetail/stockDetail";
import PortfolioDetailPage from "./Pages/PortfolioDetailPage";
import SkrrrGamePage from "./Pages/skrrrGame";
import { useAuth } from "./contexts/authContext";
import NoUserPage from "./Pages/404/noUser";
import LoginPage from "./Pages/404/loginPage";
import ErrorPage from "./Pages/404/errorPage";
import PlayPage from "./Pages/game/playPage";
import InfoPage from "./Pages/game/infoPage";
import TotalResult from "./Pages/game/totalResult";
import GameStocks from "./Pages/game/gameStocks";
import Rank from "./Pages/game/rank";
import { StockProvider } from "./store/stockContext";
import PreventNavigation from "./Game/Navigation/prevent";
import PreventBackNavigation from "./Game/Navigation/preventBack";
import { useEffect } from "react";

const Router = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <StockProvider>
          <Routes>
            <Route path="/nologin" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/stocks" element={<SearchStock />} />
            <Route path="/stocks/:id" element={<StockDetail />} />
            {user ? (
              <>
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route
                  path="/portfolio/:id"
                  element={<PortfolioDetailPage />}
                />
                <Route path="/game/*" element={<GameRoutes />} />
              </>
            ) : (
              <Route path="/*" element={<NoUserPage />} />
            )}
            <Route path="/auth/callback" element={<CallBackPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </StockProvider>
      </Layout>
    </BrowserRouter>
  );
};

// 게임 라우터
const GameRoutes = () => {

  return (
    <StockProvider>
      <PreventNavigation />
      <PreventBackNavigation />
      <Routes>
        <Route path="/" element={<SkrrrGamePage />} />
        <Route path="play/:year" element={<PlayPage />} />
        <Route path="info/:year" element={<InfoPage />} />
        <Route path="result/total" element={<TotalResult />} />
        <Route path="gameStocks" element={<GameStocks />} />
        <Route path="rank" element={<Rank />} />
      </Routes>
    </StockProvider>
  );
};

export default Router;
