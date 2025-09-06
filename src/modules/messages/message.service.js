import messageModel from "../../DB/models/message.model.js"
import userModel from "../../DB/models/usermodel.js";


export const sendMessage =async ( req,res,next ) => {

    const {userId , content} = req.body 

    if (!await userModel.findOne({_id : userId , isDeleted :{ $exists : false}})) {
        throw new Error("user not exist or freezed" , {cause :404});
    }

    const message = await messageModel.create({userId , content })

    return res.status(201).json({message :"success Send Message" , message})
}


export const getMessage = async (req,res,next ) =>  { 

    const messages = await messageModel.find({userId : req?.user?._id}).populate([{
        path: "userId" ,
        select : "name -_id"
    }])
    if (!messages) {
        throw new Error("message not found", {cause : 404});
        
    }

    return res.status(200).json({message :"success " , messages})

}


export const getOneMessage = async (req,res,next ) =>  { 

    const {id} = req.params

    const messages = await messageModel.findOne({userId : req?.user?._id , _id :id }).populate([{
        path: "userId" ,
        select : "name -_id"
    }])
    if (!messages) {
        throw new Error("message not found or not account manger", {cause :404});
        
    }

    return res.status(200).json({message :"success " , messages})

}