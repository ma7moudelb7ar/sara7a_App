import  Router  from "express";
import * as US from "./user.service.js";
import  * as MD from './../../middleware/index.js';
import * as UV from './user.validation.js';



const userRouter =Router()

    userRouter.post("/signup",
        MD.MulterHost(MD.allowExtension.Image )
        .single("profile") 
        ,MD.validation(UV.signUpSchema)
        ,US.createUser);

    userRouter.post("/signin",MD.validation(UV.signINSchema),US.signIN);
    userRouter.post("/loginWithGmail", US.loginWithGmail);
    userRouter.get("/confirmEmail/:token",US.confirmEmail);
    userRouter.get("/getProfile",MD.authentication,US.getProfile);
    userRouter.get("/getProfileData/:id",US.getProfileData);
    userRouter.post("/logOut",MD.validation(UV.logOut),MD.authentication,US.logOut);
    userRouter.post("/RefreshToken",MD.validation(UV.RefreshToken),US.RefreshToken);
    userRouter.patch("/updatePassword",MD.authentication,MD.validation(UV.updatePasswordSchema),US.updatePassword);
    userRouter.patch("/updateProfile",MD.authentication,MD.validation(UV.updateProfileSchema),US.updateProfile);

userRouter.patch("/updateProfileImage",MD.authentication,
    MD.MulterHost(MD.allowExtension.Image )
    .single("profile") 
    ,MD.validation(UV.updateProfileImageSchema),
    US.updateProfileImage);

userRouter.patch("/forgetPassword",MD.validation(UV.forgetPasswordSchema),US.forgetPassword);
userRouter.patch("/resetPassword",MD.validation(UV.resetPasswordSchema),US.resetPassword);
userRouter.delete("/freezeAccount/{:id}",MD.authentication,MD.validation(UV.freezeAccountSchema),US.freezeAccount);
userRouter.delete("/unfreezeAccount/{:id}",MD.authentication,MD.validation(UV.unfreezeAccountSchema),US.unfreezeAccount);

    userRouter.get(
    "/shareLink",
    MD.authentication,
    US.getShareLink
    );

    userRouter.patch(
    "/shareLink",
    MD.authentication,
    MD.validation(UV.updateShareLinkSchema),
    US.updateShareLink
    );

    userRouter.patch(
    "/shareLink/regen",
    MD.authentication,
    US.regenShareLink
    );


export default userRouter