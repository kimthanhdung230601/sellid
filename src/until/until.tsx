const secretKey = process.env.REACT_APP_SECRET_KEY as string;
export const admin = ["Nguyễn Văn A"];
export const CURRENT_URL = "taphoahinh.com/API";
export const randomKey = CryptoJS.lib.WordArray.random(32); // Độ dài khóa
export const hexString = randomKey.toString(); // tạo khóa

//mã hóa
export const ciphertext = CryptoJS.AES.encrypt("money", secretKey).toString();
//giải mã
export const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
export const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
