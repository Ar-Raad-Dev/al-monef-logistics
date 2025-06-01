
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define a schema for basic validation on the backend.
// Note: File validation (type, size) is more complex with FormData and often done after receiving the file.
const CareerApplicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Valid phone is required"),
  email: z.string().email("Valid email is required"),
  position: z.string().min(1, "Position is required"),
  message: z.string().min(10).max(500).optional().or(z.literal('')),
  // CV file itself is handled separately via FormData
});


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const applicationData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      message: formData.get('message') as string | undefined, // formData.get can return null
    };

    const validationResult = CareerApplicationSchema.safeParse(applicationData);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, message: "Invalid data provided.", errors: validationResult.error.flatten() }, { status: 400 });
    }
    
    const cvFile = formData.get('cv') as File | null;

    // Log the received text data
    console.log("New career application received (text data):", validationResult.data);

    if (cvFile) {
      console.log(`CV File details - Name: ${cvFile.name}, Type: ${cvFile.type}, Size: ${cvFile.size} bytes`);
      // IMPORTANT: Actual file storage is NOT implemented here.
      // In a real application, you would upload `cvFile` to a cloud storage service like:
      // - Firebase Storage (gsutil, or using firebase-admin SDK if permissions allow server-side upload)
      // - AWS S3 (using AWS SDK)
      // - Google Cloud Storage (using Google Cloud SDK)
      // Example placeholder: await saveToCloudStorage(cvFile);
      // For now, we are only logging its metadata.
    } else {
      console.log("No CV file was uploaded or it was not found in FormData.");
    }

    return NextResponse.json({ success: true, message: "Application received successfully." });

  } catch (error) {
    console.error("Error processing career application:", error);
    let message = "Error processing application.";
     if (error instanceof Error) {
      // Potentially log error.message
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
