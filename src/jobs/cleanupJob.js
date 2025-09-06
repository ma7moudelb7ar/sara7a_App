import cron from "node-cron";
import userModel from "../DB/models/usermodel.js";
import blackListedTokenModel from "../DB/models/BlackListedTokens.js";




cron.schedule("* * * * *", async () => {
  const now = new Date();

  await userModel.updateMany(
    { verificationCodeExpireAt: { $lt: now } },
    { $unset: { verificationCodeExpireAt: "", verificationCode: "" } }
  );

  await blackListedTokenModel.deleteMany({ expirationDate: { $lt: now } });

  console.log("Cron job: expires code & tokens cleaned");
});

