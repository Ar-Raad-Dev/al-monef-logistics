
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
      
      // Check if storage is available
      if (typeof storage.bucket !== 'function') {
        console.error("Firebase Storage might not be initialized correctly. CV upload will be skipped.");
        // Decide if you want to fail the request or proceed without CV upload
        // For now, we'll log and proceed, but you might want to return an error
        // return NextResponse.json({ success: false, message: "File storage service is not available. Please check server configuration." }, { status: 500 });
      } else {
        const fileBuffer = Buffer.from(await cvFile.arrayBuffer());
        const sanitizedFileName = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        cvFilePath = `cvs/${Date.now()}_${sanitizedFileName}`;
        
        const bucket = storage.bucket(); 
        const fileUpload = bucket.file(cvFilePath);

        await fileUpload.save(fileBuffer, {
          metadata: {
            contentType: cvFile.type,
          },
        });
        cvFileUrl = `gs://${bucket.name}/${cvFilePath}`;
        console.log(`CV File uploaded to Firebase Storage at: ${cvFilePath}`);
      }
    } else {
      console.log("No CV file was uploaded or it was not found in FormData.");
    }

    // Check if firestore is available
    if (typeof firestore.collection !== 'function') {
         console.error("Firestore might not be initialized correctly. Application data cannot be saved.");
         return NextResponse.json({ success: false, message: "Database service is not available. Please check server configuration." }, { status: 500 });
    }
    const careerApplicationsRef = firestore.collection('careerApplications');
    await careerApplicationsRef.add({
      ...validationResult.data,
      cvFileUrl: cvFileUrl, 
      cvFilePath: cvFilePath, 
      receivedAt: Timestamp.now(),
      status: 'new',
    });

    console.log("New career application received and saved to Firestore:", validationResult.data);
    if (cvFileUrl) console.log("CV Storage URL:", cvFileUrl);


    return NextResponse.json({ success: true, message: "Application received successfully." });

  } catch (error) {
    console.error("Error processing career application:", error);
    let responseMessage = "Error processing application.";
     if (error instanceof Error) {
      responseMessage = error.message;
    }
    // More general check if it's a Firebase service issue
    if (typeof firestore.collection !== 'function' || (formData.has('cv') && typeof storage.bucket !== 'function')) {
        responseMessage = "A backend service (database or storage) is not available. Please check server configuration and logs.";
    }
    return NextResponse.json({ success: false, message: responseMessage }, { status: 500 });
  }
}
