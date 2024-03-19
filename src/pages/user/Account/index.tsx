import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./Account.module.scss";
import { Col, Image, Modal, Row, message } from "antd";
import Header from "../../../components/user/Header";
import { formatCurrency } from "../../../constant/currencyFormatter";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../api/ApiUser";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router";
import { userInfo } from "os";

function Account() {
  document.title = "Tài khoản"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState(0)
  const [reload, setReload] = useState(localStorage.getItem("reload"));
  const {data: userInfor, refetch, isFetching} = useQuery(["userInfo"], () => getUserInfo(),{
    staleTime: 60000,
    cacheTime: Infinity,
    refetchInterval: 60000, 
    enabled: Cookies.get("token") !== undefined,
    onSuccess: (fetchedData) => {
      const money = Cookies.get("money") as string
      const secretKey = process.env.REACT_APP_SECRET_KEY as string
      if(money){
        const bytes = CryptoJS.AES.decrypt(money, secretKey);
        const decryptedMoney= bytes.toString(CryptoJS.enc.Utf8);
        const result = parseInt(fetchedData?.data[0].money, 10) - parseInt(decryptedMoney, 10)
        if(result > 0){
          setIsModalOpen(true)
          setMoney(result)
          localStorage.setItem("reload", "true")
          
        } 
      } 
      const saveMoney = CryptoJS.AES.encrypt(
        fetchedData?.data[0].money,
        secretKey
      ).toString();
      Cookies.set("money", saveMoney)
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau")
      window.location.reload()
    }
  })
  const isFirstFetchFetching = isFetching && !userInfor;
  const handleOk = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    window.addEventListener('storage', () => {
      const theme = localStorage.getItem('reload')
      setReload(theme);
    })
    if (reload === "true") {
      refetch()
      localStorage.setItem("reload", "false");
      setReload("false"); 
    }
  }, [reload]);
  return (
    <div className={styles.wrapper}>
        <Header/>
        <div className={styles.container}>
            <Row gutter={40} className={styles.row}>
              <Col span={10} xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.accountAbout}>
                  <div className={styles.userInfor}>
                    <div className={styles.abountImgWrap}>
                      <img
                        className={styles.aboutImg}
                        src={require("../../../assets/image/logo.png")}
                      />
                    </div>
                    <div className={styles.aboutTick}>
                    <CheckCircleOutlined className={styles.aboutIcon}/>
                    </div>
                  </div>
                  {isFirstFetchFetching ? <div className={styles.aboutName}>loading...</div> : <div className={styles.aboutName}>{ userInfor?.data[0].username}</div>}
                  {isFirstFetchFetching? 
                    <div className={styles.aboutEmail}>
                      loading...
                    </div>
                    : 
                    <div className={styles.aboutEmail}>
                      {userInfor?.data[0].email}
                    </div>
                  }
                  
                  <div className={styles.aboutSpending}>
                    <div className={styles.spending}>
                      <span className={styles.spendingText}>Số dư: </span>
                      {
                        isFirstFetchFetching ? <div className={styles.spendingNumber}>loading...</div>
                        : <div className={styles.spendingNumber}>{formatCurrency(parseInt(userInfor?.data[0].money, 10))}{" "} VNĐ</div>
                      }
                    
                      
                    </div>

                  </div>
                </div>
              </Col>
              <Col span={14} xxl={14} xl={14} lg={24} md={24} sm={24} xs={24} >
                <div className={styles.inforWrap}>
                <div className={styles.title}>Nạp tiền</div>
                    <div className={styles.infor}>
                        <Image src={`https://api.vietqr.io/Mbbank/107069099999/0/naptien%20${userInfor?.data[0].username}/vietqr_net_2.jpg?accountName=LE%20THI%20THU%20HA&fbclid=IwAR32mVZcLPmA_8TLyVwonR7-ZgX5mXD2MooKJoNCrQNhiUd5kSBZwoyATak`} className={styles.inforImg} width={"30%"}/>
                        <div className={styles.inforBank}>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Ngân hàng</div>
                                <div className={styles.value}>MB BANK</div>
                            </div>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Chủ tài khoản</div>
                                <div className={styles.value}>LE THI THU HA</div>
                            </div>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Số tài khoản</div>
                                <div className={styles.value}>107069099999</div>
                            </div>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Nội dung chuyển khoản</div>
                                <div className={styles.value}>naptien {userInfor?.data[0].username}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.notiWrap}>
                    <li className={styles.noti}>Quý khách vui lòng nhập đúng nội dung chuyển khoản để nạp tiền, nội dung chuyển khoản có cú pháp <b style={{color: "#c4212a"}}>{"[naptien <tên username>]"} ví dụ "naptien {userInfor?.data[0].username}"</b> . Nếu nhập sai nội dung chuyển khoản, tài khoản sẽ <b style={{color: "#c4212a"}}>KHÔNG</b> nạp được tiền.</li>
                    <li className={styles.noti}>Quý khách cũng có thể quét mã QR để chuyển khoản với nội dung đã được nhập sẵn.</li>
                    <li className={styles.noti}>Sau khi chuyển khoản thành công, tài khoản sẽ được tự động cập nhật trong khoảng 1 phút </li>
                    </div>
                    
                </div>
              </Col>
            </Row>
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
              <span className={styles.text}>Đàm Xuân Ninh</span>
            </a>
          </li>
          <li>
            <div className={styles.iconItem}>
              Số điện thoại liên hệ:{" "}
              <span className={styles.text}>0978131878</span>
            </div>
          </li>
          <li className={styles.copyRight}>
            Copyright © 2024 -<b> ChippiSoft </b>- Thiết kế phần mềm/Web/App theo yêu cầu.
          </li>
        </div>
      </div>
        <Modal className={styles.modal} open={isModalOpen} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }} closeIcon={false} okText="Đóng">
              <Image style={{ marginTop: "30px"}} src={require("../../../assets/image/check.png")} preview={false} width={"20%"} />
              <div style={{fontSize: "16px", marginTop: "20px"}}>Chúc mừng bạn đã nạp thành công số tiền <span style={{color: "#69AD3A", fontWeight: "600"}}> {formatCurrency(money)} {" "} VNĐ</span></div>
      </Modal>
    </div>
  );
}

export default Account;
