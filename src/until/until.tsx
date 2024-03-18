const secretKey = process.env.REACT_APP_SECRET_KEY as string;
export const admin = ["Nguyễn Văn A"];
export const CURRENT_URL = "taphoahinh.com/API";


//quy ra tiền
export const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  