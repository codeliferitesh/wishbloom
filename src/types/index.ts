import { Timestamp } from 'firebase/firestore';

/**
 * Represents a birthday page document in Firestore.
 */
export interface Birthday {
  id: string;
  userId: string;
  name: string;
  message: string;
  createdAt: Timestamp;
}

/**
 * Data required to create a new birthday page.
 * Excludes auto-generated fields.
 */
export type CreateBirthdayInput = Pick<Birthday, 'id' | 'userId' | 'name' | 'message'>;

/**
 * Lightweight representation used for dashboard list views.
 */
export type BirthdaySummary = Omit<Birthday, 'message'>;

/**
 * Firebase Auth user shape used throughout the app.
 */
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
