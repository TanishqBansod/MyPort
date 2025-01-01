import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tiger from "../Blue_Tiger.webp";

const Projects = () => {
  // Project data
  const projects = [
    {
      name: "Freudify",
      fullDescription:
        "Freudify merges psychology and AI to provide dream interpretations, inspired by Sigmund Freud’s work and a universal curiosity about dreams. Built using the MERN stack, the platform allows users to input their dreams and receive summaries and psychological insights through the Gemini API. Key challenges included implementing secure authentication, API integration, and creating a user-friendly design. Future plans include integrating more advanced AI, tracking dream history, and offering personalized analysis. Freudify empowers individuals to explore their subconscious and gain deeper insights into their dreams.",
      websiteUrl: "https://freudify.netlify.app/", // Replace with your project URL
      imageUrl: "Freudify Icon.png", // Replace with your project's image URL
      videoUrl: "https://www.youtube.com/watch?v=zz0NL3fJXGg", // Freudify demo video link
    },
    {
      name: "HReview",
      fullDescription:
        "HReview turns overwhelming feedback into actionable insights with AI-powered summarization. Built using FastAPI, OpenAI's GPT, and SQLite, it simplifies managing thousands of reviews into concise, meaningful summaries. Overcoming challenges with AI integration taught us resilience, and we're proud of creating a tool that empowers teams to focus on what truly matters. Future plans include user analytics and personalized insights to make HReview indispensable for feedback management.",
      websiteUrl: "https://github.com/TanishqBansod/SteelHacks", // Replace with your project URL
      imageUrl: "HReview Icon.jpeg", // Replace with your project's image URL
      videoUrl: "https://youtu.be/ve3ohfTtvYM", // HReview demo video link
    },
  ];

  // State to manage the selected project
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

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
        setPosition({ x: 0, y: 0 }); // Reset tiger position
        navigate("/next-page"); // Redirect to next page
      }
    };

    checkCollision();
  }, [position]);

  const handleImageClick = (index) => {
    setSelectedProjectIndex(index); // Set the selected project
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gradient-to-r from-blue-500 via-black to-blue-500 text-white p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-5">Projects</h1>

      {/* Display the images for each project */}
      <div className="flex space-x-4 mb-8">
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.imageUrl}
            alt={project.name}
            className="cursor-pointer rounded-lg transition-transform transform hover:scale-105"
            onClick={() => handleImageClick(index)}
            style={{ width: "200px", height: "150px" }} // Adjust size as needed
          />
        ))}
      </div>

      {/* Display the selected project's details */}
      <div className="bg-black p-6 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {projects[selectedProjectIndex].name}
        </h2>
        {/* Full Description */}
        <div className="mt-4 text-gray-300">
          <p>{projects[selectedProjectIndex].fullDescription}</p>
        </div>
        {/* Link to project */}
        <a
          href={projects[selectedProjectIndex].websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Visit Website
        </a>
        <a
          href={projects[selectedProjectIndex].videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="m-1 mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Watch Demo Video
        </a>
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
        className="absolute left-0 transform -translate-y-1/2"
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "blue",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          transform: "rotate(90deg)",
        }}
      />
    </div>
  );
};

export default Projects;
