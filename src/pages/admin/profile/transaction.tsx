import { Pagination, PaginationProps, Table, TableColumnsType } from "antd";
import styles from "./styles.module.scss";
import { useQuery } from "react-query";
import { getTransaction } from "../../../api/admin";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../until/until";
interface TransactionProps {
  id: any;
  username: any;
  nameproduct: any;
  time: Date;
  price: 0;
}

const Transaction = () => {
  const [pagination, setPagination] = useState(1);
  const columns: TableColumnsType<TransactionProps> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => (pagination - 1) * 10 + index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số tiền",
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (text: any) => <div style={{ color: "#008000" }}>{formatCurrency(text)}</div>,
    },
    {
      title: "Folder",
      dataIndex: "nameproduct",
      key: "nameproduct",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 180,
    },
  ];
  const { data: transaction, refetch } = useQuery(["Transaction"], () =>
    getTransaction(pagination)
  );
  const onChange = (page: any) => {
    setPagination(page);
  };
  useEffect(() => {
    refetch();
  }, [pagination, transaction?.total_products]);
  return (
    <>
      {" "}
      <h3 className={styles.title}>Lịch sử mua hàng</h3>
      <Table
        dataSource={transaction?.data}
        columns={columns}
        style={{ overflowX: "auto" }}
        pagination={false}
        bordered 
      />
      <Pagination
        defaultCurrent={1}
        onChange={onChange}
        total={transaction?.total_products}
        style={{ margin: "1vh 0", float: "right" }}
      />
    </>
  );
};

export default Transaction;
