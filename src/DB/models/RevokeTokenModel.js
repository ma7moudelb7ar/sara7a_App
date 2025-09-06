import mongoose from "mongoose";

const revokeTokenSchema = new mongoose.Schema ({

    tokenId : {
        type : String , 
        required: [true, "revokeToken is required "] 
    },
    expeIt :{
        type : String,
        
    }
},{
    timestamps:true,
})


const RevokeTokenModel = mongoose.models.revokeToken || mongoose.model("RevokeToken",revokeTokenSchema)

export default RevokeTokenModel