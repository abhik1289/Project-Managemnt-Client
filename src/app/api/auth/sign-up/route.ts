import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
export async function POST(req: NextRequest, res: NextResponse) {
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
}
