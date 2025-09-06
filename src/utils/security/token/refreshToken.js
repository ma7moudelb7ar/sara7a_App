
import  jwt  from 'jsonwebtoken';


export const refreshToken = async ({token , SIGNATURE}={} ) => { 
    
    return  jwt.verify(token , SIGNATURE)

    
}