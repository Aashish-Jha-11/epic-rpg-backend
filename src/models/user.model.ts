import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UserDocument, UserModelInterface } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username chahiye bhai!"],
      unique: true,
      trim: true,
      minlength: [3, "Username 3 letters se kam nahi"],
      maxlength: [30, "Username 30 letters se zyada nahi"]
    },
    email: {
      type: String,
      required: [true, "Email toh daal de!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Sahi email daal bhai!"]
    },
    password: {
      type: String,
      required: [true, "Password zaroori hai!"],
      minlength: [6, "Password kam se kam 6 characters ka ho"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model<UserDocument, UserModelInterface>("User", userSchema);

export default UserModel;
