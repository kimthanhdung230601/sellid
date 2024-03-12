import { Button, Col, Form, Input, Row } from "antd";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import { useQuery } from "react-query";
import { getCategories } from "../../../api/admin";
interface ProfileProps {}

const Profile = () => {
  const onFinish = (value: any) => {
    console.log(value);
  };
  const [form] = useForm();
  return (
    <>
      <h1 className={styles.title}>QUẢN LÝ</h1>
      <div className={styles.profileWrap}>
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          //   style={{ maxWidth:300 }}
          layout="vertical"
          //   size="middle"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              {" "}
              <Form.Item
                name="name"
                label="Họ tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              {" "}
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="bank"
                label="Ngân hàng"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              {" "}
              <Form.Item
                name="idNumber"
                label="Số tài khoản"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.btn}>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Profile;
