import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters long.")
    .max(10, "First name cannot exceed 10 characters."),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters long.")
    .max(10, "Last name cannot exceed 10 characters."),
  personalEmail: z.string()
    .email("Please provide a valid email address."),
  workEmail: z.string()
    .email("Please provide a valid work email address.")
    .optional(),
  personalMobileNo: z.string()
    .length(10, "Personal mobile number must be exactly 10 digits."),
  workMobileNo: z.string()
    .length(10, "Work mobile number must be exactly 10 digits.")
    .optional(),
  destination: z.string(),
  password: z.string()
    .min(5, "Password must be at least 5 characters long.")
    .max(10, "Password cannot exceed 10 characters.")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character.")
});
