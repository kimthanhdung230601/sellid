import { useState } from "react";
import styles from "./styles.module.scss";
import Register from "./register";
import LogInComponent from "./logIn";
interface LogInProps {}

const LogIn = () => {
    document.title = "Đăng nhập - Đăng ký"
    const [selected,setSelected] = useState("login");
    const handleClickSelect = (value:any)=>{
        setSelected(value);
    }
  return (
    <div className={styles.wrap}>
      <div className={styles.logWrap}>
        <div className={styles.titleGroup}>
          <h3
            className={`${styles.title} ${
              selected === "login" ? styles.selected : styles.notSelect
            }`}
            onClick={() => handleClickSelect("login")}
          >
            Đăng nhập
          </h3>
          <h3
            className={`${styles.title} ${
              selected === "register" ? styles.selected : styles.notSelect
            }`}
            onClick={() => handleClickSelect("register")}
          >
            Đăng ký
          </h3>
        </div>
        <div className={styles.formGroup}>
          {selected === "login" ? <LogInComponent /> : <Register setSelected={setSelected} />}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
