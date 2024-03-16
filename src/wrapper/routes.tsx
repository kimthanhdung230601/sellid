import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../pages/admin/layout/Layout";
import HomeAdmin from "../pages/admin/home/home";
import Profile from "../pages/admin/profile";
import UserAdmin from "../pages/admin/user";
import Home from "../pages/user/Home";
import Account from "../pages/user/Account";
import Product from "../pages/admin/addNew/product";
import LogIn from "../pages/user/log";
import NotFoundPage from "../pages/404";

const Component = () => {
  return (
    <>
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route index path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/them-moi" element={<Product />} />
            <Route path="/admin/quan-ly-chung" element={<Profile />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/category/:id/:category" element={<Home />} />
            <Route path="/dang-nhap" element={<LogIn />} />
            <Route path="/tai-khoan" element={<Account />} />
            
        </Routes>
    </>
  );
};

export default Component;