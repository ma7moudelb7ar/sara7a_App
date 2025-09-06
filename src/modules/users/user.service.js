import { nanoid } from "nanoid";
import userModel, { userProvider, userRole } from "../../DB/models/usermodel.js"
import { generateToken ,refreshToken ,Encrypt , Decrypt ,Hash ,Compare ,eventEmitter} from "../../utils/index.js";
import RevokeTokenModel from './../../DB/models/RevokeTokenModel.js';
import { customAlphabet } from 'nanoid'
import  {OAuth2Client }from 'google-auth-library';


export const createUser = async(req,res,next) => {

    const {name , email , phone , password , cpassword , age , gender } = req.body

    if (!req?.files?.length) {
        throw new Error("profile required ");
    }

    //check email
    if (  await  userModel.findOne({email})) {
    throw new Error ("email already exist " ,{cause: 400} )
    }

    //hash password 
    const hash = await Hash({plainText : password,  SALT_ROUND : process.env.SALT_ROUND})
    
    //encrypt phone 
    const phoneEncrypt = await Encrypt({ plainText: phone, SECRET_KEY_PHONE :process.env.SECRET_KEY_PHONE})
    
    eventEmitter.emit("sendEmail", { email });

    const pathFiles=[]
    //upload
    for (const file of req?.files) {
        console.log(file);
        
    pathFiles.push(file.path)
    }
    //signup
    const user = await userModel.create({
        name , 
        email , 
        phone :phoneEncrypt , 
        password:hash , 
        cpassword ,
        age ,
        gender ,
        coverImages : pathFiles
    })
    await user.save()

    return res.status(201).json({message : "done create", user })
};


export const confirmEmail= async(req,res,next ) => { 

    const {token} = req.params

    if (!token) {
        throw new Error("token not found " , {cause:404});
    };

    const decoded = await refreshToken({ token : token, SIGNATURE : process.env.SIGNATURE_TOKEN })
    const user = await userModel.findOne({email :decoded?.email , confirmed : false })
    


    if (!user) {
        throw new Error("user not exist " , {cause:404});
    };

    user.confirmed = true;
    await user.save(); 


    return res.status(200).json({message : "confirmed success" })
    
};

export const signIN = async (req,res,next) => {

    const {email,password} =req.body 
     //check email
    const user = await userModel.findOne({email , confirmed : true})

    
    if (!user) {

        throw new Error ("email not exist or not confirmed" ,{cause: 404} )
    }
    //check password
    const match = await Compare({plainText :password, cipherText : user.password})
    
    if (!match) {
        throw new Error ("inValid password" ,{cause: 404} )

    }
    
    const access_token =await generateToken({
        payload:{id :user._id , email},
        SIGNATURE:user.role== userRole.user ? process.env.ACCESS_USER : process.env.ACCESS_ADMIN,
        options:{expiresIn:  "1h", jwtid : nanoid() }
    });
    const refresh_token =await generateToken({
    payload:  {id :user._id , email} , 
    SIGNATURE: user.role==userRole.user ?  process.env.ACCESS_USER_REFRESH : process.env.ACCESS_ADMIN_REFRESH,
    options: {expiresIn:  "1y", jwtid : nanoid()}
    });
    return res.status(200).json({message : "done" , access_token,refresh_token})

};

