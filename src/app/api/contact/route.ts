import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // In a real application, you would send an email or write to a database here.
    console.log("Contact submission received:", { name, email, subject, message });

    return NextResponse.json({ success: true, message: "Thank you for contacting YOKM." });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
