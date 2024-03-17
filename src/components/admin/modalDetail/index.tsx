import React, { useState } from "react";
import { Button, Image, Modal, Spin } from "antd";
import styles from "./styles.module.scss";

interface modalProp {
  isModalOpen: any;
  handleOk: () => void;
  handleCancel: () => void;
  image: any;
}
const ModalDetailProducts = ({
  isModalOpen,
  handleCancel,
  handleOk,
  image,
}: modalProp) => {
  return (
    <>
      <Modal
        title="Thông tin ảnh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        confirmLoading={image}
      >
        <div className={styles.wrapper}>
          <Image.PreviewGroup>
            <div className={styles.imageContainer}>
              {image
                ?.split("|")
                .filter(Boolean)
                .map((imageUrl: string, index: number) => (
                  <div className={styles.imageWrapper} key={index}>
                    <Image
                      src={`https://taphoahinh.com/PHP_IMG/${imageUrl.trim()}`}
                      alt={`Image`}
                      style={{ height: 120, width: 200, objectFit: "cover"}}
                    />
                  </div>
                ))}
            </div>
          </Image.PreviewGroup>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailProducts;
