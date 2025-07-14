import {createContext, useEffect, useState} from "react";
import type {User} from "../models/user.tsx";
import api from "../services/api.tsx";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData : {email: string, password: string}) => Promise<User>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    const login = async (userData : {email: string, password: string}) => {
        const response = await api.post(`/auth/login`, userData);
        const user: User = response.data.user;
        const token: string = response.data.token;

        localStorage.setItem("token", token);
        setUser(user);
        return user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await api.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            logout();
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}