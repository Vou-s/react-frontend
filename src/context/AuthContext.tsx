// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // tambahkan ini
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}, // default empty function
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
