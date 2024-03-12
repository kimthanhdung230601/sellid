import { useQuery } from "react-query";
import styles from "./styles.module.scss";
import { getListBank } from "../../../api/admin";
import { Table, TableColumnsType } from "antd";
interface BankProps {
  id: any;
  tid: any;
  description: any;
  amount: any;
  time: Date;
  username: string;
}
const columns:TableColumnsType<BankProps> = [
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
  { title: "Số tiền", dataIndex: "amount", key: "amount", width:100},
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
    width:120
  },
];
const Bank = () => {
  const { data: listBanks } = useQuery(["listBank"], () => getListBank());

  return (
    <>
      <h3 className={styles.title}>Lịch sử nạp tiền</h3>
      <Table dataSource={listBanks?.data} columns={columns} />;
    </>
  );
};

export default Bank;
