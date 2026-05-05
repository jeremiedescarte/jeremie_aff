import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#081b29] text-[#ededed]">
      <Navbar />
      <main>
        <Outlet /> {/*  ici s'affiche la page active */}
      </main>
    </div>
  );
};

export default MainLayout;