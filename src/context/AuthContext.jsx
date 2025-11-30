import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ id: 1, nom: "John Doe", role: "Admin" });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // TODO: Utiliser authService.login quand l'API sera prête
    localStorage.setItem("token", "mock-token");
    setUser({ id: 1, nom: "John Doe", role: "Admin" });
    return Promise.resolve();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
