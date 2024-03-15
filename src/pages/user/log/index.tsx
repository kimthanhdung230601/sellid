import { useState } from "react";
import styles from "./styles.module.scss";
import Register from "./register";
import LogInComponent from "./logIn";
interface LogInProps {}

const LogIn = () => {
  const [selected, setSelected] = useState("login");
  const handleClickSelect = (value: any) => {
    setSelected(value);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.logWrap}>
        <div className={styles.titleGroup}>
          <h3
            className={`${styles.title} ${
              selected === "login" ? styles.selected : ""
            }`}
            onClick={() => handleClickSelect("login")}
          >
            Đăng nhập
          </h3>
          <h3
            className={`${styles.title} ${
              selected === "register" ? styles.selected : ""
            }`}
            onClick={() => handleClickSelect("register")}
          >
            Đăng ký
          </h3>
        </div>
        <div className={styles.formGroup}>
          {selected === "login" ? <LogInComponent /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
