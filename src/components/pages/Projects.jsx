import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tiger from "../Blue_Tiger.webp";

const Projects = () => {
  const projects = [
    {
      name: "Freudify",
      fullDescription:
        "Freudify merges psychology and AI to provide dream interpretations, inspired by Sigmund Freud's work and a universal curiosity about dreams. Built using the MERN stack, the platform allows users to input their dreams and receive summaries and psychological insights through the Gemini API. Key challenges included implementing secure authentication, API integration, and creating a user-friendly design. Future plans include integrating more advanced AI, tracking dream history, and offering personalized analysis. Freudify empowers individuals to explore their subconscious and gain deeper insights into their dreams.",
      websiteUrl: "https://freudify.netlify.app/",
      imageUrl: "Freudify Icon.png",
      videoUrl: "https://www.youtube.com/watch?v=zz0NL3fJXGg",
    },
    {
      name: "HReview",
      fullDescription:
        "HReview turns overwhelming feedback into actionable insights with AI-powered summarization. Built using FastAPI, OpenAI's GPT, and SQLite, it simplifies managing thousands of reviews into concise, meaningful summaries. Overcoming challenges with AI integration taught us resilience, and we're proud of creating a tool that empowers teams to focus on what truly matters. Future plans include user analytics and personalized insights to make HReview indispensable for feedback management.",
      websiteUrl: "https://github.com/TanishqBansod/SteelHacks",
      imageUrl: "HReview Icon.jpeg",
      videoUrl: "https://youtu.be/ve3ohfTtvYM",
    },
    {
      name: "SkillMatch",
      fullDescription:
        "Won 3rd Place SheInnovates: SkillMatch connects individuals with projects that align with their unique skill sets through intelligent matchmaking. Built using React, Node.js, and MongoDB, it streamlines team formation by providing personalized recommendations based on user expertise and interests. Overcoming challenges related to scalable matchmaking algorithms and efficient data handling taught us resilience, and we're proud of creating a platform that fosters meaningful collaboration. Future plans include real-time messaging, skill endorsements, and advanced analytics to make SkillMatch indispensable for talent and project matching.",
      websiteUrl: "https://github.com/utiwari21/SheInnovates25",
      imageUrl: "SkillMatch Icon.png",
    },
    {
      name: "Music By Mood",
      fullDescription:
        "Music By Mood is a web app that curates and plays music based on your emotions using facial expression analysis. Built with React and Tailwind CSS for the frontend, and Flask, FastAPI, Python, OpenCV, and DeepFace for the backend, it delivers a seamless and intuitive user experience. Overcoming challenges with real-time emotion detection and accurate music matching taught us resilience. We're proud of creating an application that enhances user moods through personalized playlists. Future plans include Spotify integration, user mood history tracking, and adaptive recommendations for an even more tailored listening experience.",
      websiteUrl: "https://github.com/utiwari21/TartanHacks",
      imageUrl: "Music By Mood Icon.png",
    },
  ];

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
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
            if (tigerRect.top > step) newY = prev.y - step;
            break;
          case "ArrowDown":
            if (tigerRect.bottom < windowHeight - step) newY = prev.y + step;
            break;
          case "ArrowLeft":
            if (tigerRect.left > step) newX = prev.x - step;
            break;
          case "ArrowRight":
            if (tigerRect.right < windowWidth - step) newX = prev.x + step;
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

  const handleImageClick = (index) => {
    setSelectedProjectIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-black to-blue-500 text-white p-8 space-y-8 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-center mb-5">Projects</h1>

      {/* ✅ Responsive Project Images */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.imageUrl}
            alt={project.name}
            className="cursor-pointer rounded-lg transition-transform transform hover:scale-105 w-full max-w-[200px] h-auto"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {/* ✅ Project Details Section */}
      <div className="bg-black p-6 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {projects[selectedProjectIndex].name}
        </h2>
        <div className="mt-4 text-gray-300">
          <p>{projects[selectedProjectIndex].fullDescription}</p>
        </div>
        <a
          href={projects[selectedProjectIndex].websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Visit Website
        </a>
        {projects[selectedProjectIndex].videoUrl && (
          <a
            href={projects[selectedProjectIndex].videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="m-1 mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Watch Demo Video
          </a>
        )}
      </div>

      {/* 🐯 Tiger Animation */}
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

      {/* 🔵 Clickable Semicircle */}
      <div
        ref={semicircleRef}
        onClick={handleSemicircleClick}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 rotate-90 cursor-pointer hover:brightness-110 transition-all"
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "blue",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
        }}
      />
    </div>
  );
};

export default Projects;
