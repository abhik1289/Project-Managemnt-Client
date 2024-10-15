"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default function AccountActivation() {
  // const pathName = usePa
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const searchParams = useSearchParams();
  const getEmail = searchParams.get("email") || "";
  if(!getEmail){
    router.push('/sign-up')
  }
  useEffect(() => {
    setEmail(getEmail);
  }, [searchParams]);
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Activate Your Account</CardTitle>
        <CardDescription>Enter OTP which is send your mail</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="name">Email</Label>
              <Input value={email} id="name" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">OTP</Label>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <Button className="mt-3 w-full">Active</Button>
        </form>
      </CardContent>
    </Card>
  );
}
