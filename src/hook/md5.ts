import { useState } from 'react';
import CryptoJS from 'crypto-js';

const useMD5 = () => {
  const [hashedValue, setHashedValue] = useState('');

  const generateMD5 = (value:any) => {
    const md5Hash = CryptoJS.MD5(value).toString();
    setHashedValue(md5Hash);
  };

  return [hashedValue, generateMD5];
};

export default useMD5;
