import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import ApiService from "../services/service";

export const authContext = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await ApiService.getProfile();

        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};


export default AuthContext;
