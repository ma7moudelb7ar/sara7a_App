import RevokeTokenModel from "../DB/models/RevokeTokenModel.js"
import userModel from "../DB/models/usermodel.js"
import { refreshToken } from "../utils/security/token/refreshToken.js"


export const authentication = async(req,res,next) => {

            const { authorization  } = req.headers
            const [prefix , token]= authorization.split(" ") || []
            
            
            if (!prefix || !token) {
            
            throw new Error ("token or prefix not found" ,{cause: 404} )
            }
            let signature = ""
            if (prefix == process.env.BEARER_USER) {
            signature =process.env.ACCESS_USER
            }else if(prefix == process.env.BEARER_ADMIN){
            signature =process.env.ACCESS_ADMIN
            }else{
                throw new Error ("Invalid  prefix" ,{cause: 400} )
            }
            const decoded = await refreshToken({token : token,  SIGNATURE:signature} )
            if (!decoded?.email) {
                throw new Error ("email not authorized" ,{cause: 400} )
            }
            const revokeToken = await RevokeTokenModel.findOne({tokenId : decoded.jti})
            if (revokeToken?.tokenId) {
                throw new Error ("first SignIn" ,{cause: 400} )
                
            }
            const user = await userModel.findById(decoded.id)

            if (!user) {
                throw new Error ("user not exist" ,{cause: 404} )
            }
            if (!user?.confirmed || user?.isDeleted==false) {
                throw new Error("user not confirmed or freezed" , {cause : 404});
                
            }
            req.user = user
            req.decoded = decoded
            
            return next();
            
    } 

