import React, { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  // 🍎 TEST: As soon as a user logs in successfully, write a test document to the Database!
  useEffect(() => {
    if (user) {
      console.log("User verified:", user.email);
      addDoc(collection(db, 'test_connections'), {
        email: user.email,
        timestamp: serverTimestamp(),
        message: "Hello Foodieal! The Firestore Database is actively working."
      })
      .then(() => alert('🎉 Firebase Success: Your account is authenticated AND a test record was just saved to your Firestore Database!'))
      .catch((err) => {
        console.error("Database connection error:", err);
        alert('Authentication worked, but the Database write failed. Ensure your Firestore Database is created and set to Test Mode.');
      });
    }
  }, [user]);

  const logout = () => {
    signOut(auth);
  };

  const navigateToLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error("Firebase Login Error", e);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoadingAuth: loading,
      isLoadingPublicSettings: false,
      authError: error ? { type: 'unknown', message: error.message } : null,
      appPublicSettings: {},
      logout,
      navigateToLogin,
      checkAppState: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
