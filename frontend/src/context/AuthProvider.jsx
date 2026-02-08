import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useCallback, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

// Cache for user data to avoid unnecessary API calls
const userCache = new Map();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contextReady, setContextReady] = useState(false);
  const axiosPublic = useAxiosPublic();

  // Sign Up
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      // Clear cache on logout
      userCache.clear();
      setUser(null);
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Update profile
  const updateUserProfile = (profile) =>
    updateProfile(auth.currentUser, profile);

  // Forgot password
  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  // Fetch user data with caching
  const fetchUserData = useCallback(
    async (currentUser) => {
      const cacheKey = currentUser.email;

      // Check cache first
      if (userCache.has(cacheKey)) {
        return userCache.get(cacheKey);
      }

      try {
        const res = await axiosPublic.get(`/users/${currentUser.email}`);
        if (res.data) {
          userCache.set(cacheKey, res.data); // Cache the result
          return res.data;
        }
      } catch (error) {
        console.error("Error fetching backend user:", error);
      }

      return null;
    },
    [axiosPublic],
  );

  // Optimized auth state observer
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

      try {
        if (currentUser?.email) {
          // User is signed in - get fresh ID token without full reload
          await currentUser.getIdToken(true);

          const backendUser = await fetchUserData(currentUser);

          if (backendUser) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: backendUser.name || currentUser.displayName,
              photoURL: backendUser.imageUrl || currentUser.photoURL,
              role: backendUser.role || "user",
              _id: backendUser._id,
              phone: backendUser.phone || "",
              instituteName: backendUser.instituteName || "",
            });
          } else {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: "user",
            });
          }
        } else {
          // User is signed out
          setUser(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        setUser(null);
      } finally {
        if (isMounted) {
          setLoading(false);
          setContextReady(true);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [fetchUserData]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    updateUserProfile,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
