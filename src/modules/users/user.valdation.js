import Joi from "joi";
import { userGender } from "../../DB/models/usermodel.js";
import { customId, generalRules } from "../../utils/rules/rulesGeneral.js";



export const signUpSchema = {
    body : Joi.object({
        name : Joi.string().alphanum().min(3).max(20).required(),
        email:generalRules.email.required(),
        age:Joi.number().min(18).max(60).required(),
        password: generalRules.password.required(),
        cPassword:Joi.string().valid(Joi.ref("password")),
        gender:Joi.string().valid(userGender.female,userGender.male).required(),
        phone:Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).required(),
        
}).required(), 
};

export const signINSchema = {
    body : Joi.object({
        name : Joi.string().alphanum().min(3).max(20).required(),
        email:generalRules.email.required(),
        password: generalRules.password.required(),
}).required(), 
};

export const logOut = {
    headers : generalRules.headers.required()
};

export const RefreshToken = {
    headers : generalRules.headers 
        
};

export const updatePasswordSchema = {
    body : Joi.object({
        oldPassword: generalRules.password.required(),
        newPassword: generalRules.password.required(),
        cPassword:Joi.string().valid(Joi.ref("newPassword")).required(),
        
        headers: generalRules.headers
}).required(), 
};

export const forgetPasswordSchema = {
    body : Joi.object({
    email:generalRules.email.required(),
    
        
}).required(), 
};

export const resetPasswordSchema = {
    body : Joi.object({
    email:generalRules.email.required(),
    newPassword: generalRules.password.required(),
    cPassword:Joi.string().valid(Joi.ref("newPassword")).required(),
    otp : Joi.string().length(4).required(),
    
        
}).required(), 
};

export const updateProfileSchema = {
    body : Joi.object({
        name : Joi.string().alphanum().min(3).max(20),
        email:generalRules.email,
        age:Joi.number().min(18).max(60),
        gender:Joi.string().valid(userGender.female,userGender.male),
        phone:Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/),
}), 
};


export const getProfileDataSchema = {
    body : Joi.object({
        name : Joi.string().alphanum().min(3).max(20).required(),
        email:generalRules.email.required(),
        age:Joi.number().min(18).max(60).required(),
        phone:Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).required(),
}).required(), 
};

export const freezeAccountSchema = {
    params : Joi.object({

    id:Joi.string().custom(customId),
    
        
}), 
};

export const unfreezeAccountSchema = {
    params : Joi.object({

    id:Joi.string().custom(customId),
    
        
}), 
};
