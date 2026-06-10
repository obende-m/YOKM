import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, amount, message } = body;

    if (!name || !email || !amount) {
      return NextResponse.json(
        { error: "Name, email, and amount are required." },
        { status: 400 }
      );
    }

    // In a real application, you would generate a Paystack transaction reference here
    console.log("Donation request initialized:", { name, email, amount, message });

    return NextResponse.json({
      success: true,
      reference: `YOKM-${Math.floor(100000 + Math.random() * 900000)}`,
      checkoutUrl: `https://checkout.paystack.com/simulate-checkout`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while initializing donation." },
      { status: 500 }
    );
  }
}
