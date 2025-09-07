// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'; // ✅ Added updateDoc
import { auth, db } from '../firebase/config';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  experienceLevel: string;
  newsletter: boolean;
  createdAt: Date | Timestamp;
  // ✅ Added new optional fields for profile functionality
  avatarUrl?: string;
  description?: string;
  following?: string[];
  activityLog?: Array<{
    action: string;
    timestamp: Date | Timestamp;
  }>;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    experienceLevel: string,
    newsletter: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserData>) => Promise<void>; // ✅ Added this function
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    experienceLevel: string,
    newsletter: boolean
  ) => {
    try {
      // ✅ Firebase auth create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Update Firebase Auth profile display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // ✅ Store user data in Firestore - Fixed timestamp issue
      const userDocData = {
        firstName,
        lastName,
        email,
        experienceLevel,
        newsletter,
        createdAt: Timestamp.fromDate(new Date()).toDate(), // ✅ This should work
        // ✅ Initialize optional fields
        avatarUrl: '',
        description: '',
        following: [],
        activityLog: [{
          action: 'Account created',
          timestamp: Timestamp.fromDate(new Date()).toDate()
        }]
      };

      await setDoc(doc(db, 'users', user.uid), userDocData);
      setUserData(userDocData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // ✅ New function to update user profile
  const updateUserProfile = async (updates: Partial<UserData>) => {
    if (!currentUser || !userData) {
      throw new Error('No authenticated user');
    }

    try {
      // Update Firestore document
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // Filter out undefined values to prevent Firestore errors
      const cleanUpdates: any = {};
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          cleanUpdates[key] = value;
        }
      });
      
      // Add activity log entry
      const updatedActivityLog = [
        ...(userData.activityLog || []),
        {
          action: 'Profile updated',
          timestamp: new Date()
        }
      ];

      const updateData = {
        ...cleanUpdates,
        activityLog: updatedActivityLog
      };

      await updateDoc(userDocRef, updateData);

      // Update local state (merge with existing data)
      setUserData(prev => prev ? { ...prev, ...cleanUpdates } : null);

      // Update Firebase Auth display name if name changed
      if (updates.firstName || updates.lastName) {
        const newDisplayName = `${updates.firstName || userData.firstName} ${updates.lastName || userData.lastName}`;
        await updateProfile(currentUser, {
          displayName: newDisplayName
        });
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // ✅ Firestore fetch user data
  const fetchUserData = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile, // ✅ Added this to the context value
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};