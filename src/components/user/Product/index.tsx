import { Col, Image, Modal } from 'antd'
import React, {useEffect, useState} from 'react'
import style from "./Product.module.scss"
import { formatCurrency } from '../../../constant/currencyFormatter'
export default function Product() {
    const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal1 = () => {
    setOpen(true);
  };

  const handleOk1 = () => {
      setOpen(false);

  };

  const handleCancel1 = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  
  const showModal2 = () => {
    setIsModalOpen(true);
  };

  const handleOk2 = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <Col className='gutter-row' xxl={4} xl={6} lg={6} md={8} sm={12} xs={12} style={{marginBottom: "30px", marginTop:"30px"}}>
        <div className={style.wrap}>
            <div className={style.imageWrap}>
           <Image src={require("../../../assets/image/idcard.png")} className={style.img}/> 
        </div>
        
        <div className={`${style.item} ${style.name}`}>
            <span className={style.title}>CCCD VN: </span>
            <span className={style.value}>Folder VN</span>
        </div>
        <div className={style.item}>
            <span className={style.title}>Giá: </span>
            <span className={style.value}>{formatCurrency(100000)} {" "} VNĐ</span>
        </div>
        <div className={style.item}>
            <span className={style.title}>Số lượng: </span>
            <span className={style.value}>40</span>
        </div>
        <div className={style.btn} onClick={showModal1}>Xem</div>
        </div>
        
    </Col>
    <Modal
        title="Chi tiết thư mục"
        open={open}
        onOk={handleOk1}
        onCancel={handleCancel1}
        cancelText={"Huỷ"}
        okText={(<span onClick={showModal2}>Mua ngay</span>)}
        className={style.modalFolder}
      >
        <Image.PreviewGroup
            preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
        >
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
            <Image
            width={100}
            src={require("../../../assets/image/idcard.png")}
            className={style.imgGroup}
            />

        </Image.PreviewGroup>
      </Modal>
      <Modal 
        title="Xác nhận mua hàng" 
        open={isModalOpen} onOk={handleOk2} 
        onCancel={handleCancel2}
        okText={(<span>Đồng ý</span>)}
      >
        <div className={style.confirm}>
            <div className={style.confirmItem}>
            <div className={style.confirmTitle}>Chuyên mục:</div>
            <div className={style.confirmValue}>CCCD VN</div>
        </div>
        <div className={style.confirmItem}>
            <div className={style.confirmTitle}>Thư mục:</div>
            <div className={style.confirmValue}>Folder 1</div>
        </div>
        <div className={style.confirmItem}>
            <div className={style.confirmTitle}>Số lượng:</div>
            <div className={style.confirmValue}>40</div>
        </div>
        <div className={style.confirmItem}>
            <div className={style.confirmTitle}>Giá:</div>
            <div className={style.confirmValue}>{formatCurrency(1000000)} {" "} VNĐ</div>
        </div>
        <div className={style.confirmItem}>
            Bạn có muốn mua sản phẩm này ?
        </div>
        </div>
        
      </Modal>
    </>
    
  )
}
