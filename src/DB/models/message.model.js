

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema ({

    content : {
        type : String , 
        minlength : 1 ,
        required: [true, "message is required "] 
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true,
})


const messageModel = mongoose.models.message || mongoose.model("message",messageSchema)

export default messageModel