import  Router  from "express";
import * as US from "./user.service.js";
import  * as MD from './../../middleware/index.js';
import * as UV from './user.valdation.js';
import { userRole } from "../../DB/models/usermodel.js";

//[[]] 
//[[],[]] 

const userRouter =Router()

userRouter.post("/signup",
    MD.Multer("user" ,MD.allowExtension.Image )
    .array("cover" , 2)
    ,US.createUser);



    
userRouter.post("/signin",MD.validation(UV.signINSchema),US.signIN);
userRouter.post("/loginWithGmail",US.loginWithGmail);
userRouter.get("/confirmEmail/:token",US.confirmEmail);
userRouter.get("/getProfile",MD.authentication,US.getProfile);
userRouter.get("/getProfileData/:id",US.getProfileData);
userRouter.post("/logOut",MD.validation(UV.logOut),MD.authentication,US.logOut);
userRouter.post("/RefreshToken",MD.validation(UV.RefreshToken),US.RefreshToken);
userRouter.patch("/updatePassword",MD.authentication,MD.validation(UV.updatePasswordSchema),US.updatePassword);
userRouter.patch("/updateProfile",MD.authentication,MD.validation(UV.updateProfileSchema),US.updateProfile);
userRouter.patch("/forgetPassword",MD.validation(UV.forgetPasswordSchema),US.forgetPassword);
userRouter.patch("/resetPassword",MD.validation(UV.resetPasswordSchema),US.resetPassword);
userRouter.delete("/freezeAccount/{:id}",MD.authentication,MD.validation(UV.freezeAccountSchema),US.freezeAccount);
userRouter.delete("/unfreezeAccount/{:id}",MD.authentication,MD.validation(UV.unfreezeAccountSchema),US.unfreezeAccount);

export default userRouter