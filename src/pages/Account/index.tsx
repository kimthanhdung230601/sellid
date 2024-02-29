import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./Account.module.scss";
import { Col, Image, Row, Table } from "antd";
import Header from "../../components/user/Header";
import { formatCurrency } from "../../constant/currencyFormatter";

function Account() {
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
                        src={require("../../assets/image/logo.png")}
                      />
                    </div>
                    <div className={styles.aboutTick}>
                    <CheckCircleOutlined className={styles.aboutIcon}/>
                    </div>
                  </div>

                  <div className={styles.aboutName}>username</div>
                  <div className={styles.aboutEmail}>
                    @nguyenquanghuy7765@gmail.com
                  </div>
                  <div className={styles.aboutSpending}>
                    <div className={styles.spending}>
                      <div className={styles.spendingNumber}>{formatCurrency(100000)} {" "} VNĐ</div>
                      <div className={styles.spendingText}>Đã nạp</div>
                    </div>
                    <div className={styles.spendingItem}>
                      <div className={styles.spendingNumber}>{formatCurrency(100000)}{" "} VNĐ</div>
                      <div className={styles.spendingText}>Số dư</div>
                    </div>
                    
                  </div>
                </div>
              </Col>
              <Col span={14} xxl={14} lg={14} md={24} sm={24} xs={24} className={styles.inforWrap}>
                    <div className={styles.title}>Nạp tiền</div>
                    <div className={styles.infor}>
                        <Image src={require("../../assets/image/qr.jpg")} className={styles.inforImg} width={"30%"}/>
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
                    
              </Col>
            </Row>
        </div>
            
    </div>
  );
}

export default Account;