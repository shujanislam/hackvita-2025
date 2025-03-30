import React, { createContext, useContext, useEffect, useState } from "react";

type IUser = {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
};

type ProfileResponse = {
    success: boolean;
    user: IUser;
};

type UserContextType = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    loading: boolean;
    fetchUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/profile`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const data: ProfileResponse = await response.json();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user , setUser, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        return;
    }
    console.log(context.user)
    return context;
};
