import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

// Establish DB connection before handling requests
connect();

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request
    const userInfos = await req.json();
    const {
      firstName,
      lastName,
      personalEmail,
      workEmail,
      domain,
      role,
      password,
    } = userInfos;

    // Validate if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !personalEmail ||
      !domain ||
      !role ||
      !password
    ) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 } // Bad Request
      );
    }

    // Check if the user already exists with the provided personal email
    const existingUser = await User.findOne({ personalEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already in use" },
        { status: 409 } // Conflict
      );
    }
 

    
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const newUser = await User.create({
      firstName,
      lastName,
      personalEmail,
      workEmail,
    
      domain,
      role,
      password: hashedPassword, 
    });

    
    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          personalEmail: newUser.personalEmail,
          workEmail: newUser.workEmail,
          domain: newUser.domain,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 } // Created
    );
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Sign-Up Error:", error.message);

    // Respond with a generic error message, avoiding internal information exposure
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 } // Internal Server Error
    );
  }
}
