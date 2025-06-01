
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define a schema for contact form data for backend validation (optional but good practice)
const ContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10).max(500),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Optional: Validate data on the backend
    const validationResult = ContactFormSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, message: "Invalid data provided.", errors: validationResult.error.flatten() }, { status: 400 });
    }

    // Process the data (e.g., save to database, send email)
    // For now, we'll just log it to the console
    console.log("New contact message received:", validationResult.data);

    // Simulate successful processing
    return NextResponse.json({ success: true, message: "Message received successfully." });

  } catch (error) {
    console.error("Error processing contact form:", error);
    // It's good to provide a generic error message to the client
    // and log the specific error on the server.
    let message = "Error processing request.";
    if (error instanceof Error) {
      // Potentially log error.message or parts of it if safe, or use an error tracking service
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
