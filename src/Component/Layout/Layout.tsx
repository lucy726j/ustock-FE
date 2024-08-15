import exp from "constants";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import BackHeader from "./Header/BackHeader";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <BackHeader />
      <SearchBar />
      <main>{props.children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
