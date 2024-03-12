import { PaginationProps, Table, TableColumnsType } from "antd";
import styles from "./styles.module.scss";
import { useQuery } from "react-query";
import { getTransaction } from "../../../api/admin";
import { useEffect, useState } from "react";
interface TransactionProps {
  id: any;
  username: any;
  nameproduct: any;
  time: Date;
  price: 0;
}
const columns: TableColumnsType<TransactionProps> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Họ tên",
    dataIndex: "username",
    key: "username",
  },
  { title: "Số tiền", dataIndex: "price", key: "price", width: 100 },
  {
    title: "Folder",
    dataIndex: "nameproduct",
    key: "nameproduct",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    width: 170,
  },
];
const Transaction = () => {
  const [pagination, setPagination] = useState("1");

  const { data: transaction, refetch } = useQuery(["Transaction"], () =>
    getTransaction(pagination)
  );
  const onChange: PaginationProps["onChange"] = (page: any) => {
    console.log(page);
    setPagination(page);
    refetch();
  };
  return (
    <>
      {" "}
      <h3 className={styles.title}>Lịch sử mua hàng</h3>
      <Table
        dataSource={transaction?.data}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          onChange: onChange,
        }}
      />
      
    </>
  );
};

export default Transaction;
