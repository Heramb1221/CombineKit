import { Collection, Db, MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import { FREE_TIER_LIMIT, UserPdfUsage } from './models';

export class PdfUsageService {
  private client: Promise<MongoClient>;
  private db: Db | null = null;
  private collection: Collection<UserPdfUsage> | null = null;

  constructor() {
    this.client = clientPromise;
  }

  private async getCollection(): Promise<Collection<UserPdfUsage>> {
    if (this.collection) return this.collection;

    const client = await this.client;
    this.db = client.db('pdfs');
    this.collection = this.db.collection<UserPdfUsage>('user-usage');
    
    // Create an index on userId for faster lookups
    await this.collection.createIndex({ userId: 1 }, { unique: true });
    
    return this.collection;
  }

  /**
   * Tracks a PDF generation for a user and returns if they've exceeded their free tier limit
   * @param userId The user's ID
   * @returns Object containing usage info and whether the user has exceeded their free tier limit
   */
  async trackGeneration(userId: string): Promise<{ 
    usageCount: number; 
    hasExceededLimit: boolean;
    remainingGenerations: number;
  }> {
    const collection = await this.getCollection();
    // Find the user's current usage or create a new record
    const result = await collection.findOneAndUpdate(
      { userId },
      { 
        $inc: { generationCount: 1 },
        $set: { lastUpdated: new Date() }
      },
      { 
        upsert: true,
        returnDocument: 'after'
      }
    );
    const usageCount = result?.generationCount ?? 0;
    const hasExceededLimit = usageCount > FREE_TIER_LIMIT;
    const remainingGenerations = Math.max(0, FREE_TIER_LIMIT - usageCount);
    return {
      usageCount,
      hasExceededLimit,
      remainingGenerations
    };
  }

  /**
   * Gets the current usage for a user
   * @param userId The user's ID
   * @returns Object containing usage info
   */
  async getUserUsage(userId: string): Promise<{ 
    usageCount: number; 
    hasExceededLimit: boolean;
    remainingGenerations: number;
  }> {
    const collection = await this.getCollection();
    const usage = await collection.findOne({ userId });
    if (!usage) {
      return {
        usageCount: 0,
        hasExceededLimit: false,
        remainingGenerations: FREE_TIER_LIMIT
      };
    }
    const usageCount = usage.generationCount;
    const hasExceededLimit = usageCount >= FREE_TIER_LIMIT;
    const remainingGenerations = Math.max(0, FREE_TIER_LIMIT - usageCount);
    return {
      usageCount,
      hasExceededLimit,
      remainingGenerations
    };
  }

  /**
   * Resets a user's generation count (for admin purposes)
   * @param userId The user's ID
   */
  async resetUserUsage(userId: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { userId },
      { 
        $set: { 
          generationCount: 0,
          lastUpdated: new Date() 
        }
      },
      { upsert: true }
    );
  }
}

// Export a singleton instance
export const pdfUsageService = new PdfUsageService();