import { ObjectId } from 'mongodb';

export interface UserPdfUsage {
  _id?: ObjectId;
  userId: string;
  generationCount: number;
  lastUpdated: Date;
}

export const FREE_TIER_LIMIT = 5;