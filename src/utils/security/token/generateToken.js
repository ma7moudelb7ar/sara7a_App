
import  jwt  from 'jsonwebtoken';



export const generateToken = async ({payload ,SIGNATURE ,  options }={} ) => {

    return jwt.sign(payload , SIGNATURE,  options)
    }