import Link from "next/link";
import React, { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import Footer from "./Footer";
import Header from "./Header";
interface PageLayoutProps {
    children: ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className=" w-full h-auto flex flex-col">
            <Header />
            <div className=" flex w-full h-auto min-h-screen">
                <AdminSidebar />
                <div className="flex-grow  text-black">
                    {children} {/* Admin content will go here */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PageLayout;
