import {createContext, useState} from "react";
import type {User} from "../models/user.tsx";
import api from "../services/api.tsx";
import {useFav} from "./useFav.tsx";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData : {email: string, password: string}) => User;
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

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}