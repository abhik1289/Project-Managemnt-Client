export function generateOTP(length: number = 6): string {
    // Generate a random number between 0 and 999999, then convert it to a string
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    // Ensure the OTP is always the specified length (6 digits)
    return otp.slice(0, length);
  }
  

  