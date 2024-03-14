import { Col, Image, Modal, message } from 'antd'
import React, {useEffect, useState} from 'react'
import style from "./Product.module.scss"
import { formatCurrency } from '../../../constant/currencyFormatter'
import { buy, IProduct } from '../../../api/ApiUser'
import { useMutation, useQueryClient } from 'react-query'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import JSZip from 'jszip';

export default function Product(
  {id, image, namefolder, category, price, description, total_products, setCurrentPage, currentPage }
  :{id:number, image:string, namefolder:string, category:string, price:number, description:string , total_products: number, setCurrentPage: any, currentPage: number}) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState(0);
  const buyProduct = useMutation(
    async (payload: any) => await buy(payload),
    {
      onSettled: async (data: any) => {
        if(data.status === "success") {
          handleDownload(data.data[0].image)
          message.success("Mua thành công! Thư mục sẽ được tải xuống trong giây lát!")
          setTimeout(()=> {
            if(total_products === 1 && currentPage !== 1) {
              setCurrentPage(1)
            } else {
              queryClient.invalidateQueries('product')
            } 
          }, 2000)
          
          
        } else if(data.status === "failed") {

          message.error("Có lỗi xảy ra, vui lòng thử lại sau")
        }
      }
    }
  )
  const handleDownload = async (imageUrls: string) => {
    console.log(imageUrls)
    if (!imageUrls) {
      message.error("Có lỗi xảy ra!")
      return;
    }

    const urls = imageUrls.split('|').filter(url => url.trim() !== '');
    if (urls.length === 0) {
      message.error("Có lỗi xảy ra!")
      return;
    }
    const zip = new JSZip();
    const promises: Promise<void>[] = [];
    urls.forEach((url, index) => {
      const imageURL = `https://taphoahinh.com/PHP_IMG/${url}`
      promises.push(
        fetch(imageURL)
          .then(response => {
            if (!response.ok) {
              message.error("Có lỗi xảy ra!")
            }
            return response.blob();
          })
          .then(blob => {
            zip.file(`${namefolder}_image_${index + 1}.png`, blob);
          })
          .catch(error => {
            message.error("Có lỗi xảy ra!")
          })
      );
    });
    Promise.all(promises)
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then((zipBlob: any) => {
          const zipUrl = URL.createObjectURL(zipBlob);
          const link = document.createElement('a');
          link.href = zipUrl;
          link.download = `${namefolder}.zip`;
          document.body.appendChild(link);
          link.click();
          // message.success('Tải ảnh thành công');
          URL.revokeObjectURL(zipUrl);
        });
      })
      .catch(error => {
        message.error("Có lỗi xảy ra!")
      });
  };

  const showModal1 = () => {
    setOpen(true);
  };
  const handleOk1 = () => {
    if(Cookies.get("money")) {
      if(money >= price) {
        setIsModalOpen(true)
      } else {
        message.error("Tài khoản của bạn không đủ, vui lòng kiểm tra lại")
      }
    } else {
      message.info("Vui lòng đăng nhập để tiếp tục")
      setTimeout(()=> {
          navigate('/dang-nhap')
      },3000)
    }
      setOpen(false);
  };
  const handleCancel1 = () => {
    setOpen(false);
  };
  const handleOk2 = () => {
    buyProduct.mutate({
      idproduct: id
    })
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    const money = Cookies.get("money")
    if(money) setMoney(parseInt(money, 10) )
  },[])
  return (
    <div key={id}>
    <Col xxl={5} xl={6} lg={6} md={8} sm={12} xs={12} className={`${style.wrap} gutter-row`}>
        <div >
            <div className={style.imageWrap}>
           <Image src={require("../../../assets/image/idcard.png")} preview={false} className={style.img}/> 
        </div>
        
        <div className={`${style.item} ${style.name}`}>
            <span className={style.title}>Thư mục: </span>
            <span className={style.value}>{namefolder}</span>
        </div>
        {/* <div className={style.item}>
            <span className={style.title}>Chuyên mục: </span>
            <span className={style.value}>{category}</span>
        </div> */}
        <div className={style.item}>
            <span className={style.title}>Giá: </span>
            <span className={style.value}>{formatCurrency(price)} {" "} VNĐ</span>
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
        okText={(<span>Mua ngay</span>)}
        className={style.modalFolder}
        // okButtonProps={ money >= price && Cookies.get("admin") ? {disabled: false} : {disabled: true} }
        
      >
        <div className={style.confirm}>
          <div className={style.confirmItem}>
              <div className={style.confirmTitle}>Chuyên mục:</div>
              <div className={style.confirmValue}>{category}</div>
          </div>
          <div className={style.confirmItem}>
              <div className={style.confirmTitle}>Thư mục:</div>
              <div className={style.confirmValue}>{namefolder}</div>
          </div>
          <div className={style.confirmItem}>
              <div className={style.confirmTitle}>Mô tả:</div>
              <div className={style.confirmValue}>{description}</div>
          </div>
          <div className={style.confirmItem}>
              <div className={style.confirmTitle}>Giá:</div>
              <div className={style.confirmValue}>{formatCurrency(price)} {" "} VNĐ</div>
          </div>
          
        </div>
        {/* <Image.PreviewGroup
            preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
        >
            <Image width={100} src={require("../../../assets/image/idcard.png")}  className={style.imgGroup}/>
        </Image.PreviewGroup> */}
      </Modal>
      <Modal 
        title="Xác nhận mua hàng" 
        open={isModalOpen} onOk={handleOk2} 
        onCancel={handleCancel2}
        okText={(<span>Đồng ý</span>)}
        
      >
        <div className={style.confirmItem}>
            Bạn có muốn mua sản phẩm này ?
        </div>
      </Modal>
  
    </div>
    
  )
}
