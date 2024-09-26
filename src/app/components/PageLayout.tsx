import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface PageLayoutProps {
    children: ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className=" w-full h-auto min-h-screen flex flex-col">
            <Header />
            <main className=" w-full flex-1 bg-gray-100 text-black">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
