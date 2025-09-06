import checkConnectionDB from "./DB/connectionDB.js"
import messageRouter from "./modules/messages/message.controller.js";
import userRouter from './modules/users/user.controller.js';
import cors from "cors"
import { GlobalError } from "./middleware/GlobalError.js";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
const limiter = rateLimit({
  windowMs: 60* 1000 ,
  max : 3,
  statusCode: 429 ,
  message :{
    error : "Too many requests, please try again later."
  },
  legacyHeaders: false

})


let whitelist = [ process.env.URL_FRONT, undefined]
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const bootstrap  = (app,express)=>{

    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(morgan("dev"))
    checkConnectionDB()

    app.get("/" , (req,res,next ) => { return res.status(200).json({message: "welcome My sara7aApp........✌❤"})})
    app.use(helmet())

    app.use(limiter)
    app.use("/uploads",express.static("uploads"))
    app.use("/users",userRouter)
    app.use("/message",messageRouter)

    app.use("{/*demo}",(req,res,next)=>{
        throw new Error ( `url not found ${req.originalUrl}`)
    })

    app.use(GlobalError )

    
}

export default bootstrap