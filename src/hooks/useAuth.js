import { useState, useEffect } from "react";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Vérifier le token dans localStorage quand l'API sera prête
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

  return { user, loading, login, logout };
}

export default useAuth;


