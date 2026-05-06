'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
      user, loading,
      signIn: async (e, p) => { await signInWithEmailAndPassword(auth, e, p); },
      signUp: async (e, p) => { await createUserWithEmailAndPassword(auth, e, p); },
      signOut: async () => { await firebaseSignOut(auth); },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
// //This will basically bypass the firebase so i will work locally ~ Ritesh Verma Codes 
// //testing code
// 'use client';
// import { createContext, useContext, useState, type ReactNode } from 'react';

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   // Simulates a logged-in user — change to null to test logged-out UI
//   const [user] = useState({ uid: 'mock-user-123', email: 'demo@wishbloom.app', displayName: 'Demo User' });

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading: false,
//       signIn: async () => {},
//       signUp: async () => {},
//       signOut: async () => {},
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used within AuthProvider');
//   return ctx;
// }