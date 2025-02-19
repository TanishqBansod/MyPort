import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tiger from "../Blue_Tiger.webp";

const AboutMe = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const tigerRef = useRef(null);
  const semicircleRef = useRef(null);

  // Handle keypress for tiger movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault(); // Prevent scrolling

      const step = 40;
      const tigerElement = tigerRef.current;
      if (!tigerElement) return;

      const tigerRect = tigerElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case "ArrowUp":
            if (tigerRect.top > step) {
              newY = prev.y - step;
            }
            break;
          case "ArrowDown":
            if (tigerRect.bottom < windowHeight - step) {
              newY = prev.y + step;
            }
            break;
          case "ArrowLeft":
            if (tigerRect.left > step) {
              newX = prev.x - step;
            }
            break;
          case "ArrowRight":
            if (tigerRect.right < windowWidth - step) {
              newX = prev.x + step;
            }
            break;
          default:
            return prev;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // This effect doesn't require 'navigate' in the dependency array

  // Collision detection
  useEffect(() => {
    const checkCollision = () => {
      const tigerElement = tigerRef.current;
      const semicircleElement = semicircleRef.current;

      if (tigerElement && semicircleElement) {
        const tigerRect = tigerElement.getBoundingClientRect();
        const semicircleRect = semicircleElement.getBoundingClientRect();

        if (
          tigerRect.left < semicircleRect.right &&
          tigerRect.right > semicircleRect.left &&
          tigerRect.top < semicircleRect.bottom &&
          tigerRect.bottom > semicircleRect.top
        ) {
          setPosition({ x: 0, y: 0 }); // Reset tiger position
          navigate("/next-page"); // Redirect to next page
        }
      }
    };

    checkCollision();
  }, [position, navigate]);

  const handleSemicircleClick = () => {
    setPosition({ x: 0, y: 0 });
    navigate("/next-page");
  };
  // Add 'navigate' to the dependency array here

  return (
    <div
      className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-red-500 to-black text-white p-8 space-y-12"
      onClick={handleSemicircleClick}
    >
      <h1 className="text-5xl font-extrabold text-center text-white mb-12">
        About Me
      </h1>

      {/* Tiger */}
      <div
        ref={tigerRef}
        className="absolute w-16 h-16"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <img
          src={tiger}
          alt="Blue Tiger"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Semicircle off the right side, rotated 90 degrees counterclockwise */}
      <div
        ref={semicircleRef}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:brightness-110 transition-all"
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "blue",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          transform: "rotate(-90deg)",
        }}
      />

      {/* Introduction Section */}
      <div className="w-full max-w-4xl p-6 border-4 border-red-500 rounded-lg shadow-lg glow-effect">
        <h2 className="text-3xl font-semibold text-center mb-4 text-red-400">
          Introduction
        </h2>
        <p className="text-lg text-center">
          As a dedicated Junior Computer Science student at the University of
          Pittsburgh, minoring in Economics, I thrive on solving complex
          problems and pushing the boundaries of technology. I have a working
          understanding of machine learning and artificial intelligence for
          real-world applications. Skilled in multiple programming languages,
          I’m motivated by the challenge of turning ideas into reality. My
          passion for innovation drives me to continuously learn and excel in
          software development and AI.
        </p>
      </div>

      {/* Extracurriculars Section */}
      <div className="w-full max-w-4xl p-6 border-4 border-red-500 rounded-lg shadow-lg glow-effect">
        <h2 className="text-3xl font-semibold text-center mb-4 text-red-400">
          Extracurriculars
        </h2>
        <p className="text-lg text-center">
          Outside of my studies, I’m an active member of the Computer Science
          Club at Pitt, a part of the Mastana Fusion Dance Team, and a brother
          at Kappa Theta Phi. I also train with the Shiamak Dawar Dance Academy
          outside of college.
        </p>
      </div>

      {/* Interests Section */}
      <div className="w-full max-w-4xl p-6 border-4 border-red-500 rounded-lg shadow-lg glow-effect">
        <h2 className="text-3xl font-semibold text-center mb-4 text-red-400">
          Interests
        </h2>
        <p className="text-lg text-center">
          I have a wide range of interests, including playing cricket, tennis,
          traveling, going on cruises, visiting the beach, and exploring the
          city. I love spending time with my friends and family, watching movies
          and TV shows, and playing video games like Minecraft. I enjoy
          attending Indian cultural events, keeping up with men's fashion, and
          playing with my chihuahua.
        </p>
      </div>

      {/* Hobbies Section */}
      <div className="w-full max-w-4xl p-6 border-4 border-red-500 rounded-lg shadow-lg glow-effect">
        <h2 className="text-3xl font-semibold text-center mb-4 text-red-400">
          Hobbies
        </h2>
        <p className="text-lg text-center">
          I'm also passionate about organizing scavenger hunts, planning events
          with my friends, scuba diving, parasailing, tubing, and camping. My
          hobbies reflect my love for adventure, creativity, and connection with
          others.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
