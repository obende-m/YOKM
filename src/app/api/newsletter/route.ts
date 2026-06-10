import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // In a real application, you would add the email to Mailchimp/ConvertKit/database
    console.log("Newsletter subscription received:", email);

    return NextResponse.json({
      success: true,
      message: "You have successfully subscribed to YOKM updates.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing subscription." },
      { status: 500 }
    );
  }
}
