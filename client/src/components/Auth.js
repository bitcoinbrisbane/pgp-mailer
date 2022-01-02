import React, { createContext, useEffect, useState } from "react";
import { cache } from "swr";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialUser = JSON.parse(window.localStorage.getItem("user"));
    if (initialUser?.role === "admin") setUser(initialUser);
    setLoading(false);
  }, []);

  const login = user => {
    if (user.role === "admin") {
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error("Unauthorized");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    cache.clear();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
