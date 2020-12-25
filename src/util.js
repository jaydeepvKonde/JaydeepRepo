import CryptoJS from "../node_modules/crypto-js/crypto-js";
const key = '8080808080808080';
export default function formatCurrency(num) {
  return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}

export const formatNumber=(num)=> {
  return  Number(num.toFixed(1)).toLocaleString();
}

export const EncryptAESData=(Value)=>
{
        
        const keyutf = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Base64.parse(key);
        const enc = CryptoJS.AES.encrypt(Value, keyutf, { iv: iv });
        return enc.toString();
}

export const DecryptAESData=(Value)=>
{
  
  return CryptoJS.AES.decrypt(Value, key).toString(CryptoJS.enc.Utf8);
}
