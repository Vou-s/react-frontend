import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


type User = { id?: string; name?: string; email?: string } | null;

type AuthContextType = {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // harus sama dengan key di login
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUser({
                    id: decoded.sub || decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                });
            } catch {
                setUser(null);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        window.location.href = '/'; // redirect ke login
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
