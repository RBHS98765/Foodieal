// Completely bypassing @base44/sdk to use raw Firebase
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

export const base44 = {
  auth: {
    isAuthenticated: async () => {
      // Firebase auth must initialize first on page load
      await auth.authStateReady();
      return !!auth.currentUser;
    },
    me: async () => {
      await auth.authStateReady();
      const user = auth.currentUser;
      if (!user) throw new Error("Authentication required");
      return { 
        id: user.uid, 
        email: user.email, 
        name: user.displayName || user.email.split('@')[0], 
        avatar: user.photoURL 
      };
    },
    redirectToLogin: async (redirectUrl) => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (e) {
        console.error("Firebase Login Error", e);
      }
    },
    logout: async () => {
      await signOut(auth);
      window.location.reload();
    }
  },
  appLogs: {
    // Mocking analytics to prevent app crashes when it tries to track navigation
    logUserInApp: async (pageName) => {
      console.log(`Firebase Analytics mock: User visited ${pageName}`);
    }
  }
};
