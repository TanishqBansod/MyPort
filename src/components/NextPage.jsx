import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tigerImage from "./Blue_Tiger.webp";
import { motion } from "framer-motion";

const NextPage = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [position, setPosition] = useState({ x: "44vw", y: "15vw" });
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // Control popup visibility
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

  return (
    <>
      <div className="bg-black">
        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Use your arrow keys to navigate! SpaceBar if you wanna play with
              the cursor again LOL!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                color: "#fff",
                backgroundColor: "#007BFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Got it!
            </button>
          </div>
        )}

        <motion.div
          className="neonTiger"
          style={{
            position: "absolute",
            width: "12vw", // Responsive size
            height: "12vw",
            backgroundImage: `url(${tigerImage})`,
            backgroundSize: "cover",
            backgroundPosition: `-${currentFrame * 120}px 0`,
            transition: "box-shadow 0.3s ease",
          }}
          initial={{ x: "44vw", y: "15vw" }} // Initial position
          animate={{
            x: position.x,
            y: position.y,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15,
            duration: 6,
          }}
        ></motion.div>

        <div className="relative w-full h-screen overflow-hidden">
          {/* Semicircles */}
          <div className="absolute left-[-10vw] top-1/2 transform -translate-y-1/2 rotate-90 w-[30vw] h-[15vw] bg-red-500 rounded-t-[150px] flex justify-center items-center z-10">
            <span className="text-white text-[3vw] font-bold uppercase">
              About Me
            </span>
          </div>

          <div className="absolute right-[-10vw] top-1/2 transform -translate-y-1/2 rotate-[-90deg] w-[30vw] h-[15vw] bg-blue-500 rounded-t-[150px] flex justify-center items-center z-20">
            <span className="text-white text-[3vw] font-bold uppercase">
              Projects
            </span>
          </div>

          <div className="absolute top-[-10vh] left-1/2 transform -translate-x-1/2 rotate-[-180deg] w-[30vw] h-[15vw] bg-yellow-500 rounded-t-[150px] flex justify-center items-center z-20">
            <span className="text-white text-[3vw] font-bold transform rotate-[180deg] uppercase">
              Resume
            </span>
          </div>

          <div className="absolute bottom-[-10vh] left-1/2 transform -translate-x-1/2 w-[30vw] h-[15vw] bg-green-500 rounded-t-[150px] flex justify-center items-center z-20">
            <span className="text-white text-[3vw] font-bold uppercase">
              Contact Me
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextPage;
