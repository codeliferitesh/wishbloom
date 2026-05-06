import { collection, doc, setDoc, getDoc, query, where, getDocs,
  serverTimestamp, limit, FirestoreError } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Birthday, CreateBirthdayInput } from '@/types';

const COLLECTION = 'birthdays';

function handleError(err: unknown, ctx: string): never {
  if (err instanceof FirestoreError) throw new Error(`DB error (${err.code}): ${err.message}`);
  throw err;
}

export async function createBirthday(data: CreateBirthdayInput): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTION, data.id), {
      ...data, createdAt: serverTimestamp(),
    });
  } catch (err) { handleError(err, 'createBirthday'); }
}

export async function getBirthdayById(id: string): Promise<Birthday | null> {
  try {
    // Fetch directly by document ID — no index needed
    const ref = doc(db, COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as Birthday;
  } catch (err) { handleError(err, 'getBirthdayById'); }
}

export async function getUserBirthdays(userId: string): Promise<Birthday[]> {
  try {
    const q = query(collection(db, COLLECTION), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as Birthday);
  } catch (err) { handleError(err, 'getUserBirthdays'); }
}
// //testing code
// import type { Birthday, CreateBirthdayInput } from '@/types';

// const mockBirthdays: Birthday[] = [
//   {
//     id: 'abc123',
//     userId: 'mock-user-123',
//     name: 'Sarah',
//     message: 'Wishing you all the happiness in the world on your special day! 🎉',
//     createdAt: null as any,
//   },
//   {
//     id: 'xyz789',
//     userId: 'mock-user-123',
//     name: 'Uncle Mike',
//     message: 'Happy birthday to the coolest uncle ever! Hope this year brings you joy.',
//     createdAt: null as any,
//   },
// ];

// export async function createBirthday(data: CreateBirthdayInput): Promise<void> {
//   console.log('Mock createBirthday:', data);
// }

// export async function getBirthdayById(id: string): Promise<Birthday | null> {
//   return mockBirthdays.find(b => b.id === id) ?? {
//     id,
//     userId: 'mock-user-123',
//     name: 'Alex',
//     message: 'Happy Birthday! This is a demo birthday page. 🎂',
//     createdAt: null as any,
//   };
// }

// export async function getUserBirthdays(userId: string): Promise<Birthday[]> {
//   return mockBirthdays;
// }