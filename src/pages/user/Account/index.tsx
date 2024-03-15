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

function Account() {
  document.title = "Tài khoản"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState(0)
  const {data: userInfor} = useQuery(["userInfo"], () => getUserInfo(),{
    staleTime: 60000,
    cacheTime: Infinity,
    refetchInterval: 60000, 
    onSettled: (fetchedData) => {
      const money = Cookies.get("money")
      if(money){
        const result = parseInt(fetchedData?.data[0].money, 10) - parseInt(money, 10)
        if(result > 0){
          Cookies.set("money", fetchedData?.data[0].money)
          setIsModalOpen(true)
          setMoney(result)
        }
      } else{
        Cookies.set("money", fetchedData?.data[0].money)
      }
    },
  })
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
            <Row gutter={40}>
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
                        <Image src={require("../../../assets/image/qr.jpg")} className={styles.inforImg} width={"30%"}/>
                        <div className={styles.inforBank}>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Ngân hàng</div>
                                <div className={styles.value}>MB BANK</div>
                            </div>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Chủ tài khoản</div>
                                <div className={styles.value}>Trần Văn anh</div>
                            </div>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Số tài khoản</div>
                                <div className={styles.value}>0948484737373838</div>
                            </div>
                            <div className={styles.inforItem}>
                                <div className={styles.name}>Nội dung chuyển khoản</div>
                                <div className={styles.value}>NHHHDJDE</div>
                            </div>
                
                        </div>
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