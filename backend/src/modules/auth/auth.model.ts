import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "VIEWER" | "ANALYST" | "ADMIN"
  isActive: boolean,
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ["VIEWER", "ANALYST", "ADMIN"],
    default: "VIEWER"
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});

export const User = mongoose.model<IUser>("user", userSchema);