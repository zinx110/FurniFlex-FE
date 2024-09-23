import React from "react";
import { AuthProvider } from "../contexts/AuthContext";

const LayoutProviderWrapper = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default LayoutProviderWrapper;
