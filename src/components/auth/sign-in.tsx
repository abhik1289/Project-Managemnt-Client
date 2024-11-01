"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import HashLoader from "react-spinners/HashLoader";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth/login.schema";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export function SignInBox() {
  const { data: session, status } = useSession();

  // console.log(data)
  console.log("SESSION DATA IS", status);
  if (status === "authenticated") {
    redirect("/");
  }
  const { toast } = useToast();
  const router = useRouter();

  // Form setup using react-hook-form and zod resolver
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // State for button disable and loading indicator
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setDisable(true);
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await axios.post("/api/auth/sign-in", {
        email: email,
        password,
      });

      // Handle success
      if (response.status === 200) {
        toast({
          description: "Successfully logged in!",
        });
        setTimeout(() => {
          router.replace(`/`);
        }, 4000);
      } else {
        toast({
          description: "Wrong email or password",
        });
      }
    } catch (error: any) {
      console.log(error);
      // Handle error and show in toast
      toast({
        description: error?.response?.data?.error || "Internal Server Error",
        variant: "destructive",
      });
    }

    // Reset states after the request completes
    setDisable(false);
    setLoading(false);
  }

  return (
    <Card className="md:w-4/12 w-10/12">
      <CardHeader>
        <CardTitle>Log In Now</CardTitle>
        <CardDescription>
          Log in to access your projects, collaborate with your team, and stay
          on top of your tasks effortlessly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      disabled={disable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      disabled={disable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit and Google Login Button */}
            <div className="wrapper flex mt-4 gap-2 justify-start">
              <Button className="w-full" type="submit" disabled={disable}>
                {loading ? <HashLoader color="white" size={20} /> : "Log in"}
              </Button>
              <button type="button" onClick={() => signIn("google")}>
                sign in with gooogle
              </button>
            </div>
          </form>
        </Form>
      </CardContent>

      {/* Sign Up Link */}
      <CardFooter className="flex flex-col">
        <p>
          Don’t have an account? <Link href="/sign-up">Sign Up</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
