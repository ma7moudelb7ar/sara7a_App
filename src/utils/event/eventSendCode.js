import { generateToken } from "../index.js";
import { EventEmitter } from "node:events";
import { sendEmail } from "../../service/sendEmail.js";
import userModel from "../../DB/models/usermodel.js";
import  CryptoJS from "crypto";
import { confirmEmailTemplateLink } from "../../service/EmailTemplateLink.js";
import { confirmEmailTemplateOtp } from "../../service/EmailTemplateOtp.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("sendCode", async (data) => {
  const { email } = data;

  const verificationCode = CryptoJS.randomInt(100000, 999999).toString();


  const isSent = await sendEmail({
    to: email,
    subject: "Your Verification Code",
    html: `<h2>Your verification code is: <b>${verificationCode}</b></h2>`,
  });

  if (!isSent) {
    throw new Error("Fail to send Email", { cause: 400 });
  }

  const user = await userModel.findOneAndUpdate(
    { email },
    {
      verificationCode,
      codeCreatedAt: new Date(),
      failedAttempts: 0,
      isBannedUntil: null,
    }
  );

  if (!user) {
    throw new Error("User not found while sending code", { cause: 404 });
  }
});


eventEmitter.on("forgetPassword" , async (data) => {

    const {email, otp} = data


    const isSend  = await sendEmail({
        to:email , 
        html : confirmEmailTemplateOtp(otp , "Forget Password")
        })

    if (!isSend) {
        throw new Error ("fail to send Email" ,{cause: 400} )

    }
})


eventEmitter.on("confirmEmail" , async (data) => {
    const {email} = data
const token =  await generateToken({payload : {email} ,SIGNATURE:process.env.SIGNATURE_TOKEN, options :{ expiresIn: 60*2 }  })



    const link = `http://localhost:3000/users/confirmEmail/${token}`

    const isSend  = await sendEmail({
        to:email , 
        html : confirmEmailTemplateLink(link , "Confirm Email")
        })

    if (!isSend) {
        throw new Error ("fail to send Email" ,{cause: 400} )

    }
})