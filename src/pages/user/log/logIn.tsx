import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router";
import { logIn } from "../../../api/admin";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

interface LogInComponentProps {}

const LogInComponent = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (value: any) => {
    try {
      const payload = {
        username: value.username,
        password: value.password,
      };
      const res = await logIn(payload);
      const username = CryptoJS.AES.encrypt(
        res?.info_user[0].username,
        secretKey
      ).toString();

      const fullname = CryptoJS.AES.encrypt(
        res.info_user[0].fullname,
        secretKey
      ).toString();
      const phone = CryptoJS.AES.encrypt(
        res.info_user[0].phone,
        secretKey
      ).toString();
      const money = CryptoJS.AES.encrypt(
        res.info_user[0].money,
        secretKey
      ).toString();

      if (res.status == "success") {
        if (res.isAdmin === "1") navigate("/admin");
        else navigate("/");
        Cookies.set("token", res.jwt);
        Cookies.set("username", username);
        Cookies.set("fullname", fullname);
        Cookies.set("phone", phone);
        Cookies.set("money", money);
        Cookies.set("isAdmin", res.isAdmin);
      } else alert(res.data);
    } catch (error: any) {
      alert("Đăng nhập thất bại");
      console.log("error", error);
    }
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish} size="large">
        <Form.Item
          label="Tên đăng nhập"
          name="username"
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
