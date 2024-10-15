import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
// import { generateToken
import { generateToken } from "@/helpers/generateToken";

// Establish DB connection before handling requests
connect();

export async function POST(req: NextRequest) {
  try {
    const userInfos = await req.json();
    const { email, password } = userInfos;

    // Find user by email
    const findUser = await User.findOne({ personalEmail: email });

    if (!findUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 } // Not Found
      );
    }

    // Check if user is verified
    if (!findUser.isVerified) {
      return NextResponse.json(
        { error: "Account not verified. Please verify your account first." },
        { status: 401 } // Unauthorized
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 } // Unauthorized
      );
    }

    // Generate a token for the user after successful login
    const token = generateToken(findUser._id, findUser.personalEmail);

    // Respond with the token
    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 } // Success
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res;
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error:", error.message);

    // Respond with a generic error message
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 } // Internal Server Error
    );
  }
}
