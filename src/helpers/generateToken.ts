import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
export function generateToken(userId: ObjectId, otp: string) {
  const data = {
    userId: userId,
    otp,
  };

  const token = jwt.sign(
    {
      data,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.secret_key!
  );
  return token;
}
