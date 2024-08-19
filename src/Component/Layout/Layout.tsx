import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";

const Layout = (props: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isBackHeader = location.pathname === "/stocks/${:id}";

  return (
    <div>
      {!isLoginPage && <Header />}
      <main>{props.children}</main>
      {!isLoginPage && <NavBar />}
    </div>
  );
};

export default Layout;
