import mongoose from "mongoose";

const blackListedTokenSchema = new mongoose.Schema({
  idToken: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const blackListedTokenModel =mongoose.model("BlackListedTokens", blackListedTokenSchema);


export default blackListedTokenModel
