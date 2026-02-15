import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    role: { type: String, trim: true },
    isAdmin: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
