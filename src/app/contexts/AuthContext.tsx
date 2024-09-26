"use client";

import axios from "axios";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useId,
    useState,
} from "react";
import { User } from "../../types/User";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProps {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    logout: () => void;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [initializing, setInitializing] = useState(true);

    const [user, setUser] = useState<User>(null);

    async function getUserData(token) {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/GetMyData`;
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            if (res.status !== 200) {
                setInitializing(false);
                return false;
            }
            const data = res.data as User;
            if (!data || !data.UserId) {
                setInitializing(false);
                return false;
            }
            console.log("user data :", data);

            const fetchedUser: User = {
                Email: data.Email,
                FirstName: data.FirstName || "",
                LastName: data.LastName || "",
                ProfilePictureUrl: data.ProfilePictureUrl || "",
                UserId: data.UserId || 0,
                Phone: data.Phone || "",
                Location: data.Location || "",
                CartItems: data.CartItems || [],
                Orders: data.Orders || [],
                Reviews: data.Reviews || [],
                AuthToken: token,
                Role: data.Role,
                RoleId: data.RoleId,
            };
            setUser(fetchedUser);
            setInitializing(false);
        } catch (error) {
            setInitializing(false);
            return false;
        }
    }
    const logout = () => {
        localStorage.removeItem("furniflex-userToken");
        setUser(null);
    };
    useEffect(() => {
        let _userToken = localStorage.getItem("furniflex-userToken");

        // Only set user details if the token is present

        if (!_userToken) {
            setUser(null);
            setInitializing(false);
            return;
        }

        // Set the user state with values from localStorage

        getUserData(_userToken);
    }, []);

    if (initializing) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
