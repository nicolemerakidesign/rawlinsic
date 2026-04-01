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

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      // Send via Resend
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
        console.error("Resend error:", await res.text());
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
      }
    } else {
      // Fallback: send via mailto-style notification using a simple webhook
      // For now, log and return success so the form doesn't appear broken
      console.log("=== CONTACT FORM SUBMISSION ===");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Organization: ${organization}`);
      console.log(`Interest: ${interest}`);
      console.log(`Message: ${message}`);
      console.log("=== END ===");
      console.log("");
      console.log("NOTE: To receive emails, add RESEND_API_KEY to your Vercel environment variables.");
      console.log("Sign up free at https://resend.com and create an API key.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
// trigger redeploy
