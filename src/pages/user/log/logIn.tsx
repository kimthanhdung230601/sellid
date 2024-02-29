import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./styles.module.scss"
interface LogInComponentProps {}

const LogInComponent = () => {
  const [form] = useForm();
  const onFinish = (value: any) => {
    console.log("value", value);
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Tên đăng nhập"
          name="userName"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button className={styles.btn} htmlType="submit" type="primary">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogInComponent;
