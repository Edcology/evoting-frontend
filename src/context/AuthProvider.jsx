import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
// import { authService } from "../services/api";
import config from "../config/config";
import { authService } from "../services/api";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(config.TOKEN_KEY));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem(config.TOKEN_KEY, token);
      fetchProfile();
    } else {
      localStorage.removeItem(config.TOKEN_KEY);
      setUser(null);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await authService.getProfile();
      setUser(res.data);
    } catch (err) {
      console.error("AuthContext: profile fetch failed", err);
      setToken(null);
    }
  };

  const login = (newToken) => setToken(newToken);
  const register = (newToken) => setToken(newToken);
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
