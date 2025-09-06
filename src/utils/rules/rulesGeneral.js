import Joi from "joi";
import { Types } from "mongoose";

    export const customId = (value, helper) => {
        const data = Types.ObjectId.isValid(value);

        return data ? value : helper.message("invalid ID");
    };
export const generalRules = {

    email:Joi.string().email({tlds: { allow: false  }  }),
        password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),

        headers: Joi.object({
        authorization : Joi.string().required(),
        connection : Joi.string(),
        host : Joi.string(),
        accept : Joi.string(),
        "content-length" : Joi.string(),
        "accept-encoding" : Joi.string(),
        "postman-token" : Joi.string(),
        "user-agent" : Joi.string(),
        "content-type" : Joi.string(),
    })
};
