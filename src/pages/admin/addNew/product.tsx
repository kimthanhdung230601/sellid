import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Modal,
  Select,
  message,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getCategories, postAddProduct } from "../../../api/admin";
import TextArea from "antd/es/input/TextArea";
import CryptoJS from "crypto-js";
import { MD5 } from "crypto-js";

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
  document.title = "Thêm mới";
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

    // Tách phần tên và phần đuôi của tệp
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop(); // Lấy phần đuôi của tệp
    const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join("."); // Lấy phần tên của tệp

    // Mã hóa phần tên của tệp bằng MD5
    const hashedFileName = CryptoJS.MD5(fileNameWithoutExtension).toString();

    // Tạo tên mới bằng cách ghép phần tên đã mã hóa và phần đuôi
    const newFileName = `${hashedFileName}.${fileExtension}`;

    setPreviewTitle(newFileName);
  };

  const handleChange = (info: any) => {
    let fileList = [...info.fileList];

    setFileList(fileList);
  };
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(postAddProduct, {
    onSuccess: () => {
      message.success("Thêm thành công");
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      // Xử lý lỗi nếu cần
    },
  });

  // ------------------------onFinish------------------------------
  const onFinish = async (value: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("namefolder", value.namefolder);
    formData.append("category", value.category);
    formData.append("price", value.price);
    formData.append("description", value.description);

    fileList.forEach((file, index) => {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop();
      const fileNameWithoutExtension = fileName
        .split(".")
        .slice(0, -1)
        .join(".");
      const hashedFileName = CryptoJS.MD5(fileNameWithoutExtension).toString();
      const newFileName = `${hashedFileName}.${fileExtension}`;

      // Tạo một đối tượng File mới với tên tệp đã thay đổi
      const newFile = new File([file.originFileObj as Blob], newFileName, {
        type: file.type,
      });
      formData.append(`images[${index}]`, newFile);
    });

    mutation.mutate(formData);
  };
  // const onFinish = async (value: any) => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("namefolder", value.namefolder);
  //   formData.append("category", value.category);
  //   formData.append("price", value.price);
  //   formData.append("description", value.description);

  //   fileList.forEach((file, index) => {
  //     formData.append(`images[${index}]`, file.originFileObj as File);
  //   });
  //   mutation.mutate(formData);
  // };
  // ----------------------reset-------------------------------
  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const validatePrice = (rule: any, value: number, callback: Function) => {
    if (value < 0) {
      callback("Giá tiền phải lớn hơn hoặc bằng 0");
    } else {
      callback();
    }
  };
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
                rules={[
                  { required: true, message: "Vui lòng điền giá" },
                  { validator: validatePrice },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
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
            >
              <Upload
                multiple
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
            {" "}
            <Button className={styles.btn} htmlType="button" onClick={onReset}>
              Hoàn tác
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btn}
              loading={loading}
            >
              Đăng ảnh
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Product;
