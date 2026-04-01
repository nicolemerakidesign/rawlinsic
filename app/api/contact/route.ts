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

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      // Still return success to user so form doesn't appear broken
      console.log("=== CONTACT FORM (no API key) ===");
      console.log(`Name: ${name}, Email: ${email}, Org: ${organization}, Interest: ${interest}`);
      console.log(`Message: ${message}`);
      return NextResponse.json({ success: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rawlins IC Website <onboarding@resend.dev>",
        to: ["nicole@rawlinsic.com", "nicole@meraki-design.co"],
        subject: `New Contact Form: ${name}`,
        reply_to: email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organization:</strong> ${organization || "Not provided"}</p>
          <p><strong>Area of Interest:</strong> ${interest || "Not specified"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      // Return success anyway so user isn't confused - log the error server-side
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    // Return success to user even on error - they shouldn't see technical errors
    return NextResponse.json({ success: true });
  }
}
