import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/AppHome"
import NextPage from "./components/NextPage";
import AboutMe from "./components/pages/AboutMe";
import ContactMe from "./components/pages/ContactMe";
import Projects from "./components/pages/Projects";
import Resume from "./components/pages/Resume";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/next-page" element={<NextPage />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact-me" element={<ContactMe />} />
      </Routes>
    </Router>
  );
};

export default App;
