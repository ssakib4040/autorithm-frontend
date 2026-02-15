import mongoose, { Schema } from "mongoose";

const ActivitySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    action: {
      type: String,
      enum: [
        "login",
        "logout",
        "register",
        "purchase",
        "product_view",
        "product_create",
        "product_update",
        "product_delete",
        "contact_create",
        "contact_update",
        "profile_update",
        "password_change",
        "settings_update",
        "email_verify",
        "password_reset",
      ],
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["product", "purchase", "contact", "user", "settings"],
    },
    resourceId: { type: Schema.Types.Mixed },
    description: { type: String, required: true, trim: true },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String, trim: true },
    userAgent: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export default Activity;
