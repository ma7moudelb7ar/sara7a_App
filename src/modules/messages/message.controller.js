import { Router } from "express";
import * as MS from "./message.service.js";
import* as MV from "./message.validation.js";
import * as MD from "../../middleware/index.js";



const messageRouter =Router({caseSensitive: true })

    messageRouter.post(
    "/public/u/:slug",
    MD.MulterHost(MD.allowExtension.Image).array("attachments", 3),
    MD.validation(MV.slugParamsSchema),
    MD.validation(MV.sendAnonMessageSchema),
    MS.sendAnonMessage
    );

    // === 2) Inbox (AUTH) ===
    messageRouter.get(
    "/inbox",
    MD.authentication,
    MD.validation(MV.inboxQuerySchema ),
    MS.getInbox
    );

    // === 3) Get One Message (AUTH) ===
    messageRouter.get(
    "/:id",
    MD.authentication,
    MD.validation(MV.messageIdSchema ),
    MS.getOneMessage
    );

    // === 4) Update Message Status (AUTH) ===
    messageRouter.patch(
    "/:id",
    MD.authentication,
    MD.validation(MV.messageIdSchema ),
    MD.validation(MV.updateMessageSchema ),
    MS.updateMessageStatus
    );

    // === 5) Soft Delete Message (AUTH) ===
    messageRouter.delete(
    "/:id",
    MD.authentication,
    MD.validation(MV.messageIdSchema ),
    MS.deleteMessage
    );


export default messageRouter