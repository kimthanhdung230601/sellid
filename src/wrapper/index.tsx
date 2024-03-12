import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../pages/admin/layout/Layout";
import HomeAdmin from "../pages/admin/home/home";
import Product from "../pages/admin/addNew/product";
import Profile from "../pages/admin/profile";
import LogIn from "../pages/user/log";
import Account from "../pages/user/Account";
import Home from "../pages/user/Home";
import UserAdmin from "../pages/admin/user";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { logout } from "../api/api";

const Wrapper = () => {
  const isAuthenticated = Cookies.get("admin");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === "0" || !isAuthenticated) {
      if (window.location.pathname.includes(`/admin`)) {
        logout();
        navigate("/dang-nhap");
      }
    }
  }, [isAuthenticated, window.location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Layout />}>
          <Route index path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/user" element={<UserAdmin />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/dang-nhap" element={<LogIn />} />
        <Route path="/tai-khoan" element={<Account />} />
      </Routes>
    </>
  );
};

export default Wrapper;
