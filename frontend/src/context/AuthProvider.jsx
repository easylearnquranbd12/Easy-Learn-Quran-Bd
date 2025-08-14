"use client"

import { createContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import useAxiosPublic from "../hooks/useAxiosPublic"
import auth from "../firebase/firebase.config"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contextReady, setContextReady] = useState(false)
  const axiosPublic = useAxiosPublic()

  // Sign Up
  const createUser = async (email, password) => {
    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result
    } catch (error) {
      console.error("Create user error:", error)
      throw error
    } finally {
      // Don't set loading to false here - let onAuthStateChanged handle it
    }
  }

  // Sign In
  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (error) {
      console.error("Sign in error:", error)
      setLoading(false) // Set loading to false on error
      throw error
    }
    // Don't set loading to false here - let onAuthStateChanged handle it
  }

  // Sign Out
  const logout = async () => {
    setLoading(true)
    try {
      console.log("Logging out...")
      // Clear user state immediately
      setUser(null)
      const result = await signOut(auth)
      return result
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    } finally {
      // Don't set loading to false here - let onAuthStateChanged handle it
    }
  }

  // Update profile
  const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile)

  // Forgot password
  const forgotPassword = (email) => sendPasswordResetEmail(auth, email)

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser?.email || "No user")

      try {
        if (currentUser?.email) {
          // User is signed in
          console.log("User signed in, fetching backend data...")

          try {
            // Reload user to get fresh token
            await currentUser.reload()
            const refreshedUser = auth.currentUser

            // Get user data from backend
            const res = await axiosPublic.get(`/users/${refreshedUser.email}`)
            const backendUser = res.data

            if (backendUser) {
              console.log("Backend user found:", backendUser.email)
              setUser({
                uid: refreshedUser.uid,
                email: refreshedUser.email,
                displayName: backendUser.name || refreshedUser.displayName,
                photoURL: backendUser.imageUrl || refreshedUser.photoURL,
                role: backendUser.role || "user",
                _id: backendUser._id,
                phone: backendUser.phone || "",
                instituteName: backendUser.instituteName || "",
              })
            } else {
              console.log("No backend user found, using Firebase user")
              setUser({
                uid: refreshedUser.uid,
                email: refreshedUser.email,
                displayName: refreshedUser.displayName,
                photoURL: refreshedUser.photoURL,
                role: "user", // Default role
              })
            }
          } catch (backendError) {
            console.error("Error fetching backend user:", backendError)
            // Fallback to Firebase user if backend fails
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: "user", // Default role
            })
          }
        } else {
          // User is signed out
          console.log("User signed out")
          setUser(null)
        }
      } catch (error) {
        console.error("Error in auth state change:", error)
        setUser(null)
      } finally {
        setLoading(false)
        setContextReady(true)
      }
    })

    return () => {
      console.log("Cleaning up auth listener")
      unsubscribe()
    }
  }, [axiosPublic])

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    updateUserProfile,
    forgotPassword,
  }

  // Show loading screen while initializing
  if (!contextReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Initializing authentication...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider
