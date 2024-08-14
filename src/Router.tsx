import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Layout from "./Component/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
