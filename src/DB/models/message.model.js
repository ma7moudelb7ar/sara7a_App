    import mongoose from "mongoose";

    export const messageStatus = {
        unread: "unread" ,
        read :"read" ,
        archived :"archived"
    }
    const messageSchema = new mongoose.Schema(
    {
        content: {
        type: String,
        minLength: 2,
        maxLength: 2000, 
        required: function () {
            return this.attachments?.length ? false : true;
        },
        trim: true
        },

        attachments: [
        {
            secure_url: { type: String, required: true },
            public_id: { type: String }
        }
        ],

        receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
        },

        senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
        },

        status: {
        type: String,
        enum: Object.values(messageStatus),
        default: messageStatus.unread
        },

        isDeleted: {
        type: Boolean,
        default: false
        },
        senderMeta: {
        ipHash: { type: String },
        userAgent: { type: String }
        }
    },
    { timestamps: true }
    );


    const messageModel = mongoose.models.message || mongoose.model("message", messageSchema)
    

 export default messageModel