export const loginWithGmail = async (req,res,next) => {

    const {idToken} =req.body 

    const client = new OAuth2Client();
    async function verify() {
    const ticket = await client.verifyIdToken({
    idToken ,
    audience: process.env.WEB_CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    return payload
}

const {name ,picture ,email_verified , email} = await verify()

    let user = await userModel.findOne({email })

    if (!user) {
        
        user = await userModel.create({
            name, 
            email,
            image : picture ,
            confirmed: email_verified ,
            provider:userProvider.google
        })
    }
    console.log(user);
    
    
    if (user.provider !== userProvider.google) {
        throw new Error("please sign in with System " , {cause: 404});
    }
    

    
    const access_token =await generateToken({
        payload:{id :user._id , email},
        SIGNATURE:user.role== userRole.user ? process.env.ACCESS_USER : process.env.ACCESS_ADMIN,
        options:{expiresIn:  "1h", jwtid : nanoid() }
    });


    
    const refresh_token =await generateToken({
    payload:  {id :user._id , email} , 
    SIGNATURE: user.role==userRole.user ?  process.env.ACCESS_USER_REFRESH : process.env.ACCESS_ADMIN_REFRESH,
    options: {expiresIn:  "1y", jwtid : nanoid()}
    });




    return res.status(200).json({message : "done"  ,access_token , refresh_token})


};



export const getProfile = async ( req, res, next) => {

    const  phone  = await Decrypt ({ plainText : req.user.phone, SECRET_KEY_PHONE : process.env.SECRET_KEY_PHONE})

    
    req.user.phone = phone
    return res.status(200).json({message : "done",user :req.user})


};


export const getProfileData = async ( req, res, next) => {

    const {id} = req.params

    const user = await userModel.findById(id).select(" name phone age email").lean()
    
    if (!user) {
        throw new Error("user not exist " , { cause : 404});
        
    }
    const  phone  = await Decrypt ({ plainText :user.phone, SECRET_KEY_PHONE : process.env.SECRET_KEY_PHONE})
    
    user.phone = phone
    

    return res.status(200).json({message : "done",user })


};

export const logOut = async ( req, res, next) => {

    const revokeToken =  await RevokeTokenModel.create({
        tokenId : req.decoded. jti ,
        expeIt : req.decoded.exp
    })
    
    return res.status(200).json({message : "done",revokeToken})

};

export const RefreshToken = async ( req, res, next) => {

            const { authorization  } = req.headers
            const [prefix , token]= authorization.split(" ") || []
            
            
            if (!prefix || !token) {
            
            throw new Error ("token or prefix not found" ,{cause: 404} )
            }
            let signature = ""
            if (prefix == process.env.BEARER_USER) {
            signature =process.env.ACCESS_USER_REFRESH
            }else if(prefix == process.env.BEARER_ADMIN){
            signature =process.env.ACCESS_ADMIN_REFRESH
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
            const user = await userModel.findById(decoded.id).lean()

            if (!user) {
                throw new Error ("user not exist" ,{cause: 400} )
            }
        const access_token =await generateToken({
        payload:{id :user._id , email : user.email},
        SIGNATURE:user.role== userRole.user ? process.env.ACCESS_USER : process.env.ACCESS_ADMIN,
        options:{expiresIn:  "1h", jwtid : nanoid() }
    });
    const refresh_token =await generateToken({
    payload:  {id :user._id , email  : user.email} , 
    SIGNATURE: user.role==userRole.user ?  process.env.ACCESS_USER_REFRESH : process.env.ACCESS_ADMIN_REFRESH,
    options: {expiresIn:  "1y", jwtid : nanoid()}
    });

    return res.status(200).json({message : "done",access_token , refresh_token})

};

export const updatePassword = async (req, res ,next ) => {

    const {  oldPassword , newPassword  } = req.body
    

    if (  !await Compare ( {plainText : oldPassword , cipherText: req.user.password})) {
        throw new Error("invalid password");
    }
    
    
    const hash = await Hash({plainText : newPassword })
    
    req.user.password =hash;
    
    await req.user.save();
    
    await RevokeTokenModel.create({
        idToken:req?.decoded?.jti,
        expeIt:req?.decoded?.exp
    })

    return res.status(200).json({message : "done",  user : req.user})
    
};

export const forgetPassword = async (req, res ,next ) => {

    const {  email } = req.body
    
    const user = await userModel.findOne({email})
    if (!user) {
        throw new Error("email already exist" , {cause:404});
        
    }

    const otp = customAlphabet("1234567890" , 4) ()

    eventEmitter.emit("forgetPassword",{email , otp})

    const hash = await Hash({plainText :otp  })
    user.otp = hash
    await user.save();

    return res.status(200).json({message : "done",  user : req.user})
    
};

export const resetPassword = async (req, res, next )=> { 

    const { email , otp ,newPassword} =  req.body

    const user = await userModel.findOne({email , otp :{$exists : true}})

    if (!user) {
        throw new Error("not found otp or email not exist ");
    }
    
    if (!Compare({plainText:otp , cipherText : user.otp} )) {
        throw new Error("not found otp or email not exist ");
    }

    const hash = await Hash({plainText:newPassword})

    await userModel.updateOne({email},{
        password : hash,
        $unset:  {otp}
    })
    return res.status(200).json({message : "done",  user })
    
};

export const updateProfile = async(req, res, next ) => { 

    const { phone , gender, age , email , name}= req.body

    if (name) req.user.name = name
    if (age) req.user.age = age
    if (gender) req.user.gender = gender

    if (phone) {
        const encryptPhone = Encrypt({ plainText : phone, SECRET_KEY_PHONE : process.env.SECRET_KEY_PHONE });

        req.user.phone = encryptPhone;
    };

    if (email) {
        const user = await userModel.findOne({email});
        if ( user) {
            throw new Error("email already exist");
        }

        
        eventEmitter.emit("sendEmail" , {email})
        req.user.email = email
        req.user.confirmed = false
    };

    await req.user.save();
    
    return res.status(200).json({message : "done" ,  user : req.user})
};

export const freezeAccount = async (req, res ,next) => { 

    const {id }=  req.params

    if (id &&  req?.user?.role !== userRole.admin) {
        throw new Error(" not allow delete this account ");
    }

    const user = await userModel.updateOne({
        _id :id || req?.user?._id ,
        isDeleted : {$exists : false}
    },{
        isDeleted:true,
        deletedBy: req?.user?._id
    },{
        $inc : { _v : 1}
    }
)
    user.matchedCount 
    ? res.status(200).json({message : "success freeze account "}) 
    : res.status(400).json({message : "fail freeze account "} )


};


export const unfreezeAccount = async (req, res ,next) => { 

    const {id }=  req.params

    if (id &&  req?.user?.role !== userRole.admin) {
        throw new Error(" not allow delete this account ");
    }

    const user = await userModel.updateOne({
        _id :id || req?.user?._id ,
        isDeleted : {$exists : true}
    },{
        $unset : {isDeleted: " ", deletedBy : " "},
        
        restoreBy: req?.user?._id
    },{
        $inc : { _v : 1}
    }
)
    user.matchedCount 
    ? res.status(200).json({message : "success unfreeze account "}) 
    : res.status(400).json({message : "fail freeze account "} )


};