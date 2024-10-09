"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/auth/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { destinations } from "@/constants/auth";
import { MdOutlineVisibility,MdOutlineVisibilityOff  } from "react-icons/md";
function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      personalEmail: "",
      workEmail: "",
      personalMobileNo: "",
      workMobileNo: "",
      destination: "",
    },
  });
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }
  return (
    <div className="md:w-8/12 w-10/12 m-auto">
      <Card className="my-2">
        <CardHeader>
          <CardTitle className="text-2xl">Registration Now</CardTitle>
          <CardDescription>
            Simplify project planning, enhance team collaboration, and manage
            tasks seamlessly. Register now to access powerful tools!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* this is row 1 */}
              <div className="row_1 flex my-1 flex-wrap gap-2">
                <div className="input_wrapper md:w-5/12 w-full">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>FirstName</FormLabel>
                        <FormControl>
                          <Input placeholder="Jhon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input_wrapper md:w-5/12 w-full">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LastName</FormLabel>
                        <FormControl>
                          <Input placeholder="Dio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* this is row 2 */}
              <div className="row_2 flex my-1 flex-wrap gap-2">
                <div className="input_wrapper md:w-5/12 w-full">
                  <FormField
                    control={form.control}
                    name="personalEmail"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Personal Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jhon@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="input_wrapper md:w-5/12 w-full">
                  <FormField
                    control={form.control}
                    name="workEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jsonweb@dr.in" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* this is row 3 */}
              <div className="row_3 flex my-1 flex-wrap gap-2">
                <div className="input_wrapper md:w-5/12 w-full">
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Destinations" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {destinations &&
                              destinations.map((item) => {
                                return (
                                  <SelectItem key={item.id} value={item.title}>
                                    {item.title}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
               {/* this is row 4 */}
               <div className="row_3 flex my-1 flex-wrap gap-2">
               <div className="input_wrapper w-full">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"} // Toggle type between "password" and "text"
                  placeholder="Enter your password"
                  {...field}
                />
                {/* Show/Hide Toggle Button */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  onClick={() => setShowPassword((prev:any) => !prev)}
                >
                  {!showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>Already have a account ? Sign in</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
