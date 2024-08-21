import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: { name: string; profile: string } | null;
  login: (user: { name: string; profile: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ name: string; profile: string } | null>(
    () => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  );

  const login = (user: { name: string; profile: string }) => {
    setUser(user);
    localStorage.setItem("user : ", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthProvider 내에서 사용해야함");
  }
  return context;
};
