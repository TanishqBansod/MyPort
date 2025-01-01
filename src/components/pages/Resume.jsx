import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tiger from "../Blue_Tiger.webp";

const Resume = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tigerRef = useRef(null);
  const semicircleRef = useRef(null);
  const navigate = useNavigate();

  // Handle keypress for tiger movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        const step = 30;
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
  }, []); // This effect doesn't need 'navigate' in the dependency array

  // Collision detection
  useEffect(() => {
    const checkCollision = () => {
      const tiger = tigerRef.current.getBoundingClientRect();
      const semicircle = semicircleRef.current.getBoundingClientRect();

      if (
        tiger.left < semicircle.right &&
        tiger.right > semicircle.left &&
        tiger.top < semicircle.bottom &&
        tiger.bottom > semicircle.top
      ) {
        setPosition({ x: 0, y: 0 }); // Reset tiger position
        navigate("/next-page"); // Redirect to next page
      }
    };

    checkCollision();
  }, [position, navigate]); // Add 'navigate' to the dependency array here

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-500 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Resume</h1>

      {/* Embed the PDF using iframe */}
      <div className="w-full max-w-4xl h-[80vh]">
        <iframe
          src="/resume.pdf" // Path to the PDF inside public folder
          width="100%"
          height="100%"
          frameBorder="0"
          title="Resume"
        ></iframe>
      </div>

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
        className="absolute bottom-0 transform -translate-y-1/2"
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "blue",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          transform: "rotate(0deg)",
        }}
      />
    </div>
  );
};

export default Resume;
