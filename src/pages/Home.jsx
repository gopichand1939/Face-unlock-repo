import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Login Dropdown Component
const LoginDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300"
      >
        Login
      </motion.button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          <Link to="https://frontend-authentication-21-01-2025-g2rd.vercel.app/" className="block px-4 py-2 hover:bg-gray-700 transition duration-300">
            Login with Details
          </Link>
          <Link to="/user-select" className="block px-4 py-2 hover:bg-gray-700 transition duration-300">
            Login via Image Upload
          </Link>
        </div>
      )}
    </div>
  );
};

// Main Home Component
const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <header className="fixed w-full bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and App Name */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <img 
                  src="https://i.postimg.cc/j5Rd9QRs/DALL-E-2025-02-12-15-33-01-A-modern-and-minimalistic-logo-for-Student-Empowerment-The-design-sh.webp" 
                  alt="Student Empowerment Logo"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <span className="text-sm font-semibold text-gray-300 bg-gray-800 px-3 py-1 rounded-lg shadow-md">
                  LBCE
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col leading-none -mt-1"
              >
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Student
                </span>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Empowerment
                </span>
              </motion.div>
            </div>

            {/* Login Dropdown Button */}
            <LoginDropdown />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-32">
        <section className="flex flex-col md:flex-row items-center justify-between py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Empowering Students
              </span> for Career Success
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Building a full-stack web application to guide students on their path to success and career growth.
            </p>
          </motion.div>

          {/* Right Side Image Section with Parallax Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-1/2 relative"
          >
            <div
              ref={parallaxRef}
              className="w-full h-64 md:h-96 bg-blue-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) / 50}deg)`,
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-75"
                style={{
                  transform: `translateY(${scrollY * 0.2}px)`,
                  transition: "transform 0.2s ease-out",
                }}
              />
              <img
                src="https://www.nec.com/en/global/solutions/biometrics/img/face/face_header_sd.jpg"
                alt="Biometric Authentication"
                className="w-full h-full object-cover mix-blend-overlay transition-transform duration-300 transform hover:scale-110"
              />
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;
