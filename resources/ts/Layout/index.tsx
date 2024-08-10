import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigations from "../components/Navigation";

const Layout = () => {
  return (
    <div>
      <Header />
      <Navigations />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
