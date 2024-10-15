import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  otp: string; // Add OTP prop
  verificationToken: string; // Add verification token prop
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  otp,
  verificationToken,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h1 style={{ color: "#333" }}>Welcome, {firstName}!</h1>
    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
      Thank you for signing up! To activate your account, please verify your
      email address.
    </p>

    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
      Your One-Time Password (OTP) is: <strong>{otp}</strong>
    </p>

    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
      Click the button below to verify your account:
    </p>

    <a
      href={`${process.env.CLIENT_URl}/verify?token=${verificationToken}`}
      style={{
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "16px",
      }}
    >
      Verify Account
    </a>

    <p style={{ fontSize: "14px", lineHeight: "1.5", marginTop: "20px" }}>
      If you did not create an account, please ignore this email.
    </p>

    <footer style={{ marginTop: "30px", fontSize: "12px", color: "#777" }}>
      &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
    </footer>
  </div>
);
