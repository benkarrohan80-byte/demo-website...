import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { User } from '../types';
import { FF_IMAGES } from '../assets/freeFireAssets';

// Import generated config json
// @ts-ignore
import configJson from '../../firebase-applet-config.json';

const getFirebaseConfig = () => {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || configJson.apiKey || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || configJson.authDomain || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || configJson.projectId || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || configJson.storageBucket || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || configJson.messagingSenderId || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || configJson.appId || "",
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || configJson.firestoreDatabaseId || "",
  };
};

export const firebaseConfig = getFirebaseConfig();

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey.startsWith('AIza') &&
  !firebaseConfig.apiKey.includes('placeholder') && 
  !firebaseConfig.apiKey.includes('demo') &&
  firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
    dbInstance = firebaseConfig.firestoreDatabaseId 
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  } catch (err) {
    console.error('Firebase initialization error:', err);
  }
}

export const auth = authInstance as Auth;
export const db = dbInstance as Firestore;

/**
 * Fetch or create Firestore user profile document 'users/{uid}'
 */
export async function syncUserProfile(fbUser: FirebaseUser): Promise<User> {
  if (!db) {
    return {
      id: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Gamer',
      email: fbUser.email || '',
      avatar: FF_IMAGES.characterKelly,
      role: fbUser.email?.toLowerCase().includes('admin') ? 'admin' : 'user',
      diamonds: 500,
      inGameId: 'SQ_' + Math.floor(100000 + Math.random() * 900000),
      totalEarnings: 0,
      matchesPlayed: 0,
      wins: 0,
      kdRatio: 4.2,
      tier: 'Grandmaster',
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: fbUser.emailVerified
    };
  }

  const userDocRef = doc(db, 'users', fbUser.uid);
  
  try {
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        id: fbUser.uid,
        name: data.name || fbUser.displayName || fbUser.email?.split('@')[0] || 'Gamer',
        email: fbUser.email || '',
        avatar: data.avatar || FF_IMAGES.characterKelly,
        role: data.role || (fbUser.email?.toLowerCase().includes('admin') ? 'admin' : 'user'),
        diamonds: data.diamonds ?? 500,
        inGameId: data.inGameId || 'SQ_' + Math.floor(100000 + Math.random() * 900000),
        totalEarnings: data.totalEarnings ?? 0,
        matchesPlayed: data.matchesPlayed ?? 0,
        wins: data.wins ?? 0,
        kdRatio: data.kdRatio ?? 4.2,
        tier: data.tier || 'Grandmaster',
        createdAt: data.createdAt || new Date().toISOString().split('T')[0],
        isVerified: fbUser.emailVerified
      };
    }
  } catch (err) {
    console.warn('Firestore user fetch error (using fallback auth data):', err);
  }

  return {
    id: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Gamer',
    email: fbUser.email || '',
    avatar: FF_IMAGES.characterKelly,
    role: fbUser.email?.toLowerCase().includes('admin') ? 'admin' : 'user',
    diamonds: 500,
    inGameId: 'SQ_' + Math.floor(100000 + Math.random() * 900000),
    totalEarnings: 0,
    matchesPlayed: 0,
    wins: 0,
    kdRatio: 4.2,
    tier: 'Grandmaster',
    createdAt: new Date().toISOString().split('T')[0],
    isVerified: fbUser.emailVerified
  };
}

/**
 * REAL SIGNUP WITH FIREBASE AUTHENTICATION
 */
export async function signUpWithFirebase(
  email: string, 
  pass: string, 
  fullName: string, 
  inGameId?: string
): Promise<FirebaseUser> {
  if (!auth) {
    throw new Error('Firebase Authentication is not initialized. Please check your Firebase credentials.');
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  const fbUser = userCredential.user;

  // Update Display Name
  await updateProfile(fbUser, { displayName: fullName });

  // Automatically Send Email Verification via Firebase
  await sendEmailVerification(fbUser);

  // Save profile doc to Firestore
  if (db) {
    try {
      const userDocRef = doc(db, 'users', fbUser.uid);
      await setDoc(userDocRef, {
        name: fullName,
        email: fbUser.email,
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
        diamonds: 500,
        inGameId: inGameId || 'SQ_' + Math.floor(100000 + Math.random() * 900000),
        totalEarnings: 0,
        matchesPlayed: 0,
        wins: 0,
        kdRatio: 4.2,
        tier: 'Grandmaster',
        avatar: FF_IMAGES.characterKelly,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Firestore user save warning:', e);
    }
  }

  return fbUser;
}

/**
 * REAL LOGIN WITH FIREBASE AUTHENTICATION
 */
export async function signInWithFirebase(email: string, pass: string): Promise<FirebaseUser> {
  if (!auth) {
    throw new Error('Firebase Authentication is not initialized. Please check your Firebase credentials.');
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
}

/**
 * RESEND FIREBASE EMAIL VERIFICATION
 */
export async function resendVerificationEmail(): Promise<void> {
  if (!auth || !auth.currentUser) {
    throw new Error('No user is currently signed in.');
  }
  await sendEmailVerification(auth.currentUser);
}

/**
 * FIREBASE FORGOT PASSWORD RESET EMAIL
 */
export async function sendPasswordReset(email: string): Promise<void> {
  if (!auth) {
    throw new Error('Firebase Authentication is not initialized. Please check your Firebase credentials.');
  }
  await sendPasswordResetEmail(auth, email);
}

/**
 * FIREBASE LOGOUT
 */
export async function logoutFirebase(): Promise<void> {
  if (auth) {
    await firebaseSignOut(auth);
  }
}

/**
 * Convert Firebase Auth Error codes into user-friendly message
 */
export function getFirebaseErrorMessage(error: any): string {
  if (!error?.code) return error?.message || 'Authentication failed. Please try again.';
  
  switch (error.code) {
    case 'auth/api-key-not-valid':
    case 'auth/invalid-api-key':
      return 'Invalid Firebase API Key. Please verify your Netlify VITE_FIREBASE_API_KEY environment variable.';
    case 'auth/user-not-found':
      return 'Account not found. Please sign up first.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please check your credentials.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return error.message?.replace('Firebase: ', '') || 'Authentication error occurred.';
  }
}
