import { Button, Input, Space, Table, TableProps } from "antd";
import styles from "./styles.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input/Search";

const { Search } = Input;
interface HomeProps {}
interface DataType {
  key: string;
  nameFolder: string;
  amount: number;
  categories: string;
  price: number;
  state: string;
}

const Home = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên folder",
      dataIndex: "nameFolder",
      key: "nameFolder",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Chuyên mục",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tình trạng",
      dataIndex: "state",
      key: "state",
      render: (text, record) => (
        <span style={{ color: record.state === "Đã bán" ? "red" : "#1677ff" }}>
          {text}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button
            style={{
              backgroundColor:
                record.state === "Đã bán" ? "#C6C6C6" : "#1677FF",
              color: "#FFFF",
            }}
          >
            Sửa
          </Button>
          <Button type="primary" danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      nameFolder: "John Brown",
      amount: 32,
      categories: "CCCD Việt Nam",
      price: 100000,
      state: "Chưa bán",
    },
    {
      key: "2",
      nameFolder: "John Brown",
      amount: 32,
      categories: "CCCD Thái",
      price: 100000,
      state: "Đã bán",
    },
    {
      key: "3",
      nameFolder: "John Brown",
      amount: 32,
      categories: "CCCD Lào",
      price: 100000,
      state: "Đã bán",
    },
  ];
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <>
      <div className={styles.wrapSearch}>
        <div className={styles.input}>
          <Search placeholder="Tìm kiếm tại đây" onSearch={onSearch}  size="large"/>
        </div>
      </div>
      <div className={styles.tablWrap}>
        <div className={styles.btn}>
          <Button type="primary">Thêm mới</Button>
        </div>
        <div className={styles.table}>
          {" "}
          <Table columns={columns} dataSource={data} style={{ overflowX: "auto" }} />
        </div>
      </div>
    </>
  );
};

export default Home;
