import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.warn("useAuth must be used within an AuthProvider");
    return {
      user: null,
      loading: true,
      createUser: () => { },
      signIn: () => { },
      logout: () => { },
      updateUserProfile: () => { },
      forgotPassword: () => { },
    };
  }

  return context;
};

export default useAuth;
