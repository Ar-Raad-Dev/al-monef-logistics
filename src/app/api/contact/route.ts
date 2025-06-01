
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { firestore } from '@/lib/firebase-admin'; // Import Firestore instance
import { Timestamp } from 'firebase-admin/firestore'; // For server-side timestamp

// Define a schema for contact form data
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message cannot exceed 1000 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const validationResult = ContactFormSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, message: "Invalid data provided.", errors: validationResult.error.flatten() }, { status: 400 });
    }

    const { name, email, subject, message } = validationResult.data;

    // Save to Firestore
    const contactMessagesRef = firestore.collection('contactMessages');
    await contactMessagesRef.add({
      name,
      email,
      subject,
      message,
      receivedAt: Timestamp.now(), // Use server-side timestamp
      status: 'new', // You can add a status field for tracking
    });

    console.log("New contact message received and saved to Firestore:", validationResult.data);

    return NextResponse.json({ success: true, message: "Message received successfully and saved." });

  } catch (error) {
    console.error("Error processing contact form:", error);
    let responseMessage = "Error processing request.";
    if (error instanceof Error) {
       responseMessage = error.message;
    }
    // Check if error might be related to Firestore service
    if (typeof firestore.collection !== 'function') {
        responseMessage = "Database service is not available. Please check server configuration and logs.";
        console.error("Firestore might not be initialized correctly.");
    }
    return NextResponse.json({ success: false, message: responseMessage }, { status: 500 });
  }
}
