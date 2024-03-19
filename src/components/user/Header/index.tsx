import {useEffect, useState}  from "react";
import style from "./Header.module.scss";
import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { formatCurrency } from "../../../constant/currencyFormatter";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../api/ApiUser";


const secretKey = process.env.REACT_APP_SECRET_KEY as string
const decrypt = (value: string) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
export default function Header() {
  const [admin, setIsAdmin] = useState('')
  const path = useLocation()
  const {data: userInfor, isFetching} = useQuery(["headerInfor"], () => getUserInfo(),{
    enabled: Cookies.get("token") !== undefined,
    onSuccess: (fetchedData) => {
      const secretKey = process.env.REACT_APP_SECRET_KEY as string
      const saveMoney = CryptoJS.AES.encrypt(
        fetchedData?.data[0].money,
        secretKey
      ).toString();
      Cookies.set("money", saveMoney)
    },
  })

  const handleLogOut = () => {
    logout();
    window.location.replace("/dang-nhap")
  };
  const handleGoToHomePage = () => {
    window.location.replace("/")
  }
  useEffect(()=>{
    const ad = Cookies.get("isAdmin") || ""
    setIsAdmin(decrypt(ad))
  },[])
  return (
    <div className={style.wrap}>
      <div className={style.headerItem} onClick={handleGoToHomePage}>
          <Image
            src={require("../../../assets/image/logo.png")}
            preview={false}
            width={50}
          />
          <div  className={style.name}>
            Trang chủ
          </div>
      </div>
      
      {
        Cookies.get("token") ? 
        <div  style={{display: "flex", alignItems: "end"}}> 
        {path.pathname !== "/tai-khoan" ?
          <li className={style.headerItem}>
            Số dư: <span style={{color: "#69AD3A", marginLeft: "8px", marginRight: "20px"}}>{isFetching ? "loading..." : `${formatCurrency(userInfor?.data[0].money)} VNĐ` } </span>
          </li>
          : null
      }
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
