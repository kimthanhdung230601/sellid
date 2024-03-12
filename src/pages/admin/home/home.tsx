import { Button, Input, PaginationProps, Space, Table, TableProps } from "antd";
import styles from "./styles.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input/Search";
import { useQuery } from "react-query";
import { getListProduct } from "../../../api/admin";
import { useState } from "react";
import { useNavigate } from "react-router";

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

const HomeAdmin = () => {
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["product"], () => getListProduct(1));
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên folder",
      dataIndex: "namefolder",
      key: "namefolder",
    },
    {
      title: "Chuyên mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = (page: any) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <>
      <div className={styles.wrapSearch}>
        <div className={styles.input}>
          <Search
            placeholder="Tìm kiếm tại đây"
            onSearch={onSearch}
            size="large"
          />
        </div>
      </div>
      <div className={styles.tablWrap}>
        <div className={styles.btn}>
          <Button type="primary" onClick={() => navigate("./product")}>
            Thêm mới
          </Button>
        </div>
        <div className={styles.table}>
          {" "}
          <Table
            columns={columns}
            dataSource={product?.data}
            style={{ overflowX: "auto" }}
            pagination={{
              defaultCurrent: 1,
              onChange: onChange,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
