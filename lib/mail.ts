import nodemailer from "nodemailer";

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send an email using Nodemailer
 * Requires SMTP configuration in environment variables
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  try {
    // Validate SMTP configuration
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD
    ) {
      console.error(
        "SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD in .env"
      );
      return false;
    }

    const mailOptions = {
      from:
        options.from ||
        `"Autorithm" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

/**
 * Verify SMTP connection
 */
export async function verifySMTPConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("SMTP connection verified");
    return true;
  } catch (error) {
    console.error("SMTP connection failed:", error);
    return false;
  }
}
