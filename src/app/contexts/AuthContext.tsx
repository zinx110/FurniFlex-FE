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
    userToken: string;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    logout: () => void;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [initializing, setInitializing] = useState(true);

    const [userToken, setUserToken] = useState("");

    const [user, setUser] = useState<User>(null);

    async function getUserData(token) {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/3`;
            const res = await axios.get(url, {
                headers: { Authorization: "Bearer " + token },
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

        setUserToken("");
        setUser(null);
    };
    useEffect(() => {
        let _userToken = localStorage.getItem("furniflex-userToken");

        // Only set user details if the token is present
        _userToken = "1sdfadfdfaf";
        if (!_userToken) {
            setUserToken("");
            setUser(null);
            setInitializing(false);
            return;
        }

        // Set the user state with values from localStorage
        setUserToken(_userToken);
        getUserData(_userToken);
    }, []);

    if (initializing) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                userToken,
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
