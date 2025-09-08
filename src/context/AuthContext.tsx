import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type User = { id?: string; name?: string; email?: string } | null;


const AuthContext = createContext<any>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try { const decoded: any = jwtDecode(token); setUser({ id: decoded.sub || decoded.id, name: decoded.name, email: decoded.email }); }
            catch { setUser(null); }
        }
    }, []);


    const logout = () => { localStorage.removeItem('token'); setUser(null); window.location.href = '/login'; };
    return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);