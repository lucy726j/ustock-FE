import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";

const Layout = (props: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="Layout">
      <Header />
      <main style={{ height: "100%" }}>{props.children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
