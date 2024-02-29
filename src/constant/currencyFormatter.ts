// currencyFormatter.ts

// Hàm chuyển đổi số tiền thành chuỗi chia theo đơn vị nghìn, chục nghìn, trăm nghìn,...
export function formatCurrency(amount: number): string {
    const separatedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return separatedAmount;
  }
  
  // Hàm chuyển đổi chuỗi có đơn vị VNĐ thành số tiền
  export function parseCurrency(currencyString: string): number {
    // Xóa ký tự ngăn cách hàng nghìn (dấu ',')
    const cleanString = currencyString.replace(/,/g, '');
    return parseInt(cleanString, 10);
  }
  