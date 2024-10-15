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
import { useToast } from "@/hooks/use-toast";
import HashLoader from "react-spinners/HashLoader";

export default function AccountActivation() {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const getEmail = searchParams.get("email") || "";

  useEffect(() => {
    if (!getEmail) {
      router.push("/sign-up");
    } else {
      setEmail(getEmail);
    }
  }, [getEmail, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisable(true);
    setLoading(true);
    // Basic validation for OTP length
    if (otp.length !== 6) {
      alert("OTP must be exactly 6 digits.");
      return;
    }

    try {
      // console.log(email,otp)
      // Call your backend API to verify OTP
      const response = await fetch("/api/auth/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.status === 200) {
        toast({
          description: "verification successful",
        });
        setTimeout(() => {
          router.replace(`/sign-in`);
        }, 4000);
      } else {
        toast({
          description: "Wrong otp",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("An error occurred:", error);
      toast({
        description: "Internal server error",
        variant: "destructive",
      });
    }
    setDisable(false);
    setLoading(false);
  };

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Activate Your Account</CardTitle>
        <CardDescription>Enter the OTP sent to your email</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                id="email"
                placeholder="Enter your email"
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="otp">OTP</Label>
              <InputOTP
                value={otp}
                onChange={(value) => setOtp(value)}
                maxLength={6}
              >
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
          <Button disabled={disable} className="mt-3 w-full" type="submit">
            {loading ? <HashLoader color="white" size={20} /> : "Done"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
