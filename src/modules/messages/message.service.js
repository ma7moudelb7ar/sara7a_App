import crypto from "crypto";
import userModel from "../../DB/models/usermodel.js"
import messageModel from "../../DB/models/message.model.js"
import cloudinary from "../../utils/cloud/Cloudinary/index.js";

const hashIp = (ip) =>
  crypto.createHash("sha256").update(ip).digest("hex");




    export const sendAnonMessage = async (req, res, next) => {

    // Clean & read slug
    const slug = req.params.slug?.toLowerCase().trim();
    const { content } = req.body;

    // 1) هات اليوزر اللي ليه اللينك
    const receiver = await userModel.findOne({
        "shareProfile.slug": slug,
        "shareProfile.isEnabled": true,
        isDeleted: { $ne: true }
    });

    if (!receiver)
        throw new Error("invalid or disabled share link", { cause: 404 });

    if (!receiver.shareProfile.allowAnonymous)
        throw new Error("anonymous messages are disabled", { cause: 403 });

    // 2) ارفع الصور لو موجودة
    let attachments = [];

    if (req.files?.length) {
        const uploads = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
            folder: `messages/${receiver._id}/attachments`
        })
        );

        const results = await Promise.all(uploads);

        attachments = results.map((img) => ({
        secure_url: img.secure_url,
        public_id: img.public_id
        }));
    }

    // 3) لازم يبقى فيه content أو attachments
    const hasText = content && content.trim().length > 0;

    if (!hasText && attachments.length === 0)
        throw new Error("message or attachment required", { cause: 400 });

    // 4) check allowImages
    if (!receiver.shareProfile.allowImages && attachments.length > 0)
        throw new Error("image attachments disabled", { cause: 403 });

    // 5) خزّن الرسالة
    const msg = await messageModel.create({
        content: hasText ? content : undefined,
        receiverId: receiver._id,
        senderId: null,
        attachments,
        status: "unread",
        senderMeta: {
        ipHash: crypto.createHash("sha256").update(req.ip).digest("hex"),
        userAgent: req.get("user-agent")
        }
    });

    // 6) response
    return res.status(201).json({
        message: "sent",
        data: msg
    });
    };

    export const getInbox = async (req, res, next) => {

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;

    const filter = {
        receiverId: req.user._id,
        isDeleted: { $ne: true }
    };

    if (req.query.status) filter.status = req.query.status;

    const messages = await messageModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await messageModel.countDocuments(filter);

    return res.json({ page, limit, total, messages });
    };


    export const getOneMessage = async (req, res, next) => {

    const msg = await messageModel.findOne({
        _id: req.params.id,
        receiverId: req.user._id,
        isDeleted: { $ne: true }
    });

    if (!msg) throw new Error("message not found", { cause: 404 });

    return res.json({ message: "done", data: msg });
    };


    export const updateMessageStatus = async (req, res, next) => {

    const msg = await messageModel.findOneAndUpdate(
        {
        _id: req.params.id,
        receiverId: req.user._id,
        isDeleted: { $ne: true }
        },
        { status: req.body.status },
        { new: true }
    );

    if (!msg) throw new Error("message not found", { cause: 404 });

    return res.json({ message: "updated", data: msg });
    };


    export const deleteMessage = async (req, res, next) => {

    const msg = await messageModel.findOneAndUpdate(
        {
        _id: req.params.id,
        receiverId: req.user._id,
        isDeleted: { $ne: true }
        },
        { isDeleted: true }
    );

    if (!msg) throw new Error("message not found", { cause: 404 });

    return res.json({ message: "deleted" });
    };
