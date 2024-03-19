import { Col, Pagination, Row, Spin, CollapseProps, Collapse   } from 'antd'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllProduct, getCategory, IProduct } from '../../../api/ApiUser'
import { WarningFilled} from "@ant-design/icons"
import Header from '../../../components/user/Header'
import Product from '../../../components/user/Product'
import style from "./Home.module.scss"
import { useMediaQuery } from 'react-responsive'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
const secretKey = process.env.REACT_APP_SECRET_KEY as string
const decrypt = (value: string) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
export default function Home() {
  document.title = "Tạp hoá hình"
  const navigate = useNavigate();
  const param = useParams()
  const page = new URLSearchParams(useLocation().search)
  const location = useLocation()
  const isSmallScreen = useMediaQuery({ maxWidth: 992 });
  const [money, setMoney] = useState(0)
  const [reload, setReload] = useState(localStorage.getItem("reload"));
  const [currentPage, setCurrentPage] = useState(page.get('page') || "1")
  const [idCategory, setIdCategory] = useState(param.id || "all")
  const {data: category} = useQuery(['category'], ()=> getCategory())
  const {data: product, isFetching} = useQuery(['product', idCategory, currentPage], ()=> getAllProduct(currentPage, idCategory))
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <div className={style.filter}>Lọc chuyên mục</div>,
      children: (
        <>
        <div className={style.category}>
          <span className={ JSON.stringify(param) === "{}" ? ` ${style.categoryActive}` : `${style.categoryName}`} onClick={() => handleSelected("all", "all")}>Tất cả</span>
        </div>
        <div className={style.filterWrap}>
            {
              category?.data.map((item : any, index: number) => {
                
                return (
                  <div className={style.category} key={item.id}>
                    <span className={param.id === item.id && JSON.stringify(param) !== "{}"  ? ` ${style.categoryActive}` : `${style.categoryName}`} onClick={() => handleSelected(item.name, item.id)}>{item.name}</span>
                  </div>
                )
              })
            }
        </div>
        </>
        
      ),
    },
  ]
  const handlePageChange =(pageChange: number) => {
    setCurrentPage(pageChange.toString())
    page.set('page', pageChange.toString())
    const newPage = page.get("page");
    navigate(location.pathname + (newPage ? `?page=${newPage}` : ''))
  }
  const handleSelected = (name: string, id:string) => {
    setIdCategory(id)
    setCurrentPage("1")
    if(name === "all") navigate(`/?page=1`);
    else navigate(`/category/${id}/${name}?page=1`);
  }
  const setPrevPage = () => {
    const newPage = parseInt(currentPage, 10) - 1
    setCurrentPage(newPage.toString())
    navigate(location.pathname + (newPage ? `?page=${newPage}` : ''))
  }
  useEffect(() => {
    window.addEventListener('storage', () => {
      const theme = localStorage.getItem('reload')

      setReload(theme);
    })
    if (reload === "true") {

      const money = Cookies.get("money") || ""
      setMoney(parseInt(decrypt(money), 10) )
      window.location.reload();
      localStorage.setItem("reload", "false");
      setReload("false"); 
    }
    const money = Cookies.get("money") || ""
      setMoney(parseInt(decrypt(money), 10) )
   
  }, [reload, money]);
  return ( 
    <div className={style.wrap}>
      <Header />
      <div className={style.container}>
        <Row gutter={40} justify="space-between" style={{flex: "1"}}>
          <Col xxl={4} xl={6} lg={6} md={24} sm={24} xs={24}>
            <Collapse defaultActiveKey={ isSmallScreen ? [''] : ['1']} ghost items={items} className={style.collapse}/> 
          </Col>
          <Col xxl={20} xl={18} lg={18} md={24} sm={24} xs={24}>
            <div className={style.row}>
            <Row gutter={isSmallScreen ? 16 : 34} justify="start" className={style.row}>
              { 
              isFetching ? 
              <div className={style.noti}>
                <Spin  size="large"/>
              </div>
               : (
               product?.status === "success" ?
                product?.data.map((item: IProduct, index: number) => {
                  return (
                    <Product 
                    id={item.id}
                    namefolder= {item.namefolder}
                    category={param?.category || item.category}
                    price={item.price}
                    description={item.description}
                    total_products = {product?.data.length}
                    setCurrentPage={setPrevPage}
                    currentPage={parseInt(currentPage, 10)}
                />
                  )
                })
                :
                <div className={style.noti}>
                    <WarningFilled style={{fontSize: "30px", color: "#167fff"}}/>
                    <div className={style.notiText}>Sản phẩm trong chuyên mục này đã bán hết</div>
                </div>
              )
              }
            </Row>
            {isFetching ? null : (
              product?.status === "success" ? 
              <div style={{textAlign: "center", marginTop: "20px"}}>
                <Pagination  pageSize={12} defaultCurrent={parseInt(currentPage, 10)} total={product?.total_products} onChange={handlePageChange} /> 
              </div>
              : null
            )
            }
            </div>
        </Col>
        </Row>
      </div>
      <div className={style.footerWrap}>
        <div className={style.imgWrapper}>
          <img
            className={style.imgLogoFooter}
            src={require("../../../assets/image/logoFooter.png")}
          />
        </div>

        <div className={style.iconWrap}>
          <li>
            <span className={style.iconItem}>Facebook: </span>
            <a
              className={style.text}
              href="https://www.facebook.com/DamXuanNinh"
            >
              <span className={style.text}>Đàm Xuân Ninh</span>
            </a>
          </li>
          <li>
            <div className={style.iconItem}>
              Số điện thoại liên hệ:{" "}
              <span className={style.text}>0978131878</span>
            </div>
          </li>
          <li className={style.copyRight}>
            Copyright © 2024 -<b> ChippiSoft </b>- Thiết kế phần mềm/Web/App theo yêu cầu.
          </li>
        </div>
      </div>
    </div>
  )
}


