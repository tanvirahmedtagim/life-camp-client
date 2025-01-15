import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const handleLogout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const manageProfile = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setUser({ ...auth.currentUser });
      })
      .catch((error) => {
        console.error("Error updating profile:", error.message);
      });
  };
  const authInfo = {
    user,
    handleGoogleLogin,
    handleLogin,
    handleRegister,
    manageProfile,
    handleLogout,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
