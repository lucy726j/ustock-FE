import exp from "constants";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import BackHeader from "./Header/BackHeader";
import Dropdown from "../Dropdown/Dropdown";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <BackHeader />
      <SearchBar />
      <Dropdown />
      <main>{props.children}</main>
      <NavBar />
    </div>
  );
};

export default Layout;
