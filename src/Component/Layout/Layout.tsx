import exp from "constants";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <SearchBar />
      <main>{props.children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
