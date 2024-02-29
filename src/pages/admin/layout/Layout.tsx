import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./styles.module.scss";
interface LayoutProps {}

const Layout = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    navigate(`./${item}`);
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
          <span className={styles.text}>Quản lý</span>
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
