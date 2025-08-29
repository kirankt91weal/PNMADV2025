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
      {/* Header */}
      <header className="h-24 border-b border-white/10 backdrop-blur-sm bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PayNearMe Logo" 
              className="w-56 h-56 rounded-xl shadow-2xl object-contain animate-pulse opacity-90"
            />
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
            All information shared in this prototype is confidential. This includes information shared by PayNearMe, or by any participant sharing opinions or proprietary company information. Please do not share any information outside of this group.
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
                  className="w-full group relative bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Try it</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
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
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse opacity-30">
          <svg width="72" height="72" viewBox="0 0 112 111" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9995 111.001C55.8811 111.001 71.999 94.8835 71.999 75.0015L71.999 39.001L35.9995 39.001C16.1179 39.001 -4.01725e-06 55.1184 -5.75548e-06 75.0015C-7.49362e-06 94.8835 16.1179 111.001 35.9995 111.001M35.9995 57.0015L53.999 57.0015L53.999 75.0015C53.999 84.9418 45.9408 93.001 35.9995 93.001C26.0582 93.001 17.999 84.9418 17.999 75.0015C17.999 65.0598 26.0582 57.0015 35.9995 57.0015" fill="#0076DE"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.999 0C68.5354 0 55.999 12.536 55.999 28V56.0008H83.999C99.4627 56.0008 111.999 43.4648 111.999 28C111.999 12.536 99.4627 0 83.999 0M83.999 42.0001H69.9992V28C69.9992 20.2685 76.2668 14.0001 83.999 14.0001C91.7312 14.0001 97.9995 20.2685 97.9995 28C97.9995 35.7325 91.7312 42.0001 83.999 42.0001" fill="#FEC84B"/>
          </svg>
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