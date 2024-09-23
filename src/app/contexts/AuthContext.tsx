"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useId,
    useState,
} from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProps {
    userToken: string;
    userName: string;
    userId: string;
    userRole: string;
    logout: () => void;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [initializing, setInitializing] = useState(true);

    const [userToken, setUserToken] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");

    const logout = () => {
        localStorage.removeItem("furniflex-userToken");
        localStorage.removeItem("furniflex-userName");
        localStorage.removeItem("furniflex-userId");
        localStorage.removeItem("furniflex-userRole");
        setUserToken("");
        setUserName("");
        setUserId("");
        setUserRole("");
    };

    useEffect(() => {
        const _userToken = localStorage.getItem("furniflex-userToken");
        const _userName = localStorage.getItem("furniflex-userName");
        const _userId = localStorage.getItem("furniflex-userId");
        const _userRole = localStorage.getItem("furniflex-userRole");
        if (!userToken) {
            setUserToken("");
            setUserName("");
            setUserId("");
            setUserRole("");

            setInitializing(false);
            return;
        }
        setUserToken(_userToken);
        setUserName(_userName);
        setUserId(_userId);
        setUserRole(_userRole);
        setInitializing(false);
    }, []);

    if (initializing) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{ userToken, userId, userName, userRole, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
