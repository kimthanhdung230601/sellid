import { useQuery } from "react-query";
import styles from "./styles.module.scss";
import { getListBank } from "../../../api/admin";
import { Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
interface BankProps {
  id: any;
  tid: any;
  description: any;
  amount: any;
  time: Date;
  username: string;
}

const Bank = () => {
  const [pagination, setPagination] = useState("1");
  const { data: listBanks, refetch } = useQuery(["listBank"], () =>
    getListBank()
  );
  const onChange = (page: any) => {
    setPagination(page);
  };
  const columns: TableColumnsType<BankProps> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "username",
      key: "username",
    },
    { title: "Số lượng", dataIndex: "amount", key: "amount", width: 100 },
    {
      title: "Mã giao dịch",
      dataIndex: "tid",
      key: "tid",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 120,
    },
  ];
  useEffect(() => {
    refetch();
  }, [pagination, listBanks?.total_products]);
  return (
    <>
      <h3 className={styles.title}>Lịch sử nạp tiền</h3>
      <Table
        dataSource={listBanks?.data}
        columns={columns}
        style={{ overflowX: "auto" }}
        pagination={{
          defaultCurrent: 1,
          onChange: onChange,
          total: listBanks?.total_products,
        }}
      />
    </>
  );
};

export default Bank;
