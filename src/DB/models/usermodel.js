import mongoose from "mongoose";

export const userGender = {
    male: "male" ,
    female :"female"
}
export const userRole = {
    admin: "admin" ,
    user :"user"
}
export const userProvider = {
    system: "system" ,
    google :"google"
}
const userSchema = new mongoose.Schema({
    name :{
        type : String ,
        trim :true , 
        required : [true,"name is required"] ,
        minlength : 2,
        maxlength : 18 , 
    }, 
    email :{
        type:String  , 
        required: [true, "email is required "] , 
        trim : true,
        unique : true 
    },
    age : {
        type: Number,
        min :18,
        max :60
    }, 
    phone :{
        type : String,
        
    }, 
    password : {
        type:String,
        required: function(){
            return this.provider === userProvider.system
        }
    }, 
    gender :{
        type:String ,
        required: [true, "Gender is required"],
        enum :{
            values: Object.values(userGender),
            message: "Gender must be either 'male' or 'female'"
        },
        default : userGender.male
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role : {
        type: String,
        enum:Object.values(userRole) ,
        default: userRole.user
    },
    otp : {
        type: String
    },
    isDeleted :{
    type:Boolean
    },
    deletedBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    restoreBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    }, 
    profileImage: {
        secure_url : String ,
        public_id : String
    } ,
    coverImages: [String] ,
    provider:{
        type: String ,
        enum : Object.values(userProvider) ,
        default : userProvider.system
    } ,
    verificationCode: String,
    verificationCodeExpireAt: Date,
    codeCreatedAt: Date,
    failedAttempts: { type: Number, default: 0 },
    isBannedUntil: Date,

    shareProfile: {
    slug: {
        type: String,
        unique: true,
        sparse: true, 
        trim: true,
        lowercase: true
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    allowAnonymous: {
        type: Boolean,
        default: true
    },
    allowImages: {          
        type: Boolean,
        default: true
    },
    maxPerIpPerHour: {      
        type: Number,
        default: 5
    }
    },

},{
    timestamps:true
})



const userModel = mongoose.models.user || mongoose.model("user", userSchema)



export default userModel