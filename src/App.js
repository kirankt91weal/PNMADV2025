// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Prototype1 from './components/Prototype1';

// Landing page component
const LandingPage = () => {
  const navigate = useNavigate();

  const handleTryIt = () => {
    navigate('/iva-simulator');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header with Logo */}
      <header className="px-8 py-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">PNM</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">PayNearMe</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            2025 Client Advisory Council
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Prototypes
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        {/* Prototypes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prototype 1 - Omni Channel IVA */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-6 h-full">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Omni Channel IVA Experience
                  </h2>
                </div>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    Experience seamless context-sharing across SMS, Web, Chat, and Voice channels with conversation continuity.
                  </p>
                  <p>
                    Follow James through his payment journey as he resolves a failed payment and adjusts his due date.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button 
                  onClick={handleTryIt}
                  className="w-full group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Try it</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Prototype 2 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-6 h-full">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Prototype 2
                  </h2>
                </div>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button disabled className="w-full bg-gray-600 text-gray-400 font-semibold py-3 px-8 rounded-xl text-base cursor-not-allowed opacity-50">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Prototype 3 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-6 h-full">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Prototype 3
                  </h2>
                </div>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button disabled className="w-full bg-gray-600 text-gray-400 font-semibold py-3 px-8 rounded-xl text-base cursor-not-allowed opacity-50">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Prototype 4 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-6 h-full">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Prototype 4
                  </h2>
                </div>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button disabled className="w-full bg-gray-600 text-gray-400 font-semibold py-3 px-8 rounded-xl text-base cursor-not-allowed opacity-50">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Prototype 5 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-6 h-full">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Prototype 5
                  </h2>
                </div>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button disabled className="w-full bg-gray-600 text-gray-400 font-semibold py-3 px-8 rounded-xl text-base cursor-not-allowed opacity-50">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Prototype 6 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-6 h-full">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Prototype 6
                  </h2>
                </div>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button disabled className="w-full bg-gray-600 text-gray-400 font-semibold py-3 px-8 rounded-xl text-base cursor-not-allowed opacity-50">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo - Bottom Right */}
      <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-orange-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component with routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/iva-simulator" element={<Prototype1 />} />
      </Routes>
    </Router>
  );
}

export default App;