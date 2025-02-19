import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tiger from "../Blue_Tiger.webp";

const ContactMe = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tigerRef = useRef(null);
  const semicircleRef = useRef(null);
  const navigate = useNavigate();

  // Handle keypress for tiger movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault(); // Prevent scrolling

      const step = 30;
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
            // Only move if it won't go above the top of the window
            if (tigerRect.top > step) {
              newY = prev.y - step;
            }
            break;
          case "ArrowDown":
            // Only move if it won't go below the bottom of the window
            if (tigerRect.bottom < windowHeight - step) {
              newY = prev.y + step;
            }
            break;
          case "ArrowLeft":
            // Only move if it won't go beyond the left edge
            if (tigerRect.left > step) {
              newX = prev.x - step;
            }
            break;
          case "ArrowRight":
            // Only move if it won't go beyond the right edge
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
  }, []);

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
        setPosition({ x: 0, y: 0 });
        navigate("/next-page");
      }
    };

    checkCollision();
  }, [position, navigate]);

  // Handle semicircle click
  const handleSemicircleClick = () => {
    setPosition({ x: 0, y: 0 });
    navigate("/next-page");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-500 text-white p-8 space-y-6 relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg">
        Feel free to reach out to me through any of the channels below!
      </p>
      <div className="space-y-4 text-center">
        <p className="text-xl">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:tanishq.bansod27@gmail.com"
            className="text-blue-300 hover:underline"
          >
            tanishq.bansod27@gmail.com
          </a>
        </p>
        <p className="text-xl">
          <strong>Phone:</strong>{" "}
          <a href="tel:+14129197673" className="text-blue-300 hover:underline">
            +1 (412) 919-7673
          </a>
        </p>
        <p className="text-xl">
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/tanishq-bansod/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            linkedin.com/in/tanishq-bansod
          </a>
        </p>
      </div>

      {/* Tiger */}
      <div
        ref={tigerRef}
        className="fixed w-16 h-16 z-50"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <img
          src={tiger}
          alt="Blue Tiger"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Clickable Semicircle */}
      <div
        ref={semicircleRef}
        onClick={handleSemicircleClick}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 cursor-pointer hover:brightness-110 transition-all"
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "blue",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          transform: "rotate(-180deg)",
        }}
      />
    </div>
  );
};

export default ContactMe;
