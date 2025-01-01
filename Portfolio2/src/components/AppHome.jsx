import React, { useEffect, useState } from "react";
import { neonCursor } from "threejs-toys";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AppHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize neon cursor
    neonCursor({
      el: document.getElementById("app"),
      shaderPoints: 16,
      curvePoints: 80,
      curveLerp: 0.5,
      radius1: 5,
      radius2: 30,
      velocityTreshold: 10,
      sleepRadiusX: 100,
      sleepRadiusY: 100,
      sleepTimeCoefX: 0.0025,
      sleepTimeCoefY: 0.0025,
    });
  }, []);

  const [isExploded, setExploded] = useState(false);

  const handleButtonClick = () => {
    setExploded(true);
    setTimeout(() => {
      setExploded(false);
      navigate("/next-page"); // Navigate to NextPage
    }, 1000); // Reset explosion after animation
  };

  const buttonStyle = {
    position: "absolute",
    top: "45%",
    left: "41.5%",
    width: "15%",
    height: "7%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "2px solid #00f",
    color: "white",
    cursor: "pointer",
    transition: "box-shadow 0.3s ease",
    textShadow: "0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000",
    overflow: "hidden",
    fontSize: "1.5rem",
    fontWeight: "bold",
    boxShadow: "0 0 40px 5px #00f",
    borderRadius: "8px",
  };

  const lineStyleHorizontal = {
    position: "absolute",
    width: "15%",
    height: "2px",
    backgroundColor: "#00f",
    boxShadow: "0 0 10px #00f, 0 0 20px #00f",
  };

  const lineStyleVertical = {
    position: "absolute",
    width: "2px",
    height: "7%",
    backgroundColor: "#00f",
    boxShadow: "0 0 10px #00f, 0 0 20px #00f",
  };

  return (
    <div
      id="app"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black", // Ensures neon visibility
        position: "relative",
      }}
    >
      {/* Horizontal Lines */}
      <motion.div
        style={{
          ...lineStyleHorizontal,
          top: "calc(50% - 30px)", // Top line
          left: "50%",
          transform: "translateX(-50%)",
        }}
        initial={{ x: -600 }}
        animate={{ x: -110 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        style={{
          ...lineStyleHorizontal,
          bottom: "calc(50% - 10px)", // Bottom line
          left: "50%",
          transform: "translateX(-50%)",
        }}
        initial={{ x: 600 }}
        animate={{ x: -110 }}
        transition={{ duration: 2 }}
      />

      {/* Vertical Lines */}
      <motion.div
        style={{
          ...lineStyleVertical,
          left: "calc(50% - 110px)", // Left line
          top: "45%",
          transform: "translateY(-50%)",
        }}
        initial={{ y: -300 }}
        animate={{ y: 0 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        style={{
          ...lineStyleVertical,
          right: "calc(50% - 85px)", // Right line
          top: "45%",
          transform: "translateY(-50%)",
        }}
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 2 }}
      />

      <AnimatePresence>
        {isExploded && (
          <motion.div
            className="absolute w-full h-full bg-blue-500 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <motion.button
        style={buttonStyle}
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 50px 10px #00f" }}
        transition={{ duration: 3 }}
        onClick={handleButtonClick}
      >
        Tanishq Bansod
      </motion.button>
    </div>
  );
};

export default AppHome;
