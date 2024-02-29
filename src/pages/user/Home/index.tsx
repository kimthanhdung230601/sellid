import { Col, Row } from 'antd'
import React from 'react'
import Header from '../../../components/user/Header'
import Product from '../../../components/user/Product'
import style from "./Home.module.scss"
export default function Home() {
  return (
    <div className={style.wrap}>
      <Header />
      <div className={style.container}>
        <Row gutter={30}>
          <Col xxl={4} xl={4} lg={24} md={24} sm={24} xs={24}>
            <div className={style.filter}>Lọc chuyên mục</div>
            <div className={style.category}>
              <span className={style.categoryName}>Tất cả</span>
                 
            </div>
            <div className={style.category}>
              <span className={style.categoryName}>Việt Nam</span>
            </div>
            <div className={style.category}>
              <span className={style.categoryName}>Indo</span>
            </div>
            <div className={style.category}>
              <span className={style.categoryName}>Thái Lan</span>
            </div>
            <div className={style.category}>
              <span className={style.categoryName}>Việt Nam</span>
            </div>
          </Col>
          <Col xxl={20} xl={20} lg={24} md={24} sm={24} xs={24}>
            <Row gutter={50} justify="center" className={style.row}>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
          </Row>
      </Col>

        </Row>
        
      </div>
      
    </div>
  )
}
