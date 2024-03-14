import { Button, Col, Form, Input, Row, Upload, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCategories, postAddProduct } from "../../../api/admin";
import TextArea from "antd/es/input/TextArea";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ProductProps {}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Product = () => {
  const { data: categories } = useQuery("categories", () => getCategories());
  const antdOptions = categories?.data.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  // ------------------------onFinish------------------------------
  const onFinish = async (value: any) => {
    console.log("value", value);

    try {
      const formData = new FormData();
      formData.append("namefolder", value.namefolder);
      formData.append("category", value.category);
      formData.append("price", value.price);
      formData.append("description", value.description);

      fileList.forEach((file, index) => {
        formData.append(`images[${index}]`, file.originFileObj as File);
      });

      // console.log("formData", formData);
      const res = await postAddProduct(formData);
      alert("Tải folder lên thành công");
      // console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <h1 className={styles.title}>THÊM FOLDER</h1>
      <div className={styles.formWrap}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên folder"
                name="namefolder"
                rules={[
                  { required: true, message: "Vui lòng điền tên folder" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Chuyên mục"
                name="category"
                rules={[
                  { required: true, message: "Vui lòng điền chuyên mục" },
                ]}
              >
                <Select options={antdOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: "Vui lòng điền giá" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng điền mô tả" }]}
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
              label="Tải ảnh lên tại đây"
              valuePropName="fileList"
              name="image[]"
              //  getValueFromEvent={normFile}
            >
              <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </Row>{" "}
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.btn}>
              Đăng tin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Product;
