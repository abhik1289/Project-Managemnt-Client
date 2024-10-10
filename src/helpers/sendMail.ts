import { EmailTemplate } from "@/components/template/email-template";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server"; // Import for server-side rendering

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({
  email,
  firstName,
  verificationToken,
  otp,
}: {
  email: string;
  firstName: string;
  verificationToken: string;
  otp: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Account Verification",
      react: EmailTemplate({ firstName, otp, verificationToken }), // Send the rendered HTML
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error: any) {
    console.error("Error sending email:", error); // Log error for debugging
    return Response.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
