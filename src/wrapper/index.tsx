import React from 'react'
import { logout } from '../api/api';
import {message} from "antd"
import { useLocation, useNavigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Component from './routes';
import CryptoJS from 'crypto-js';
import Layout from "../pages/admin/layout/Layout";
import HomeAdmin from "../pages/admin/home/home";
import Profile from "../pages/admin/profile";
import UserAdmin from "../pages/admin/user";
import Home from "../pages/user/Home";
import Account from "../pages/user/Account";
import Product from "../pages/admin/addNew/product";
import LogIn from "../pages/user/log";
import NotFoundPage from "../pages/404";
const secretKey = process.env.REACT_APP_SECRET_KEY as string
export default function Wrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeElement = useRoutes([
    {path: "/admin", element: <HomeAdmin />},
    {path: "/admin/them-moi", element: <Product />},
    {path: "/admin/quan-ly-chung", element: <Profile />},
    {path: "/", element: <Home />},
    {path: "/category/:id/:category", element: <Home />},
    {path: "/dang-nhap", element: <LogIn />},
    {path: "/tai-khoan", element: <Account />},
  ]);
  const goToLogin = (text: string): null => {
    if (typeof window !== "undefined") {
      logout()
      message.warning( `Bạn cần đăng nhập ${text} để truy cập trang này!`, 5);
      setTimeout(()=>{
          navigate('/dang-nhap')
      }, 5000)
    }
    
    return null;
  };

  if(!routeElement) return <NotFoundPage />
  if (location.pathname === "/" || location.pathname === "/dang-nhap" || location.pathname.includes('category')) {
    return (
      <Component />
  );
  } else {
    if (Cookies.get('token')) {
     if(location.pathname.includes('admin')){
      const isAuthenticated = Cookies.get("isAdmin") as string;
      let decryptedAuth: string;
      const bytes = CryptoJS.AES.decrypt(isAuthenticated, secretKey);
      decryptedAuth = bytes.toString(CryptoJS.enc.Utf8);
      if(decryptedAuth === "1") return <Component />
      else return goToLogin("quyền admin")
    } else {
          return (
            <Component />
          ); 
      }
    }  else return goToLogin("");
  }
}
