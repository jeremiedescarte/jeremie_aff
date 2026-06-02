import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import About from "./pages/about";
import About2 from "./pages/contact";
import Chat from "./pages/chat";
import Overview from "./pages/dashboard/Overview";
import DashboardLayout from "./layouts/DashboardLayout";
import Contact from "./pages/dashboard/contact";
import Formation from "./pages/dashboard/formation";
import Competences from "./pages/dashboard/competences";
import Projets from "./pages/dashboard/projets";
import Experience from "./pages/dashboard/experiences";
import CV from "./pages/dashboard/cv";
import Certifications from "./pages/dashboard/certifications";
import Moi from "./pages/dashboard/moi";

import './themes.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* MainLayout est le parent — Navbar apparaît sur toutes les pages */}
        <Route element={<MainLayout />}>          {/* Layout parent */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<About2 />} />
          <Route path="/chat" element={<Chat />} />
        </Route>

              {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="experience"     element={<Experience />} />
        <Route path="projets"        element={<Projets />} />
        <Route path="competences"    element={<Competences />} />
        <Route path="formation"      element={<Formation />} /> 
        <Route path="chat"           element={<Chat />} />
        <Route path="contact"        element={<Contact />} />
        <Route path="cv"             element={<CV />} /> 
        <Route path="moi"             element={<Moi />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
