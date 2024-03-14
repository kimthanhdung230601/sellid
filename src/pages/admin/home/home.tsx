import {
  Button,
  Input,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import styles from "./styles.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input/Search";
import { useQuery } from "react-query";
import {
  getCategories,
  getListProduct,
  getListProductNoCate,
} from "../../../api/admin";
import { useState } from "react";
import { useNavigate } from "react-router";

const { Search } = Input;
interface HomeProps {}
interface DataType {
  key: string;
  nameFolder: string;
  amount: number;
  category: string;
  price: number;
  sell: string;
}

const HomeAdmin = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("1");
  const [categorySelected, setCategorySelect] = useState();
  const { data: product, refetch } = useQuery(
    ["product", categorySelected],
    () => {
      if (categorySelected == undefined) {
        return getListProductNoCate(page);
      } else return getListProduct(page, categorySelected);
    }
  );
  const { data: categories } = useQuery("categories", () => getCategories());
  const categoriesMap = categories?.data.map((item: any) => ({
    value: item.id,
    text: item.name,
  }));
  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
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
      filters: categoriesMap,
      onFilter: (value: any, record) => {
        // setCategorySelect(value);
        // refetch();
        return record.category.startsWith(value);
      },
      render: (text: any) => {
        const foundCategory = categories?.data.find(
          (item: any) => item.id === text
        );
        return <>{foundCategory ? foundCategory.name : text}</>;
      },
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
      dataIndex: "sell",
      key: "sell",
      render: (text, record) => (
        <span style={{ color: record.sell === "0" ? "#1677ff" : "red" }}>
          {text === "0" ? <p>Chưa bán</p> : <p>Đã bán</p>}
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
              backgroundColor: record.sell === "1" ? "#C6C6C6" : "#1677FF",
              color: "#FFFF",
            }}
            disabled={record.sell === "1"}
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

  const onChange: PaginationProps["onChange"] = (page: any) => {
    // console.log(page);
    setPage(page);
    refetch();
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
          {product?.status === "failed" ? (
            <>
              {" "}
              <Table
                columns={columns}
                dataSource={[]}
                style={{ overflowX: "auto" }}
                pagination={{
                  defaultCurrent: 1,
                  onChange: onChange,
                }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
