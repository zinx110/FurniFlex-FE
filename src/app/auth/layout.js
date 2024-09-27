import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AuthLayout({ children }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}
