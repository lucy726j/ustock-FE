import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Nica from "./Pages/Nica";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/nica" element={<Nica/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default Router;