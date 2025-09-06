import { Router } from "express";
import * as MS from "./message.service.js";
import { validation } from "../../middleware/valdation.js";
import { authentication } from "../../middleware/authentication.js";
import* as MV from "./message.validation.js";



const messageRouter =Router({caseSensitive: true })

messageRouter.post("/sendMessage",validation(MV.sendMessageSchema) ,MS.sendMessage )
messageRouter.get("/getMessage", authentication ,MS.getMessage )
messageRouter.get("/getOneMessage/:id",validation(MV.getOneMessageSchema), authentication ,MS.getOneMessage )


export default messageRouter