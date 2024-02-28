import { Outlet } from "react-router";

interface LayoutProps {}

const Layout = () => {
  return (
    <>
      Layout
      <Outlet />
    </>
  );
};

export default Layout;
