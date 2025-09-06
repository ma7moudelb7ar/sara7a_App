

import bcrypt from "bcrypt";

export const Hash = async ({SALT_ROUND = process.env.SALT_ROUND , plainText}= { })   => { 
   
    return  await bcrypt.hash(plainText, Number(SALT_ROUND))

}