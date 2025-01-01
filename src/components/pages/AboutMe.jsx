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
      setPosition((prev) => {
        const step = 40;
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case "ArrowUp":
            newY -= step;
            break;
          case "ArrowDown":
            newY += step;
            break;
          case "ArrowLeft":
            newX -= step;
            break;
          case "ArrowRight":
            newX += step;
            break;
          default:
            return prev;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-red-500 to-black text-white p-8 space-y-12">
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
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
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
          As a dedicated sophomore computer science student at the University of
          Pittsburgh, I thrive on solving complex problems and pushing the
          boundaries of technology. I have a working understanding of machine
          learning and artificial intelligence for real-world applications.
          Skilled in multiple programming languages, I’m motivated by the
          challenge of turning ideas into reality. My passion for innovation
          drives me to continuously learn and excel in software development and
          AI.
        </p>
      </div>

      {/* Extracurriculars Section */}
      <div className="w-full max-w-4xl p-6 border-4 border-red-500 rounded-lg shadow-lg glow-effect">
        <h2 className="text-3xl font-semibold text-center mb-4 text-red-400">
          Extracurriculars
        </h2>
        <p className="text-lg text-center">
          Outside of my studies, I’m an active member of the Computer Science
          Club at Pitt and a part of the Mastana Fusion Dance Team. I also train
          with the Shiamak Dawar Dance Academy outside of college.
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
