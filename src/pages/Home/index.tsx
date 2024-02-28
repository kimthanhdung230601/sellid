import { Col, Row } from 'antd'
import React from 'react'
import Header from '../../components/user/Header'
import Product from '../../components/user/Product'
import style from "./Home.module.scss"
export default function Home() {
  return (
    <div className={style.wrap}>
      <Header />
      <div className={style.container}>
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
      </div>
      
    </div>
  )
}
