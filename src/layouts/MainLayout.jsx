import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#081b29] text-[#ededed]">
      
      {/* Navbar */}

      {/* Contenu */}
      <main className="">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;