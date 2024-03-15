import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./styles.module.scss";
import { signUp } from "../../../api/admin";
import { useNavigate } from "react-router";
interface RegisterProps {}

const Register = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const onFinish = async (value: any) => {
    try {
      const payload = value;
      const res = await signUp(payload);
      if(res.status == "success") navigate("/");
      message.success(res.data);
    } catch (error) {}

    // if (res.status === "success") navigate("/dang-nhap");
  };
  const validatePassword = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Mật khẩu không khớp!"));
    },
  });

  return (
    <>
      <>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(?:\+84|0)(?:\d{9,10})$/,
                message: "Định dạng số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              { required: true, message: "Vui lòng nhập họ tên đầy đủ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gmail"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập gmail đầy đủ!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Gmail không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              validatePassword, // Adding the custom validator
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button className={styles.btn} htmlType="submit" type="primary">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </>
    </>
  );
};

export default Register;
