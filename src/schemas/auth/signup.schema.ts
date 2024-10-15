import { z } from "zod";
import { technicalRoles, nonTechnicalRoles } from "@/constants/auth";
const allRoles:any = [...technicalRoles, ...nonTechnicalRoles];

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long.")
    .max(10, "First name cannot exceed 10 characters."),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long.")
    .max(10, "Last name cannot exceed 10 characters."),
  personalEmail: z.string().email("Please provide a valid email address."),
  workEmail: z
    .string()
    .email("Please provide a valid work email address.")
    .optional(),
  domain: z.enum(["NonTech", "tech"], {
    errorMap: (issue) => {
      return { message: "Please select a valid domain (NonTech or Tech)." };
    },
  }),
  role: z.enum(allRoles, {
    errorMap: (issue) => {
      return { message: "Please select a valid role." };
    },
  }),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .max(10, "Password cannot exceed 10 characters.")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character."
    ),
});
