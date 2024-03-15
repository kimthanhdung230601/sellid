import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./Account.module.scss";
import { Col, Image, Modal, Row, Table } from "antd";
import Header from "../../../components/user/Header";
import { formatCurrency } from "../../../constant/currencyFormatter";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../api/ApiUser";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router";

function Account() {
  document.title = "Tài khoản"
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState(0)
  const {data: userInfor} = useQuery(["userInfo"], () => getUserInfo(),{
    staleTime: 60000,
    cacheTime: Infinity,
    refetchInterval: 60000, 
    onSettled: (fetchedData) => {
      const money = Cookies.get("money")
      const secretKey = process.env.REACT_APP_SECRET_KEY as string
      if(money){
        const bytes = CryptoJS.AES.decrypt(money, secretKey);
        const decryptedMoney= bytes.toString(CryptoJS.enc.Utf8);
        const result = parseInt(fetchedData?.data[0].money, 10) - parseInt(decryptedMoney, 10)
        console.log(decryptedMoney)
        if(result > 0){
          const saveMoney = CryptoJS.AES.encrypt(
            fetchedData?.data[0].money,
            secretKey
          ).toString();
          Cookies.set("money", saveMoney)
          setIsModalOpen(true)
          setMoney(result)
        }
      } else{
        const saveMoney = CryptoJS.AES.encrypt(
          fetchedData?.data[0].money,
          secretKey
        ).toString();
        Cookies.set("money", saveMoney)
      }
    },
  })
  const handleOk = () => {
    setIsModalOpen(false);
  };
  console.log(location.pathname)
  return (
    <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
            <Row gutter={40} className={styles.row}>
              <Col span={10} xxl={10} lg={10} md={24} sm={24} xs={24}>
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

                  <div className={styles.aboutName}>{userInfor?.data[0].username}</div>
                  <div className={styles.aboutEmail}>
                  {userInfor?.data[0].email}
                  </div>
                  <div className={styles.aboutSpending}>
                    <div className={styles.spending}>
                      <span className={styles.spendingText}>Số dư: </span>
                    <div className={styles.spendingNumber}>{formatCurrency(parseInt(userInfor?.data[0].money, 10))}{" "} VNĐ</div>
                      
                    </div>
                    {/* <div className={styles.spendingItem}>
                    <div className={styles.spendingNumber}>{formatCurrency(parseInt(userInfor?.data[0].total_money, 10))} {" "} VNĐ</div>
                      <div className={styles.spendingText}>Đã nạp</div>
                    </div> */}
                    
                  </div>
                </div>
              </Col>
              <Col span={14} xxl={14} lg={14} md={24} sm={24} xs={24} >
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
                                <div className={styles.value}>naptien username</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.notiWrap}>
                    <li className={styles.noti}>Quý khách vui lòng nhập đúng nội dung chuyển khoản để nạp tiền, nội dung chuyển khoản có cú pháp <b style={{color: "#c4212a"}}>{"[naptien <tên username>]"} ví dụ "naptien maianh"</b> . Nếu nhập sai nội dung chuyển khoản, tài khoản sẽ <b style={{color: "#c4212a"}}>KHÔNG</b> nạp được tiền.</li>
                    <li className={styles.noti}>Quý khách cũng có thể quét mã QR để chuyển khoản với nội dung đã được nhập sẵn.</li>
                    </div>
                    
                </div>
              </Col>
            </Row>
        </div>
        <Modal className={styles.modal} open={isModalOpen} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }} closeIcon={false} okText="Đóng">
              <Image style={{ marginTop: "30px"}} src={require("../../../assets/image/check.png")} preview={false} width={"20%"} />
              <div style={{fontSize: "16px", marginTop: "20px"}}>Chúc mừng bạn đã nạp thành công số tiền <span style={{color: "#69AD3A", fontWeight: "600"}}> {formatCurrency(money)} {" "} VNĐ</span></div>
      </Modal>
    </div>
  );
}

export default Account;