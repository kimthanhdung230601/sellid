import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { logout } from "../../../api/api";
import { Col, Row } from "antd";
interface LayoutProps {}

const Layout = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    navigate(`./${item}`);
  };
  const handleLogOut = () => {
    logout();
    navigate("/dang-nhap");
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={`${styles.imageWrapper} `}>
          <img
            className={styles.image}
            src={require("../../../assets/image/logo.png")}
          />
        </div>
        <div
          onClick={() => handleItemClick("")}
          className={`${styles.headerItem} ${
            window.location.pathname.match(/admin(\/|$)/) ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>Trang chủ </span>
        </div>
        <div
          onClick={() => handleItemClick("them-moi")}
          className={`${styles.headerItem} ${
            window.location.pathname.includes("/admin/them-moi")
              ? styles.selected
              : ""
          }`}
        >
          <span className={styles.text}>Thêm Folder</span>
        </div>
        <div
          onClick={() => handleItemClick("quan-ly-chung")}
          className={`${styles.headerItem} ${
            window.location.pathname.includes("/admin/quan-ly-chung")
              ? styles.selected
              : ""
          }`}
        >
          <span className={styles.text}>Quản lý</span>
        </div>
        <div className={styles.icon}>
          <UserOutlined />
          <div className={`animate__zoomIn ${styles.userMenu}`}>
            {" "}
            <li
              className={styles.menuItem}
              onClick={() => {
                navigate("/");
              }}
            >
              <Link to={"/"} className={styles.menuItemLink}>
                User
              </Link>
            </li>
            <li className={styles.menuItem} onClick={() => handleLogOut()}>
              <Link to={"/dang-nhap"} className={styles.menuItemLink}>
                Đăng xuất
              </Link>
            </li>
          </div>
        </div>
      </div>
      <div className={styles.headerResponsive}>
      <div className={`${styles.imageWrapper} `}>
          <img
            className={styles.image}
            src={require("../../../assets/image/logo.png")}
          />
        </div>
        <div
          onClick={() => handleItemClick("")}
          className={`${styles.headerItem} ${
            window.location.pathname.match(/admin(\/|$)/) ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>Trang chủ </span>
        </div>

        <div className={styles.icon}>
          <UserOutlined />
          <div className={`animate__zoomIn ${styles.userMenu}`}>
            {" "}
            <li
              className={styles.menuItem}
              onClick={() => {
                navigate("./them-moi");
              }}
            >
              <Link to={"/them-moi"} className={styles.menuItemLink}>
                Thêm mới
              </Link>
            </li>
            <li
              className={styles.menuItem}
              onClick={() => {
                navigate("./quan-ly-chung");
              }}
            >
              <Link to={"./quan-ly-chung"} className={styles.menuItemLink}>
                Quản lý
              </Link>
            </li>
            <li
              className={styles.menuItem}
              onClick={() => {
                navigate("/");
              }}
            >
              <Link to={"/"} className={styles.menuItemLink}>
                User
              </Link>
            </li>
            <li className={styles.menuItem} onClick={() => handleLogOut()}>
              <Link to={"/dang-nhap"} className={styles.menuItemLink}>
                Đăng xuất
              </Link>
            </li>
          </div>
        </div>
      </div>
      <div className={styles.wraps}>
        {" "}
        <Outlet />
      </div>
      <div className={styles.footerWrap}>
        <div className={styles.imgWrapper}>
          <img
            className={styles.imgLogoFooter}
            src={require("../../../assets/image/logoFooter.png")}
          />
        </div>

        <div className={styles.iconWrap}>
          <li>
            <span className={styles.iconItem}>Facebook: </span>
            <a
              className={styles.text}
              href="https://www.facebook.com/DamXuanNinh"
            >
              Đàm Xuân Ninh
            </a>
          </li>
          <li>
            <div className={styles.iconItem}>
              Số điện thoại liên hệ:{" "}
              <span className={styles.text}>0978131878</span>
            </div>
          </li>
          <li className={styles.copyRight}>
            Copyright © 2024 -<b> ChippiSoft </b>- Thiết kế phần mềm/Web/App
            theo yêu cầu
          </li>
        </div>
      </div>
    </>
  );
};

export default Layout;
