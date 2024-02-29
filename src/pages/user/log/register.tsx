import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./styles.module.scss"
interface RegisterProps {}

const Register = () => {
    const [form] = useForm();
    const onFinish = (value: any) => {
      console.log("value", value);
    };
  return <>
      <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^(?:\+84|0)(?:\d{9,10})$/,
              message: "Định dạng số điện thoại không hợp lệ!"
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button className={styles.btn} htmlType="submit" type="primary">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </></>;
};

export default Register;
