import {useEffect, useState}  from "react";
import style from "./Header.module.scss";
import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY as string
export default function Header() {
  const [isAdmin, setIsAdmin] = useState('0')
  const handleLogOut = () => {
    logout();
    window.location.replace("/dang-nhap")
  };
  useEffect(()=> {
    const admin = Cookies.get("isAdmin") || ""
    const bytes = CryptoJS.AES.decrypt(admin, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    setIsAdmin(decryptedText)
  }, [isAdmin])

  return (
    <div className={style.wrap}>
      <div className={style.headerItem}>
        <Image
          src={require("../../../assets/image/logo.png")}
          preview={false}
          width={26}
        />
        <Link to={"/"} className={style.name}>
          Trang chủ
        </Link>
      </div>
      <div className={style.icon}>
        <UserOutlined />
        <div className={`animate__zoomIn ${style.userMenu}`}>
          {
            Cookies.get("token") ? 
            <li className={style.menuItem}>
              <Link to={"/tai-khoan"} className={`${style.menuItemLink}`}>
                Tài khoản
              </Link>
            </li>
            : null
          }
          {
            isAdmin === "1" ? 
            <li className={style.menuItem}>
              <Link to={"/admin"} className={`${style.menuItemLink}`}>
                Admin
              </Link>
            </li>
            : null
          }
          
          {
            Cookies.get("token") ? 
            <li className={style.menuItem} onClick={handleLogOut}>
              <div  className={style.menuItemLink} onClick={handleLogOut}>
                Đăng xuất
              </div>
            </li>
            : 
            <li className={style.menuItem} onClick={handleLogOut}>
              <div className={style.menuItemLink}>
                Đăng nhập
              </div>
            </li>
          }
        </div>
      </div>
    </div>
  );
}
