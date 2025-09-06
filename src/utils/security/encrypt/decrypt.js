


import  CryptoJS from "crypto-js";


export const Decrypt = async ({ plainText ,SECRET_KEY_PHONE} = { }) => {

    return   CryptoJS.AES.decrypt(plainText , SECRET_KEY_PHONE).toString(CryptoJS.enc.Utf8)

}