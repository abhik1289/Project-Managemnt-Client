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
    // const 
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error(" Error:", error.message);

    // Respond with a generic error message, avoiding internal information exposure
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 } // Internal Server Error
    );
  }
}
