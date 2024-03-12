import { Button, Input, PaginationProps, Space, Table, TableProps } from "antd";
import styles from "./styles.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input/Search";
import { useQuery } from "react-query";
import { getListProduct, getListUser } from "../../../api/admin";
import { useState } from "react";
import Cookies from "js-cookie";

const { Search } = Input;
interface HomeProps {}
interface DataType {
  key: string;
  namefolder: string;
  username: number;
  fullname: string;
  phone: number;
  gmail: string;
  active: string;
}

const UserAdmin = () => {
  const {
    data: userList,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["userList"], () => getListUser());
  console.log(Cookies.get("token"));

  console.log("userList", userList);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    // {
    //   title: "Mật khẩu",
    //   dataIndex: "password",
    //   key: "password",
    // },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gmail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tình trạng HD",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <span style={{ color: record.active === "0" ? "red" : "#1677ff" }}>
          {text === "0" ? "Dừng HD" : "Đang HD"}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      render: (text, record: any) => (
        <Space size="middle">
          {record.active === "0" ? (
            <></>
          ) : (
            <>
              <Button type="primary" danger>
                Ban TK
              </Button>
            </>
          )}
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
        <div className={styles.table}>
          {" "}
          <Table
            columns={columns}
            dataSource={userList?.data}
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

export default UserAdmin;
