"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from "next/link";
import HashLoader    from "react-spinners/HashLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signUpSchema } from "@/schemas/auth/signup.schema";
import { destinations } from "@/constants/auth";
import { useRouter ,redirect} from "next/navigation";
import { technicalRoles } from "@/constants/auth";
import { nonTechnicalRoles } from "@/constants/auth";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    redirect("/");
  }
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  // UseForm setup with validation schema
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      personalEmail: "",
      workEmail: "",
      domain: undefined,
      password: "",
      role: "",
    },
  });

  // Submit Handler
  const onSubmit = async (values: any) => {
    setDisable(true);
    setLoading(true);
    const {
      firstName,
      lastName,
      personalEmail,
      workEmail,
      domain,
      password,
      role,
    } = values;

    try {
      // Make API call to sign-up endpoint
      const response = await axios.post("/api/auth/sign-up", {
        firstName,
        lastName,
        personalEmail,
        workEmail,
        domain,
        password,
        role,
      });
      console.log(response);
      // Optional: Check for success/failure status in response
      if (response.status === 201) {
        toast({
          description: "Registration Successfully",
          // variant: "destructive",
        });
        setTimeout(() => {
          router.replace(`/active?email=${personalEmail}&isActive=false`);
        }, 4000);
        // console.log(response.data.success);
        // Successful sign-up, redirect to activation page
        //
      } else {
        toast({
          description: "Error",
          variant: "destructive",
        });
        // Handle unexpected status codes
        console.error("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      toast({
        description: error.response.data.error || "Internal Server Error",
        variant: "destructive",
      });
    }
    setDisable(false);
    setLoading(false);
  };

  return (
    <div className="md:w-8/12 w-full m-auto">
      <Card className="my-2 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Register Now</CardTitle>
          <CardDescription>
            Simplify project planning, enhance team collaboration, and manage
            tasks seamlessly. Register now to access powerful tools!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Row 1: First and Last Name */}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Personal and Work Email */}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="personalEmail"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Personal Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workEmail"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Work Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@work.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Destination && Role*/}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Domain</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDomain(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Domain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {destinations.map((item) => (
                            <SelectItem key={item.id} value={item.value}>
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Conditionally render roles based on selected domain */}
                          {}
                          {selectedDomain === "tech" &&
                            technicalRoles.map((role) => (
                              <SelectItem key={role.id} value={role.value}>
                                {role.title}
                              </SelectItem>
                            ))}
                          {selectedDomain === "NonTech" &&
                            nonTechnicalRoles.map((role) => (
                              <SelectItem key={role.id} value={role.value}>
                                {role.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 4: Password */}
              <div className="flex flex-wrap  w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-10/12">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <MdOutlineVisibilityOff />
                            ) : (
                              <MdOutlineVisibility />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button disabled={disable} type="submit">
                {loading?<HashLoader   color="white" size={20} />:'Register'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
