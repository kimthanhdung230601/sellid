import styles from "./styles.module.scss";
import Bank from "./bank";
import Transaction from "./transaction";
interface ProfileProps {}

const Profile = () => {
  document.title = "Quản lý"
  return (
    <>
      <h1 className={styles.title}>QUẢN LÝ</h1>
      {/* <h3 className={styles.title}>Tài khoản cá nhân</h3> */}
      {/* <div className={styles.profileWrap}>
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
      </div> */}
      <div className={styles.bankWrapper}>
        <Bank />
      </div>
      <div className={styles.transactionWrapper}>
        <Transaction />
      </div>
    </>
  );
};

export default Profile;
