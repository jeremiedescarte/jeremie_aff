import React from "react";
import About from "../pages/about.jsx";
import "./style.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
       <div >
      <header className="header">
        <a href="#" className="logo">AFFODO Service</a>

        <nav className="navbar">
          <Link to="/" className="active">Home</Link>
          <Link to="/about">About</Link>
          <a href="#Services">Services</a>
          <Link to="/portfolio">Portfolio</Link>
          <a href="#Contact">Contact</a>
        </nav>
      </header>

      <section className="home">

        <div className="home-content">
          <h1>Hi, I'm Enagnon Jeremie AFFODO</h1>
          <h3>Full Stack Developer</h3>
        <p>
          Passionate Full Stack Developer with expertise in modern web technologies,
          building scalable and high-performance applications using React, Laravel,
          and advanced development tools.

          Skilled in Mobile Application Development, Telecommunications systems,
          Database Architecture and Management, and Project Management,
          enabling me to design, develop and deliver complete end-to-end solutions.
        </p>



          <div className="btn-box">
            <a href="#Contact">Hire Me</a>
            <a href="#Contact">Let's Talk</a>
          </div>
        </div>

        <div className="home-sci">
          <a href="#"><i className='bx bxl-facebook'></i></a>
          <a href="#"><i className='bx bxl-instagram'></i></a>
          <a href="#"><i className='bx bxl-linkedin'></i></a>
        </div>

                  <div className="home-img">
    <img src="/profile.png" alt="Jeremie" />
  </div>
      </section>
    </div>
  );
};

export default Home;
