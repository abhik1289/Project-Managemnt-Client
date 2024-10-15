import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/sendMail";
import { generateToken } from "@/helpers/generateToken";
import { generateOTP } from "@/helpers/generateOtp";

// Establish DB connection before handling requests
connect();

export async function POST(req: NextRequest) {
  try {
    const userInfos = await req.json();
    const { email, otp, token } = userInfos;

    // If token is present, verify and activate the account
    if (token) {
      const { email: tokenEmail, userId } = token; // Assuming token is already decoded
      const findUser = await User.findOne({ personalEmail: tokenEmail });

      if (findUser) {
        findUser.isVerified = true;
        await findUser.save();
        return NextResponse.json(
          { message: "Account Activation successful" },
          { status: 200 } // Success
        );
      } else {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 } // Not Found
        );
      }
    }

    // If OTP and email are provided, validate them
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 } // Bad Request
      );
    }

    // Find the user by email
    const findUser = await User.findOne({ personalEmail: email });

    if (!findUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 } // Not Found
      );
    }

    
    const isOtpValid = otp === findUser.otp;

    if (!isOtpValid) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 } // Bad Request
      );
    }

    // Set user as verified
    findUser.isVerified = true;
    await findUser.save();

    return NextResponse.json(
      { message: "Account verified successfully" },
      { status: 200 } // Success
    );
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error:", error.message);

    // Respond with a generic error message, avoiding internal information exposure
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 } // Internal Server Error
    );
  }
}
