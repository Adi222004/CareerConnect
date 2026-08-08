import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["Student", "Recruiter"],
      required: [true, "Role is required"],
    },
    // Indian KYC fields
    pancard: {
      type: String,
      trim: true,
      uppercase: true,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN number"],
    },
    adharcard: {
      type: String,
      trim: true,
      match: [/^\d{12}$/, "Aadhaar must be 12 digits"],
    },
    profile: {
      bio: { type: String, default: "" },
      skills: [{ type: String }],
      resume: { type: String, default: "" },       // Cloudinary URL
      resumeOriginalName: { type: String, default: "" },
      profilePhoto: { type: String, default: "" }, // Cloudinary URL
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
