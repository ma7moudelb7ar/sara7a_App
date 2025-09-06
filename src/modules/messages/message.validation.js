import Joi from "joi";
import { customId } from "../../utils/index.js";


export const sendMessageSchema={

    body: Joi.object({

        userId : Joi.string().custom(customId).required(),
        content : Joi.string().min(3).required()
    }).required()
}

export const getOneMessageSchema={

    params: Joi.object({
        id : Joi.string().custom(customId).required(),
    }).required()
}