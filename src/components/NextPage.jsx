import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tigerImage from "./Blue_Tiger.webp";
import { motion } from "framer-motion";

const NextPage = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [position, setPosition] = useState({ x: "44vw", y: "15vw" });
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (animationInProgress) return;

      if (showPopup) {
        setShowPopup(false); // Close popup on any key press
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          setPosition({ x: "-10vw", y: "15vw" });
          setCurrentFrame((prevFrame) => (prevFrame - 1 + 6) % 6);
          setAnimationInProgress(true);
          setTimeout(() => {
            navigate("/about-me");
            setAnimationInProgress(false);
          }, 1000);
          break;
        case "ArrowRight":
          setPosition({ x: "85vw", y: "15vw" });
          setCurrentFrame((prevFrame) => (prevFrame + 1) % 6);
          setAnimationInProgress(true);
          setTimeout(() => {
            navigate("/projects");
            setAnimationInProgress(false);
          }, 1000);
          break;
        case " ":
          navigate("/");
          break;
        case "ArrowUp":
          setPosition({ x: "44vw", y: "-10vh" });
          setAnimationInProgress(true);
          setTimeout(() => {
            navigate("/resume");
            setAnimationInProgress(false);
          }, 1000);
          break;
        case "ArrowDown":
          setPosition({ x: "44vw", y: "110vh" });
          setAnimationInProgress(true);
          setTimeout(() => {
            navigate("/contact-me");
            setAnimationInProgress(false);
          }, 1000);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [animationInProgress, navigate, showPopup]);

  // Function to handle semicircle click
  const handleSemicircleClick = (targetPosition, targetPage) => {
    setPosition(targetPosition); // Set the tiger's target position
    setAnimationInProgress(true); // Disable further animations until the current one completes

    setTimeout(() => {
      navigate(targetPage); // Navigate after animation
      setAnimationInProgress(false); // Re-enable animations
    }, 1000); // Wait for the animation to finish (set the timeout to match the animation duration)
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-6 rounded-lg text-center z-50">
          <p className="text-[clamp(1rem,2.5vw,1.5rem)] mb-4">
            Use your arrow keys to navigate! SpaceBar if you wanna play with the
            cursor again LOL!
          </p>
          <button
            onClick={() => setShowPopup(false)}
            className="px-4 py-2 bg-blue-500 rounded-lg text-white text-[clamp(0.8rem,2vw,1rem)]"
          >
            Got it!
          </button>
        </div>
      )}

      {/* Tiger centered using flexbox */}
      <motion.div
        className="neonTiger"
        style={{
          position: "absolute",
          width: "15vw", // Slightly larger for better visibility on mobile, adjust as necessary
          height: "15vw", // Keep aspect ratio square
          backgroundImage: `url(${tigerImage})`,
          backgroundSize: "cover",
          backgroundPosition: `-${currentFrame * 120}px 0`,
          // You can use CSS media queries to make the tiger image smaller on mobile
        }}
        initial={{ x: "50%", y: "50%" }} // Start at center
        animate={{ x: position.x, y: position.y }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 1, // Reduced duration for quicker animation
        }}
      />

      <div className="relative w-full h-full">
        {/* Semicircles */}
        <div
          className="absolute left-[-5vw] top-[calc(50%-5vw)] transform -translate-y-1/2 rotate-90 w-[30vw] h-[15vw] bg-red-500 rounded-t-[150px] flex justify-center items-center z-10 cursor-pointer"
          onClick={() =>
            handleSemicircleClick({ x: "-10vw", y: "15vw" }, "/about-me")
          }
        >
          <span className="text-white text-[clamp(1rem,4vw,2rem)] font-bold uppercase">
            About Me
          </span>
        </div>

        <div
          className="absolute right-[-5vw] top-[calc(50%-5vw)] transform -translate-y-1/2 rotate-[-90deg] w-[30vw] h-[15vw] bg-blue-500 rounded-t-[150px] flex justify-center items-center z-10 cursor-pointer"
          onClick={() =>
            handleSemicircleClick({ x: "85vw", y: "15vw" }, "/projects")
          }
        >
          <span className="text-white text-[clamp(1rem,4vw,2rem)] font-bold uppercase">
            Projects
          </span>
        </div>

        <div
          className="absolute top-[-4vh] left-1/2 transform -translate-x-1/2 rotate-180 w-[30vw] h-[15vw] bg-yellow-500 rounded-t-[150px] flex justify-center items-center z-10 cursor-pointer"
          onClick={() =>
            handleSemicircleClick({ x: "44vw", y: "-10vh" }, "/resume")
          }
        >
          <span className="text-white text-[clamp(1rem,4vw,2rem)] font-bold uppercase rotate-180">
            Resume
          </span>
        </div>

        <div
          className="absolute bottom-[-4vh] left-1/2 transform -translate-x-1/2 w-[30vw] h-[15vw] bg-green-500 rounded-t-[150px] flex justify-center items-center z-10 cursor-pointer"
          onClick={() =>
            handleSemicircleClick({ x: "44vw", y: "110vh" }, "/contact-me")
          }
        >
          <span className="text-white text-[clamp(1rem,4vw,2rem)] font-bold uppercase">
            Contact Me
          </span>
        </div>
      </div>
    </div>
  );
};

export default NextPage;
