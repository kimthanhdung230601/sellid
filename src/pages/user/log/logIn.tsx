import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router";
import { logIn } from "../../../api/admin";
import Cookies from "js-cookie";
interface LogInComponentProps {}

const LogInComponent = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (value: any) => {
    // console.log("value", value);
    try {
      const payload = {
        username: value.username,
        password: value.password,
      };
      const res = await logIn(payload);

      if (res.status == "success") {
        if (res.isAdmin === "1") navigate("/admin");
        else navigate("/");
        Cookies.set("token", res.jwt);
        Cookies.set("username", res.username);
        Cookies.set("id", res.id);
        Cookies.set("admin", res.isAdmin);
        Cookies.set("fullname", res.fullname);
        Cookies.set("phone", res.phone);
        Cookies.set("active", res.active);
        Cookies.set("total_money", res.total_money);
        Cookies.set("money",res.money);
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
