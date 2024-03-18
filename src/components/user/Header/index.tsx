import {useEffect, useState}  from "react";
import style from "./Header.module.scss";
import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { formatCurrency } from "../../../constant/currencyFormatter";

const moneyDecrypt = Cookies.get("money") || ""
const secretKey = process.env.REACT_APP_SECRET_KEY as string
const decrypt = (value: string) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
export default function Header({ status} : {status: any}) {
  const [money, setMoney] = useState(parseInt(decrypt(moneyDecrypt), 10))
  const [admin, setIsAdmin] = useState('')
  const handleLogOut = () => {
    logout();
    window.location.replace("/dang-nhap")
  };
  useEffect(()=>{
    const money = Cookies.get("money") || ""
    setMoney(parseInt(decrypt(money), 10))
    const ad = Cookies.get("isAdmin") || ""
    setIsAdmin(decrypt(ad))
  },[money, status])
  return (
    <div className={style.wrap}>
      <Link to={"/"} className={style.headerItem}>
          <Image
            src={require("../../../assets/image/logo.png")}
            preview={false}
            width={26}
          />
          <div  className={style.name}>
            Trang chủ
          </div>
      </Link>
      
      {
        Cookies.get("token") ? 
        <div  style={{display: "flex", alignItems: "end"}}> 
          <li className={style.headerItem}>
            Số dư: <span style={{color: "#69AD3A", marginLeft: "8px", marginRight: "20px"}}>{formatCurrency(money) ? formatCurrency(money) : "loading..."} {" "} VNĐ</span>
          </li>
          <div className={style.icon}>
            <UserOutlined className={style.userIcon} />
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
                admin === "1" ? 
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
            
        : 
        <li className={style.headerItem}>
          <Link to={'/dang-nhap'} className={style.menuItemLink}>
            Đăng nhập
          </Link>
        </li>
      }
    
        
    </div>
  );
}
