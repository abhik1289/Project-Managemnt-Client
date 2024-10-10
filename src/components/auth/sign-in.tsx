"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
export function SignIn() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: any) {
    console.log("first");
    console.log(values);
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="json@gmail" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="wrapper flex mt-4 gap-2 justify-start">
              <Button className="w-full" type="submit">
                Submit
              </Button>
              <Button className="w-full" variant={"outline"}>
                <FcGoogle className="mr-2 h-4 w-4" /> Login with Email
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>
          You have no account. <Link href="/sign-up">Sign Up</Link>{" "}
        </p>
      </CardFooter>
    </Card>
  );
}
