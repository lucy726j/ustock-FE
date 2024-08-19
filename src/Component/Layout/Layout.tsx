import exp from "constants";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main style={{height: "100%"}}>{props.children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
