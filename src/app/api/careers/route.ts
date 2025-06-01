
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { firestore, storage } from '@/lib/firebase-admin'; // Import Firestore and Storage instances
import { Timestamp } from 'firebase-admin/firestore'; // For server-side timestamp

const CareerApplicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Valid phone is required"),
  email: z.string().email("Valid email is required"),
  position: z.string().min(1, "Position is required"),
  message: z.string().min(10).max(500).optional().or(z.literal('')),
});


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const applicationData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      message: (formData.get('message') as string | null) || undefined,
    };

    const validationResult = CareerApplicationSchema.safeParse(applicationData);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, message: "Invalid data provided.", errors: validationResult.error.flatten() }, { status: 400 });
    }
    
    const cvFile = formData.get('cv') as File | null;
    let cvFileUrl = null;
    let cvFilePath = null;

    if (cvFile) {
      console.log(`CV File details - Name: ${cvFile.name}, Type: ${cvFile.type}, Size: ${cvFile.size} bytes`);
      
      // Convert File to Buffer for upload with firebase-admin
      const fileBuffer = Buffer.from(await cvFile.arrayBuffer());
      
      // Create a unique path for the file in Firebase Storage
      const sanitizedFileName = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_'); // Sanitize filename
      cvFilePath = `cvs/${Date.now()}_${sanitizedFileName}`;
      
      const bucket = storage.bucket(); // Default bucket
      const fileUpload = bucket.file(cvFilePath);

      await fileUpload.save(fileBuffer, {
        metadata: {
          contentType: cvFile.type,
        },
      });

      // Get public URL (optional, ensure your Storage rules allow public reads if needed, or use signed URLs)
      // For simplicity, we'll just store the path here. You might want to get a signed URL for secure access.
      // cvFileUrl = await fileUpload.getSignedUrl({ action: 'read', expires: '03-09-2491' });
      // cvFileUrl = cvFileUrl[0];
      
      // For now, we'll just acknowledge it's uploaded and store the path.
      // Public URLs are generally not recommended without proper security.
      // Storing the path allows an admin to retrieve it via Firebase console or Admin SDK.
      cvFileUrl = `gs://${bucket.name}/${cvFilePath}`; // Store the gs:// path

      console.log(`CV File uploaded to Firebase Storage at: ${cvFilePath}`);
    } else {
      console.log("No CV file was uploaded or it was not found in FormData.");
    }

    // Save application data to Firestore
    const careerApplicationsRef = firestore.collection('careerApplications');
    await careerApplicationsRef.add({
      ...validationResult.data,
      cvFileUrl: cvFileUrl, // URL or path to the CV in Firebase Storage
      cvFilePath: cvFilePath, // The raw path in storage bucket
      receivedAt: Timestamp.now(),
      status: 'new',
    });

    console.log("New career application received and saved to Firestore:", validationResult.data);
    if (cvFileUrl) console.log("CV Storage URL:", cvFileUrl);


    return NextResponse.json({ success: true, message: "Application received successfully." });

  } catch (error)
 {
    console.error("Error processing career application:", error);
    let message = "Error processing application.";
     if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
