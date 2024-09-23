import Footer from "../components/Footer";
import Header from "../components/Header";

export default function UserLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
