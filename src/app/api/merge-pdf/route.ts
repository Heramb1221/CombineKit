import { NextRequest, NextResponse } from 'next/server';
import PDFMerger from 'pdf-merger-js';
import { auth } from '@clerk/nextjs/server';
import { pdfUsageService } from '@/lib/pdf-usage-service';
import { FREE_TIER_LIMIT } from '@/lib/models';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const { userId } = await auth();
    // If no user is authenticated, return an error
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    // Check if the user has exceeded their free tier limit
    const userUsage = await pdfUsageService.getUserUsage(userId);
    if (userUsage.hasExceededLimit) {
      return NextResponse.json(
        { 
          error: 'Free tier limit exceeded', 
          limit: FREE_TIER_LIMIT,
          usageCount: userUsage.usageCount,
          requiresUpgrade: true 
        },
        { status: 403 }
      );
    }
    // Create a new PDF merger instance
    const merger = new PDFMerger();
    
    // Get form data from the request
    const formData = await request.formData();
    
    // Check if there are files to merge
    if (formData.entries().next().done) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }
    
    // Process each file in the form data
    const filePromises = [];
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Only process PDF files
        if (value.type !== 'application/pdf') {
          return NextResponse.json(
            { error: `File ${value.name} is not a PDF` },
            { status: 400 }
          );
        }
        
        // Convert the file to an ArrayBuffer
        const filePromise = value.arrayBuffer().then(buffer => {
          return {
            name: value.name,
            buffer
          };
        });
        
        filePromises.push(filePromise);
      }
    }
    
    // Wait for all file processing to complete
    const files = await Promise.all(filePromises);
    
    // Sort files by their key name if needed
    // This assumes the keys are in the format 'file0', 'file1', etc.
    files.sort((a, b) => {
      const keyA = a.name;
      const keyB = b.name;
      return keyA.localeCompare(keyB);
    });
    
    // Add each file to the merger
    for (const file of files) {
  // Save the buffer to a temp file
  const tempFilePath = path.join(os.tmpdir(), file.name);
  await fs.writeFile(tempFilePath, Buffer.from(file.buffer));
  await merger.add(tempFilePath);
  // Optionally delete temp files after merging (cleanup)
}
    
    // Merge the PDFs and get the result as a buffer
    const mergedPdfBuffer = await merger.saveAsBuffer();
    
    // Track this generation
    const updatedUsage = await pdfUsageService.trackGeneration(userId);
    
    // Return the merged PDF as a response
    return new NextResponse(Buffer.from(mergedPdfBuffer), {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="merged_document.pdf"',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});
  } catch (error) {
    console.error('Error merging PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to merge PDF files' },
      { status: 500 }
    );
  }
}