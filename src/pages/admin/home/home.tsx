import {
  Button,
  Input,
  Pagination,
  PaginationProps,
  Popconfirm,
  Space,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
  message,
} from "antd";
import styles from "./styles.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input/Search";
import { useQuery } from "react-query";
import {
  deleteProduct,
  getCategories,
  getListProduct,
  getListProductNoCate,
} from "../../../api/admin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ModalDetailProducts from "../../../components/admin/modalDetail";
import { formatCurrency } from "../../../constant/currencyFormatter";

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
  document.title = "Admin";
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  // const [categorySelected, setCategorySelect] = useState();

  const {
    data: product,
    refetch,
    isFetching,
  } = useQuery(["product"], () => getListProductNoCate(page));
  const { data: categories } = useQuery("categories", () => getCategories());
  const categoriesMap = categories?.data.map((item: any) => ({
    value: item.id,
    text: item.name,
  }));
  const confirm = async (idProduct: any) => {
    const payload = {
      idproduct: idProduct,
    };
    const res = await deleteProduct(payload);
    console.log("res", res);

    // message.success("Xóa thành công");
    refetch();
  };

  const cancel = (e: any) => {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState();
  const showModal = (value: any) => {
    setIsModalOpen(true);
    setImage(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (text, record, index) => (page - 1) * 10 + index + 1,
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
      width: 120,
      render: (text: any) => <div style={{ color: "#008000" }}> {formatCurrency(text)}</div>,

    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Tình trạng",
    //   dataIndex: "sell",
    //   key: "sell",
    //   render: (text, record) => (
    //     <span style={{ color: record.sell === "0" ? "#1677ff" : "red" }}>
    //       {text === "0" ? <p>Chưa bán</p> : <p>Đã bán</p>}
    //     </span>
    //   ),
    // },
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
            onClick={() => showModal(record.image)}
          >
            Xem
          </Button>
          <Popconfirm
            title="Xóa"
            description="Bạn có muốn xóa folder này không?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            // okText="Yes"
            // cancelText="No"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    refetch();
  }, [page, product?.total_products]);
  const onChange = (value: any) => {
    setPage(value);
    // refetch();
  };
  const totalPages = parseInt(product?.total_pages);

  return (
    <>
      <div className={styles.tablWrap}>
        <Spin spinning={isFetching}>
          {" "}
          <div className={styles.btn}>
            <Button type="primary" onClick={() => navigate("./them-moi")}>
              Thêm mới
            </Button>
          </div>
          <div className={styles.table}>
            {" "}
            <>
              {" "}
              <Table
                columns={columns}
                dataSource={product?.data}
                style={{ overflowX: "auto" }}
                pagination={false}
                 
              />
              <Pagination
                defaultCurrent={1}
                onChange={onChange}
                total={product?.total_products}
                style={{ margin: "1vh 0", float: "right" }}
              />
            </>
          </div>
        </Spin>
      </div>
      <ModalDetailProducts
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        image={image}
      />
    </>
  );
};

export default HomeAdmin;
