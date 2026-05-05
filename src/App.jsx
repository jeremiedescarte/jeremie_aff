import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import About from "./pages/about";
import About2 from "./pages/contact";
import Chat from "./pages/chat";

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
      </Routes>
    </Router>
  );
}

export default App;
