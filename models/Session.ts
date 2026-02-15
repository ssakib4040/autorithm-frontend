import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    id: { type: Number, unique: true, sparse: true },
    token: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    lastActiveAt: { type: Date, default: Date.now },
    ipAddress: { type: String, trim: true },
    userAgent: { type: String, trim: true },
  },
  { timestamps: false },
);

const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
