import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Nica from "./Pages/Nica";
import Layout from "./Component/Layout/Layout";
import SearchStock from "./Pages/searchStock";
import Portfolio from "./Pages/portfolio";
import SkrrrGame from "./Pages/skrrrGame";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/nica" element={<Nica/>} />
            <Route path="/stocks" element={<SearchStock />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/game" element={<SkrrrGame />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
