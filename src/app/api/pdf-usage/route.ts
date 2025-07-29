import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { pdfUsageService } from '@/lib/pdf-usage-service';
import { FREE_TIER_LIMIT } from '@/lib/models';

// GET: Get usage info for authenticated user
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    const usage = await pdfUsageService.getUserUsage(userId);
    if (!usage) {
      return NextResponse.json(
        { error: 'No usage data found' }, 
        { status: 404 }
      );
    }
    return NextResponse.json({
      usageCount: usage.usageCount ?? 0,
      limit: FREE_TIER_LIMIT,
      hasExceededLimit: usage.hasExceededLimit ?? false,
      remainingGenerations: usage.remainingGenerations ?? FREE_TIER_LIMIT,
    });
  } catch (error) {
    console.error('Error getting PDF usage:', error);
    return NextResponse.json(
      { error: 'Failed to get PDF usage' },
      { status: 500 }
    );
  }
}

// POST: Reset usage for authenticated user
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    await pdfUsageService.resetUserUsage(userId);
    return NextResponse.json({ message: 'Usage reset successfully' });
  } catch (error) {
    console.error('Error resetting PDF usage:', error);
    return NextResponse.json(
      { error: 'Failed to reset PDF usage' },
      { status: 500 }
    );
  }
}
