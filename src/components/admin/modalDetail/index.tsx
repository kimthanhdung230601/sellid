import React, { useState } from "react";
import { Button, Image, Modal } from "antd";
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
      >
        <div>
          <Image.PreviewGroup>
            {image
              ?.split("|")
              .filter(Boolean)
              .map((imageUrl: string, index: number) => (
                <Image
                  key={index}
                  src={"https://taphoahinh.com/PHP_IMG/" + imageUrl.trim()}
                  alt={`Image`}
                  style={{ height: 120, width: 200,margin:"0 10px 10px 0px", objectFit: "cover" }}
                />
              ))}
          </Image.PreviewGroup>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailProducts;
