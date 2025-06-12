
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { firestore, storage } from '@/lib/firebase-admin'; 
import { Timestamp } from 'firebase-admin/firestore'; 

const CareerApplicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Valid phone is required"),
  email: z.string().email("Valid email is required"),
  position: z.string().min(1, "Position is required"),
  message: z.string().min(10).max(500).optional().or(z.literal('')),
});


export async function POST(request: NextRequest) {
  let receivedFormData: FormData | null = null; // Declare here to be accessible in catch

  try {
    receivedFormData = await request.formData(); // Assign here
    
    const applicationData = {
      name: receivedFormData.get('name') as string,
      phone: receivedFormData.get('phone') as string,
      email: receivedFormData.get('email') as string,
      position: receivedFormData.get('position') as string,
      message: (receivedFormData.get('message') as string | null) || undefined,
    };

    const validationResult = CareerApplicationSchema.safeParse(applicationData);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, message: "Invalid data provided.", errors: validationResult.error.flatten() }, { status: 400 });
    }
    
    const cvFile = receivedFormData.get('cv') as File | null;
    let cvFileUrl = null;
    let cvFilePath = null;

    if (cvFile) {
      // Server-side file validation
      if (cvFile.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({ success: false, message: "CV file size exceeds 5MB limit." }, { status: 400 });
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(cvFile.type)) {
        return NextResponse.json({ success: false, message: "Invalid CV file type. Only PDF, DOC, DOCX allowed." }, { status: 400 });
      }

      if (typeof storage.bucket !== 'function') {
        console.error("Firebase Storage might not be initialized correctly. CV upload will be skipped.");
        // Potentially return an error or proceed without CV based on requirements
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
      }
    }

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

    return NextResponse.json({ success: true, message: "Application received successfully." });

  } catch (error) {
    console.error("Error processing career application:", error);
    let responseMessage = "Error processing application.";
     if (error instanceof Error) {
      responseMessage = error.message;
    }
    
    const hadCvIntent = receivedFormData ? receivedFormData.has('cv') : false;

    if (typeof firestore.collection !== 'function' || (hadCvIntent && typeof storage.bucket !== 'function')) {
        responseMessage = "A backend service (database or storage) is not available. Please check server configuration and logs.";
    }
    return NextResponse.json({ success: false, message: responseMessage }, { status: 500 });
  }
}
