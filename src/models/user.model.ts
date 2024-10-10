import { Schema, model, models, Document } from "mongoose";

// TypeScript interface to define the structure of the User document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  personalEmail: string;
  workEmail: string;
  domain: string;
  password: string;
  role: string;
  isVerified: boolean;
  verifiedToken: string;
  verifiExpiry: Date;
  mPin: string;
  profile_photo: string;
  resetToken: string;
  resetTokenExpiry: Date;
}

// Create a new schema with the required fields
const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    personalEmail: { type: String, required: true, unique: true },
    workEmail: { type: String, required: false },
    domain: { type: String, required: true }, // Use domain here
    role: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifiedToken: { type: String, required: false },
    verifiExpiry: { type: Date, required: false },
    mPin: { type: String, required: false },
    profile_photo: { type: String, required: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
  
  },
  {
    timestamps: true,
  }
);

// Export the model or return an existing model if it has already been created
const User = models.User ||  model<IUser>("User", UserSchema);
export default User;
