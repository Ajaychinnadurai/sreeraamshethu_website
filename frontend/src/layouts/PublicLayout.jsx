import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import ScrollProgress from "../components/ScrollProgress";
import CustomCursor from "../components/CustomCursor";

export default function PublicLayout() {
  return (
    <div className="grain">
      <ScrollProgress />
      <CustomCursor active />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}