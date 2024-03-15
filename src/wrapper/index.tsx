import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../pages/admin/layout/Layout";
import { lazy, Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logout } from "../api/api";
import { Spin } from "antd";

// Sử dụng lazy loading cho các trang admin
const HomeAdmin = lazy(() => import("../pages/admin/home/home"));
const Product = lazy(() => import("../pages/admin/addNew/product"));
const Profile = lazy(() => import("../pages/admin/profile"));
const UserAdmin = lazy(() => import("../pages/admin/user"));

const LogIn = lazy(() => import("../pages/user/log"));
const Account = lazy(() => import("../pages/user/Account"));
const Home = lazy(() => import("../pages/user/Home"));

const Wrapper = () => {
  const isAuthenticated = Cookies.get("isAdmin");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isAuthenticated === "0" || !isAuthenticated) {
      if (window.location.pathname === "/admin") {
        logout();
        navigate("/dang-nhap");
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Spin
          // fullscreen
          size="large"
          tip="Xin vui lòng chờ trong giây lát"
          className="loading-container"
        />
      ) : (
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route index path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/user" element={<UserAdmin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Home />} />
          <Route path="/dang-nhap" element={<LogIn />} />
          <Route path="/tai-khoan" element={<Account />} />
        </Routes>
      )}
    </>
  );
};

export default Wrapper;
