

import Joi from "joi";

    export const slugParamsSchema = {
        params : Joi.object({
            slug: Joi.string().min(3).max(30).required()
        })
    }

    export const sendAnonMessageSchema = {
        body : Joi.object({
            content: Joi.string().min(0).max(2000).allow("")
        })
    };

    export const inboxQuerySchema = {
        query : Joi.object({
            page: Joi.number().min(1).optional(),
            limit: Joi.number().min(1).max(50).optional(),
            status: Joi.string().valid("unread", "read", "archived").optional()
        })
    };

    export const messageIdSchema = {
    params : Joi.object({
    id: Joi.string().hex().length(24).required()
    })
    };
    
    export const updateMessageSchema = {
    body : Joi.object({
    status: Joi.string().valid("unread", "read", "archived").required()
    })
    };
