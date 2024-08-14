import exp from "constants";
import Header from "./Header/Header";
import NavBar from "./NavBar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
