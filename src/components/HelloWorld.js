import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HelloWorld = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleScreenClick = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetConversation = () => {
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="px-8 py-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">PNM</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">PayNearMe</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={resetConversation}
              className="text-gray-300 hover:text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
            >
              Reset Demo
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back to Prototypes
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - 2/3 + 1/3 Split */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Problem/Solution (2/3) */}
          <div className="flex-1 lg:w-2/3">
            <div className="space-y-8">
              {/* Problem Section */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">The Problem</h2>
                </div>
                <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                  <p>
                    When a consumer has a failed payment, there is no guide or help available for them.
                  </p>
                  <p>
                    Payment failures create friction in the customer journey, leading to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Customer frustration and abandonment</li>
                    <li>Increased support ticket volume</li>
                    <li>Lost revenue opportunities</li>
                    <li>Poor customer experience</li>
                  </ul>
                </div>
              </div>

              {/* Solution Section */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Our Solution</h2>
                </div>
                <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                  <p>
                    Offer multiple options for assisting consumers when they encounter a failed payment.
                  </p>
                  <p>
                    The Omni-Channel IVA Experience provides:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Seamless context-sharing across channels</li>
                    <li>Intelligent payment failure resolution</li>
                    <li>Proactive customer assistance</li>
                    <li>Unified experience across SMS, Web, Chat & Voice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - iPhone Mockup (1/3) */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* iPhone 16 Pro Frame - Bigger for demo, realistic proportions */}
              <div className="bg-black rounded-[3rem] p-3 shadow-2xl mx-auto w-96">
                {/* iPhone Screen - Larger, more realistic resolution */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden h-[780px] relative">
                  {/* Status Bar */}
                  <div className="bg-black text-white text-xs px-8 py-3 flex justify-between items-center">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-5 h-2 border border-white rounded-sm"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="bg-gray-100 h-full cursor-pointer" onClick={handleScreenClick}>
                    {/* iMessage Header */}
                    <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center space-x-4">
                      <button className="text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">F</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">Freehold Financial</h3>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* iMessage Conversation */}
                    <div className="p-5 space-y-4">
                      {/* Message 1 - From Freehold Financial (Always visible) */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
                          <p className="text-sm text-gray-800 leading-relaxed">
                            Hi James! Your payment of $450.00 is due on 08/31. Would you like to make your payment now? You can also{' '}
                            <span className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-colors">view your account</span> for more details.
                          </p>
                        </div>
                      </div>

                      {/* Message 2 - From User (Shows after step 1) */}
                      {currentStep >= 1 && (
                        <div className="flex justify-end animate-fadeIn">
                          <div className="bg-blue-500 rounded-2xl px-4 py-3 max-w-[75%]">
                            <p className="text-sm text-white leading-relaxed">
                              Yes, I'd like to pay now. Please use my bank account ending in 3469.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Message 3 - From Freehold Financial (Shows after step 2) */}
                      {currentStep >= 2 && (
                        <div className="flex justify-start animate-fadeIn">
                          <div className="bg-white rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
                            <p className="text-sm text-gray-800 leading-relaxed">
                              I'm sorry but your payment was unsuccessful. Please{' '}
                              <span className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-colors">click here</span> to view the details and resolve this in your account.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* iPhone Label */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">iPhone 16 Pro - Demo Size</p>
                <p className="text-gray-500 text-xs mt-1">Larger mockup for better visibility</p>
                <p className="text-blue-400 text-xs mt-2 font-medium">Click anywhere on screen to advance</p>
                <p className="text-gray-500 text-xs mt-1">Step {currentStep + 1} of 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloWorld; 