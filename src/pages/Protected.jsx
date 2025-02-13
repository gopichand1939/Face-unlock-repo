import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Protected() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
    }
    const { account } = JSON.parse(localStorage.getItem("faceAuth"));
    setAccount(account);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("faceAuth");
    navigate("/");
  };

  const handleExploreLearning = () => {
    window.location.href = "https://student-portal-beta-gold.vercel.app/";
  };

  if (!account) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white flex flex-col">
      {/* Navbar Section */}
      <header className="flex justify-between items-center p-6 bg-black bg-opacity-50 shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={account?.type === "CUSTOM" ? account.picture : `/temp-accounts/${account.picture}`}
            alt={account.fullName}
            className="w-14 h-14 rounded-full border-2 border-blue-400"
          />
          <div>
            <h2 className="text-2xl font-bold">{account.fullName}</h2>
            <p className="text-blue-400">Dashboard</p>
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
          {/* Left Content - Heading and Button */}
          <div className="md:w-3/5 text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">
              Shape Your Future, Today
            </h1>
            <p className="text-lg text-gray-300 mt-4 max-w-lg">
              This platform is designed to help engineering students enhance their technical knowledge, 
              build essential career skills, and land high-paying jobs by the time they graduate.
            </p>

            {/* Explore Learning Button - Navigates to External Portal */}
            <button
              className="px-6 py-3 text-black font-semibold rounded-lg shadow-lg transition duration-300 mt-8 bg-yellow-400 hover:bg-yellow-500 scale-110 shadow-2xl"
              onClick={handleExploreLearning}
            >
              Explore Learning
            </button>
          </div>

          {/* Right Content - Circular Image */}
          <div className="md:w-2/5 flex justify-center mt-8 md:mt-0">
            <img
              src="https://i.postimg.cc/j5Rd9QRs/DALL-E-2025-02-12-15-33-01-A-modern-and-minimalistic-logo-for-Student-Empowerment-The-design-sh.webp"
              alt="Education and Industry Gap"
              className="w-96 h-96 object-cover rounded-full shadow-2xl border-4 border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protected;
