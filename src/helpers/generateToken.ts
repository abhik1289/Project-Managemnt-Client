import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
export function generateToken(userId: ObjectId, email: string) {
  const data = {
    userId: userId,
    email,
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

export function decodeToken(token: string) {
  const data = jwt.verify(token, process.env.secret_key!);
  return data;
}
