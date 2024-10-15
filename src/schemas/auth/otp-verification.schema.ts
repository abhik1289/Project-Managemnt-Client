import { z } from "zod";

export const otpVerificationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must be a 6-digit number" }),
});

// Example usage (to validate form data):
const validateForm = (formData: { email: string; otp: string }) => {
  try {
    formSchema.parse(formData);
    console.log("Validation succeeded");
  } catch (err) {
    if (err instanceof z.ZodError)
