import React from "react";
import style from "./Header.module.scss";
import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../api/api";
export default function Header() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/dang-nhap");
  };
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
          <li className={style.menuItem}>
            <Link to={"/tai-khoan"} className={`${style.menuItemLink}`}>
              Tài khoản
            </Link>
          </li>
          <li className={style.menuItem} onClick={handleLogOut}>
            <Link to={"/dang-nhap"} className={style.menuItemLink}>
              Đăng nhập
            </Link>
          </li>
          <li className={style.menuItem} onClick={handleLogOut}>
            <Link to={"/dang-nhap"} className={style.menuItemLink}>
              Đăng xuất
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
