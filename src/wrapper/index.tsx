import { Route, Routes } from "react-router-dom";
import Layout from "../pages/admin/layout/Layout";
import Home from "../pages/admin/home/home";
import Product from "../pages/admin/addNew/product";
import Profile from "../pages/admin/profile/profile";
import LogIn from "../pages/user/log/log";

const Wrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Layout />}>
          <Route index path="/admin" element={<Home/>} />
          <Route path="/admin/product"  element={<Product/>}/>
          <Route path="/admin/profile" element={<Profile/>}/>
        </Route>
        <Route path="/" >
          <Route path="/logIn" element={<LogIn/>} />
        </Route>
      </Routes>
    </>
  );
};

export default Wrapper;
