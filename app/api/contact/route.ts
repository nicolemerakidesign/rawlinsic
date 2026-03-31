import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, interest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send email via Resend API if available, otherwise use a simple fetch to a mail endpoint
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Rawlins IC Website <onboarding@resend.dev>",
          to: "nicole@rawlinsic.com",
          subject: `New Contact Form: ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization || "Not provided"}</p>
            <p><strong>Area of Interest:</strong> ${interest || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
          reply_to: email,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Resend error:", errData);
        return NextResponse.json(
          { error: "Failed to send email." },
          { status: 500 }
        );
      }
    } else {
      // Fallback: log to server console when no email service configured
      console.log("=== CONTACT FORM SUBMISSION ===");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Organization:", organization);
      console.log("Interest:", interest);
      console.log("Message:", message);
      console.log("=== END ===");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
