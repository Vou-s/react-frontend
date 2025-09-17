import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: any | null;
  login: (data: any) => void;
  logout: () => void;
  loading: boolean; // tambahkan loading state untuk menunggu localStorage
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // tunggu localStorage selesai
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil user dari localStorage
    const storedUser = localStorage.getItem("user");
<<<<<<< HEAD
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
        localStorage.removeItem("user"); // reset kalau data rusak
      }
    }
=======
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false); // selesai load user
>>>>>>> 6b8f1e1394c7126ed29640e306a2773737ad8cd3
  }, []);


  const login = (data: any) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

