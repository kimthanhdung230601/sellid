import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { logout } from "../../../api/api";
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
        <div
          onClick={() => handleItemClick("")}
          className={`${styles.headerItem} ${
            selectedItem == "" ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>Trang chủ </span>
        </div>
        <div
          onClick={() => handleItemClick("product")}
          className={`${styles.headerItem} ${
            selectedItem == "product" ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>Thêm Folder</span>
        </div>
        <div
          onClick={() => handleItemClick("profile")}
          className={`${styles.headerItem} ${
            selectedItem == "profile" ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>Admin</span>
        </div>
        <div
          onClick={() => handleItemClick("user")}
          className={`${styles.headerItem} ${
            selectedItem == "user" ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>User</span>
        </div>
        <div className={styles.icon}>
          <UserOutlined />
          <div className={`animate__zoomIn ${styles.userMenu}`}>
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
    </>
  );
};

export default Layout;
