import { Col, Pagination, Row, Spin, CollapseProps, Collapse   } from 'antd'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllProduct, getCategory, IProduct } from '../../../api/ApiUser'
import {FrownOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons"
import Header from '../../../components/user/Header'
import Product from '../../../components/user/Product'
import style from "./Home.module.scss"
import { useMediaQuery } from 'react-responsive'
import Cookies from 'js-cookie'

export default function Home() {
  document.title = "Tạp hoá hình"
  const navigate = useNavigate();
  const param = useParams()
  const isSmallScreen = useMediaQuery({ maxWidth: 992 });
  const [reload, setReload] = useState(localStorage.getItem("reload"));
  const [currentPage, setCurrentPage] = useState(1)
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
          <span className={ JSON.stringify(param) === "{}" ? `${style.categoryName} ${style.categoryActive}` : `${style.categoryName}`} onClick={() => handleSelected("all", "all")}>Tất cả</span>
        </div>
        <div className={style.filterWrap}>
            {
              category?.data.map((item : any, index: number) => {
                
                return (
                  <div className={style.category} key={item.id}>
                    <span className={param.id === item.id && JSON.stringify(param) !== "{}"  ? `${style.categoryName} ${style.categoryActive}` : `${style.categoryName}`} onClick={() => handleSelected(item.name, item.id)}>{item.name}</span>
                  </div>
                )
              })
            }
        </div>
        </>
        
      ),
    },
  ]
  const handlePageChange =(page: number) => {
    setCurrentPage(page)
  }
  const handleSelected = (name: string, id:string) => {
    setIdCategory(id)
    setCurrentPage(1)
    if(name === "all") navigate(`/`);
    else navigate(`/category/${id}/${name}`);
  }
  useEffect(() => {
    window.addEventListener('storage', () => {
      const theme = localStorage.getItem('reload')
      setReload(theme);
    })
    if (reload === "true") {
      window.location.reload();
      localStorage.setItem("reload", "false");
      setReload("false"); 
    }
  }, [reload]);
  return ( 
    <div className={style.wrap}>
      <Header />
      <div className={style.container}>
        <Row gutter={40}>
          <Col xxl={4} xl={4} lg={24} md={24} sm={24} xs={24}>
          <Collapse defaultActiveKey={ isSmallScreen ? [''] : ['1']} ghost items={items} className={style.collapse}/>
            
          </Col>
          <Col xxl={20} xl={20} lg={24} md={24} sm={24} xs={24}>
            <Row gutter={50} justify="center" className={style.row}>
              { 
              Cookies.get("token") ?
              isFetching ? 
              <Spin  size="large"/> : (
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
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                  )
                })
                :
                <div style={{textAlign: "center", paddingTop: "20px", paddingBottom: "20px"}}>
                    <FrownOutlined style={{fontSize: "20px"}}/>
                    <div style={{fontSize: "20px", marginTop: "20px"}}>Sản phẩm trong chuyên mục này đã bán hết</div>
                </div>
              )
              :
              <div style={{textAlign: "center", paddingTop: "20px", paddingBottom: "20px"}}>
                    <FrownOutlined style={{fontSize: "20px"}}/>
                    <div style={{fontSize: "20px", marginTop: "20px"}}>Bạn cần đăng nhập để xem sản phẩm</div>
                </div>
              }
          </Row>
          {isFetching ? null : (
            product?.status === "success" ? 
            <Pagination style={{textAlign: "center"}} pageSize={10} defaultCurrent={currentPage} total={product?.total_products} onChange={handlePageChange} /> 
            : null
          )
          }
          
      </Col>

        </Row>
        
      </div>
      
    </div>
  )
}

const customExpandIcon = (panelProps: any) => {
  const { isActive } = panelProps;
  return isActive ? <MinusOutlined /> : <PlusOutlined />;
};
