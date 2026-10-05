import { useContext } from "react";
import { authContext } from "../context/AuthContext.jsx";

const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthContext");
  }

  return context;
};

export default useAuth;
