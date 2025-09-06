


import  CryptoJS from "crypto-js";


export const Encrypt =async  ({ plainText ,SECRET_KEY_PHONE} = { }) => { 

    return   CryptoJS.AES.encrypt( plainText, SECRET_KEY_PHONE).toString();

}