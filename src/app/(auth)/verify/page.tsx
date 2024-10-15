"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <div>
      <h1>Account Verification</h1>
      <p>{}</p>
    </div>
  );
}
