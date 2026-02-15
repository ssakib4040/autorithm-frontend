import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { purchaseConfirmationEmailTemplate } from "@/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      userName,
      productName,
      price,
      category,
      downloadLink,
      orderId,
    } = body;

    // Validate required fields
    if (!email || !userName || !productName || !price || !orderId) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: email, userName, productName, price, orderId",
        },
        { status: 400 },
      );
    }

    // Send purchase confirmation email
    const emailSent = await sendEmail({
      to: email,
      subject: `Purchase Confirmation: ${productName}`,
      html: purchaseConfirmationEmailTemplate(
        userName,
        productName,
        price,
        category || "Automation",
        downloadLink || "https://autorithm.com/dashboard/purchases",
        orderId,
      ),
    });

    if (!emailSent) {
      return NextResponse.json(
        { message: "Failed to send confirmation email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Purchase confirmation email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Purchase email send error:", error);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
