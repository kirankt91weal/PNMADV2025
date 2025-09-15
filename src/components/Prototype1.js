import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Prototype1 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [chatStep, setChatStep] = useState(0);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isCallMuted, setIsCallMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const chatMessagesRef = useRef(null);
  const callAudioRef = useRef(null);
  const callTimerRef = useRef(null);

  // Auto-scroll to bottom whenever chat step changes or payment becomes successful
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatStep, paymentSuccessful]);

  // Handle call screen timer and audio
  useEffect(() => {
    if (showCallScreen) {
      // Start call timer immediately
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      // Stop call audio and timer
      if (callAudioRef.current) {
        callAudioRef.current.pause();
        callAudioRef.current.currentTime = 0;
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
      setCallDuration(0);
    }

    // Cleanup on unmount
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [showCallScreen]);

  // Handle audio playback - start after connection (3 seconds)
  useEffect(() => {
    if (showCallScreen && callDuration >= 3 && callAudioRef.current) {
      // Start call audio when connection is established
      callAudioRef.current.play().catch(console.error);
      
      // Add event listener for when audio ends
      const handleAudioEnd = () => {
        // Reset demo to beginning when call audio finishes
        resetConversation();
      };
      
      callAudioRef.current.addEventListener('ended', handleAudioEnd);
      
      // Cleanup event listener
      return () => {
        if (callAudioRef.current) {
          callAudioRef.current.removeEventListener('ended', handleAudioEnd);
        }
      };
    }
  }, [showCallScreen, callDuration]);

  const handleScreenClick = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      // When on step 4 (PayNearMe app), clicking advances to web chat
      // Use the same logic as handleContactUs to properly initialize chat
      handleContactUs();
    }
  };

  const handleContactUs = () => {
    // Prevent multiple rapid clicks from causing race conditions
    if (isLoadingChat) {
      return;
    }
    
    setIsLoadingChat(true);
    setCurrentStep(5);
    setChatStep(0);
    
    // Load chat container first, then messages after 1 second delay
    setTimeout(() => {
      setChatStep(0.5); // Show initial message
      setIsLoadingChat(false); // Allow future clicks after message loads
    }, 1000);
  };

  const handleChatProgression = () => {
    setChatStep(chatStep + 1);
    
    // Add staggered delays for messages to appear
    if (chatStep === 0) {
      // First progression - show messages with delays
      setTimeout(() => {
        // User response appears first
        setChatStep(1);
      }, 500);
      
      setTimeout(() => {
        // IVA response appears
        setChatStep(1.5);
      }, 1500);
      
      setTimeout(() => {
        // IVA question appears
        setChatStep(1);
      }, 2500);
    } else if (chatStep === 1) {
      // Second progression - show final messages with delays
      setTimeout(() => {
        // User response appears first
        setChatStep(2);
      }, 500);
      
      setTimeout(() => {
        // IVA confirmation appears
        setChatStep(2);
      }, 1500);
    }
  };

  const resetConversation = () => {
    setCurrentStep(0);
    setChatStep(0);
    setPaymentSuccessful(false);
    setProcessingPayment(false);
    setShowCallScreen(false);
    setIsLoadingChat(false);
    setIsCallMuted(false);
    setCallDuration(0);
    
    // Stop any active call audio
    if (callAudioRef.current) {
      callAudioRef.current.pause();
      callAudioRef.current.currentTime = 0;
    }
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
  };

  const handleCallMute = () => {
    setIsCallMuted(!isCallMuted);
    if (callAudioRef.current) {
      callAudioRef.current.muted = !isCallMuted;
    }
  };

  const handleCallHangup = () => {
    setShowCallScreen(false);
    // Audio cleanup is handled by useEffect
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaymentSuccess = () => {
    setProcessingPayment(true);
    
    // Show processing spinner for 2 seconds
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentSuccessful(true);
      
      // Add delays for the payment success flow
      setTimeout(() => {
        // Show payment confirmation message after 2 seconds
        setChatStep(2.5);
      }, 2000);
      
      setTimeout(() => {
        // Show proactive offer message after 4 seconds
        setChatStep(2.75);
      }, 4000);
    }, 2000);
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
                    {/* Step 0: PayNearMe logo with black background */}
                    {currentStep === 0 ? (
                      <div className="flex items-start justify-center h-full bg-black pt-40">
                        <div className="text-center relative">
                          <img 
                            src="/logo.png" 
                            alt="PayNearMe Logo" 
                            className="w-64 h-64 mx-auto object-contain animate-pulse opacity-90"
                          />
                          <p className="text-white text-lg font-medium animate-pulse opacity-90 absolute left-1/2 transform -translate-x-1/2 top-44 whitespace-nowrap">Tap to start demo</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Show iMessage for steps 1-3, PayNearMe app for step 4+ */}
                        {currentStep < 4 ? (
                          <>
                        {/* iMessage Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center space-x-4">
                          <button className="text-blue-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-1">
                              <span className="text-white text-sm font-semibold">F</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">Freehold Financial</h3>
                          </div>
                          <div className="w-6 h-6"></div>
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

                          {/* Message 2 - From User (Shows after step 2) */}
                          {currentStep >= 2 && (
                            <div className="flex justify-end animate-fadeIn">
                              <div className="bg-blue-500 rounded-2xl px-4 py-3 max-w-[75%]">
                                <p className="text-sm text-white leading-relaxed">
                                  Yes, I'd like to pay now. Please use my bank account ending in 3469.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Message 3 - From Freehold Financial (Shows after step 3) */}
                          {currentStep >= 3 && (
                            <div className="flex justify-start animate-fadeIn">
                              <div className="bg-white rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
                                <p className="text-sm text-gray-800 leading-relaxed">
                                  I'm sorry but your payment was unsuccessful. Please{' '}
                                  <span className="text-blue-600 underline cursor-pointer hover:text-blue-600 transition-colors">click here</span> to view the details and resolve this in your account.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Step 4: PayNearMe Consumer Flow */}
                        {currentStep === 4 && (
                          <div className="animate-fadeIn h-full">
                        {/* PayNearMe App Interface */}
                        <div className="bg-white h-full">
                          {/* App Header */}
                          <div className="bg-[#4566D7] px-5 py-3 flex items-center justify-between">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <i className="fas fa-home text-white text-sm"></i>
                            </div>
                            <div className="w-6 h-6 flex items-center justify-center">
                              <i className="fas fa-bars text-white text-sm"></i>
                            </div>
                          </div>

                          {/* Main Content */}
                          <div className="p-4">
                            {/* Payment Unsuccessful Alert */}
                            <div className="bg-white border-l-3 border-[#F04438] rounded p-3 flex items-center space-x-2 shadow-lg mb-4">
                              <i className="fas fa-exclamation-triangle text-[#F04438] text-lg"></i>
                              <div className="text-[#1D2939]">
                                <div className="font-bold text-sm">Payment Unsuccessful</div>
                                <div className="text-xs text-[#475467]">Payment to Freehold Financial is incomplete</div>
                              </div>
                            </div>

                            {/* Company Branding */}
                            <div className="flex flex-col items-center mb-6">
                              <div className="w-10 h-10 bg-[#2E3D72] rounded-full flex items-center justify-center mb-3">
                                <i className="fas fa-university text-white text-lg"></i>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-[#212840] text-lg">Freehold Financial</div>
                              </div>
                            </div>

                            {/* Main Message */}
                            <div className="text-center mb-6">
                              <h2 className="text-[#101828] text-xl font-bold mb-3">Payment Unsuccessful</h2>
                              <p className="text-[#101828] text-sm font-medium leading-5">
                                We encountered an issue with your $450.00 payment to Freehold Financial. Please choose a different payment method below, or chat with us to resolve the issue.
                              </p>
                            </div>

                            {/* Failed Payment Method */}
                            <div className="bg-[#FFFBFA] border border-[#FDA29B] rounded-lg p-3 mb-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-7 bg-white border border-[#D0D5DD] rounded flex items-center justify-center relative">
                                    <i className="fas fa-credit-card text-[#0076DE] text-sm"></i>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                      <i className="fas fa-exclamation text-white text-xs"></i>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-[#101828] text-sm">Debit 3469</div>
                                    <div className="text-[#344054] text-xs">Service Fee - $1.99</div>
                                  </div>
                                </div>
                                <div 
                                  className={`px-3 py-2 rounded text-sm font-semibold transition-all duration-200 ${
                                    isLoadingChat 
                                      ? 'bg-gray-400 cursor-not-allowed' 
                                      : 'bg-gradient-to-r from-[#4566D7] to-[#4566D7] text-white cursor-pointer hover:from-[#3B5BC7] hover:to-[#3B5BC7]'
                                  }`}
                                  onClick={isLoadingChat ? undefined : handleContactUs}
                                >
                                  {isLoadingChat ? (
                                    <div className="flex items-center space-x-2">
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      <span>Loading...</span>
                                    </div>
                                  ) : (
                                    'Contact Us'
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Suggested Payment Methods */}
                            <div className="mb-6">
                              <h3 className="text-[#101828] text-sm font-bold uppercase mb-3">Suggested Payment Methods</h3>
                              <div className="space-y-0">
                                <div className="flex items-center py-3 border-b border-[#E4E7EC]">
                                  <div className="w-8 h-6 bg-[#D0D5DD] rounded mr-3"></div>
                                  <div className="flex-1">
                                    <div className="w-20 h-2 bg-[#D0D5DD] rounded-full mb-1"></div>
                                    <div className="w-32 h-2 bg-[#D0D5DD] rounded-full"></div>
                                  </div>
                                </div>
                                <div className="flex items-center py-3 border-b border-[#E4E7EC]">
                                  <div className="w-8 h-6 bg-[#D0D5DD] rounded mr-3"></div>
                                  <div className="flex-1">
                                    <div className="w-20 h-2 bg-[#D0D5DD] rounded-full mb-1"></div>
                                    <div className="w-32 h-2 bg-[#D0D5DD] rounded-full"></div>
                                  </div>
                                </div>
                                <div className="flex items-center py-3">
                                  <div className="w-8 h-6 bg-[#D0D5DD] rounded mr-3"></div>
                                  <div className="flex-1">
                                    <div className="w-20 h-2 bg-[#D0D5DD] rounded-full mb-1"></div>
                                    <div className="w-32 h-2 bg-[#D0D5DD] rounded-full"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* More Options */}
                            <div className="text-center">
                              <button className="text-[#667085] text-sm font-medium">
                                More Options <i className="fas fa-chevron-down text-xs ml-1"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                        )}

                                                {/* Step 5: Web Chat Experience (Shows after Contact Us is clicked) */}
                        {currentStep >= 5 && (
                          <div className="animate-fadeIn h-full">
                            {/* Web Chat Interface */}
                            <div className="bg-white h-full flex flex-col">
                              {/* Chat Header - Freehold Financial Branding */}
                              <div className="bg-[#4566D7] px-5 py-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-6 h-6 flex items-center justify-center">
                                    <i className="fas fa-university text-white text-sm"></i>
                                  </div>
                                  <div className="text-white text-sm font-medium">Freehold Financial</div>
                                </div>
                                <div className="w-6 h-6 flex items-center justify-center">
                                  <i className="fas fa-times text-white text-sm"></i>
                                </div>
                              </div>

                              {/* Chat Messages */}
                              <div 
                                ref={chatMessagesRef} 
                                className="flex-1 p-4 space-y-4 overflow-y-auto cursor-pointer"
                                onClick={() => chatStep >= 3 && setShowCallScreen(true)}
                              >
                                {/* Initial Content - Only shows after 1 second delay */}
                                {chatStep >= 0.5 && (
                                  <>
                                    {/* Freehold Financial Omnichannel Message */}
                                    <div className="flex justify-start animate-fadeIn">
                                      <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                                        <p className="text-gray-800 text-sm">Hi James, do you need assistance with your recent payment issue?</p>
                                      </div>
                                    </div>

                                    {/* Failed Payment Details Card */}
                                    <div className="flex justify-start animate-fadeIn">
                                      <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[80%] shadow-sm">
                                        <div className="flex items-center justify-between mb-3">
                                          <h4 className="text-sm font-semibold text-gray-800">Failed Payment Details</h4>
                                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                            <i className="fas fa-exclamation-triangle text-red-500 text-xs"></i>
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <div className="flex items-center space-x-3">
                                            <div className="w-10 h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                                              <i className="fas fa-credit-card text-white text-xs"></i>
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium text-gray-800">Debit Card ending in 3469</p>
                                              <p className="text-xs text-gray-500">Service Fee: $1.99</p>
                                            </div>
                                          </div>
                                          <div className="pt-2 border-t border-gray-100">
                                            <div className="flex justify-between items-center">
                                              <span className="text-sm text-gray-600">Payment Amount:</span>
                                              <span className="text-lg font-bold text-red-600">$450.00</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {/* Progressive Chat Messages */}

                                {chatStep >= 1 && (
                                  <>
                                    {/* User Response */}
                                    <div className="flex justify-end animate-fadeIn">
                                      <div className="bg-[#4566D7] rounded-lg px-4 py-3 max-w-[80%]">
                                        <p className="text-sm text-white">Yes, help me fix this payment</p>
                                      </div>
                                    </div>

                                    {/* IVA Response - Combined Message */}
                                    {chatStep >= 1.5 && (
                                      <div className="flex justify-start animate-fadeIn">
                                        <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                                          <p className="text-gray-800 text-sm">Your bank account ending in 3469 has been blocked due to multiple instances of insufficient funds returns. I can unblock it as a one-time courtesy if you'd like.</p>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}

                                {chatStep >= 2 && (
                                  <>
                                    {/* User Response */}
                                    <div className="flex justify-end animate-fadeIn">
                                      <div className="bg-[#4566D7] rounded-lg px-4 py-3 max-w-[80%]">
                                        <p className="text-sm text-white">Yes</p>
                                      </div>
                                    </div>

                                    {/* IVA Confirmation */}
                                    <div className="flex justify-start animate-fadeIn">
                                      <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                                        <p className="text-gray-800 text-sm">Ok, your bank account ending in 3469 has been unblocked. I can help you complete your payment.</p>
                                      </div>
                                    </div>

                                    {/* Payment Form, Processing Spinner, or Receipt */}
                                    <div className="flex justify-start animate-fadeIn">
                                      {processingPayment ? (
                                        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-[88%] shadow-sm">
                                          <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4566D7] mx-auto mb-4"></div>
                                            <h3 className="text-base font-bold text-gray-800 mb-2">Processing Payment...</h3>
                                            <p className="text-sm text-gray-600">Please wait while we complete your transaction</p>
                                          </div>
                                        </div>
                                      ) : !paymentSuccessful ? (
                                        <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[88%] shadow-sm">
                                          {/* Account Information */}
                                          <div className="mb-3">
                                            <h3 className="text-base font-bold text-gray-800 mb-1">Freehold Financial</h3>
                                            <p className="text-xs text-gray-600 mb-2">Account: 00019256789</p>
                                            <div className="flex justify-between items-center">
                                              <span className="text-xs font-medium text-gray-700">Payment Date</span>
                                              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md px-2 py-1">
                                                <i className="fas fa-calendar text-[#4566D7] text-xs"></i>
                                                <span className="text-xs font-medium text-gray-800">August 31st, 2025</span>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Payment Method Selection */}
                                          <div className="mb-3">
                                            <p className="text-xs font-medium text-gray-700 mb-2">Select Payment Method:</p>
                                            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                                              <button className="bg-white border-2 border-[#4566D7] p-2 rounded-md flex flex-col items-center justify-center min-w-[60px] flex-shrink-0">
                                                <i className="fas fa-credit-card text-[#4566D7] text-sm mb-1"></i>
                                                <span className="text-xs text-[#4566D7] font-medium">**3469</span>
                                              </button>
                                              <button className="bg-white border border-gray-300 p-2 rounded-md flex flex-col items-center justify-center min-w-[60px] flex-shrink-0 hover:border-[#4566D7] transition-colors">
                                                <i className="fas fa-university text-gray-600 text-sm mb-1"></i>
                                                <span className="text-xs text-gray-600">Bank</span>
                                              </button>
                                              <button className="bg-white border border-gray-300 p-2 rounded-md flex flex-col items-center justify-center min-w-[60px] flex-shrink-0 hover:border-[#4566D7] transition-colors">
                                                <i className="fab fa-paypal text-gray-600 text-sm mb-1"></i>
                                                <span className="text-xs text-gray-600">PayPal</span>
                                              </button>
                                              <button className="bg-white border border-gray-300 p-2 rounded-md flex flex-col items-center justify-center min-w-[60px] flex-shrink-0 hover:border-[#4566D7] transition-colors">
                                                <i className="fas fa-wallet text-gray-600 text-sm mb-1"></i>
                                                <span className="text-xs text-gray-600">Venmo</span>
                                              </button>
                                              <button className="bg-white border border-gray-300 p-2 rounded-md flex flex-col items-center justify-center min-w-[60px] flex-shrink-0 hover:border-[#4566D7] transition-colors">
                                                <i className="fas fa-mobile-alt text-gray-600 text-sm mb-1"></i>
                                                <span className="text-xs text-gray-600">CashApp</span>
                                              </button>
                                            </div>
                                          </div>

                                          {/* Payment Amount and Complete Button */}
                                          <div className="mb-3">
                                            <p className="text-xs font-medium text-gray-700 mb-1">Payment Amount</p>
                                            <div className="flex items-center space-x-2">
                                              <div className="bg-white border-2 border-gray-200 rounded-md px-2 py-1.5 flex-1">
                                                <span className="text-sm font-bold text-gray-800">$450.00</span>
                                              </div>
                                              <button 
                                                className="bg-[#4566D7] hover:bg-[#3B5BC7] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                                                onClick={handlePaymentSuccess}
                                              >
                                                Pay
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="bg-white border border-green-200 rounded-lg p-3 max-w-[88%] shadow-sm">
                                          {/* Payment Receipt */}
                                          <div className="text-center mb-3">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                              <i className="fas fa-check text-green-600 text-lg"></i>
                                            </div>
                                            <h3 className="text-base font-bold text-green-800 mb-1">Payment Successful!</h3>
                                            <p className="text-xs text-green-600">Transaction completed</p>
                                          </div>
                                          
                                          {/* Receipt Details */}
                                          <div className="space-y-2 mb-3">
                                            <div className="flex justify-between items-center">
                                              <span className="text-xs text-gray-600">Merchant:</span>
                                              <span className="text-xs font-medium text-gray-800">Freehold Financial</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-xs text-gray-600">Account:</span>
                                              <span className="text-xs font-medium text-gray-800">00019256789</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-xs text-gray-600">Payment Method:</span>
                                              <span className="text-xs font-medium text-gray-800">Debit **3469</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-xs text-gray-600">Amount:</span>
                                              <span className="text-xs font-medium text-gray-800">$450.00</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-xs text-gray-600">Service Fee:</span>
                                              <span className="text-xs font-medium text-gray-800">$1.99</span>
                                            </div>
                                            <div className="flex justify-between items-center border-t border-gray-100 pt-2">
                                              <span className="text-xs font-medium text-gray-800">Total:</span>
                                              <span className="text-sm font-bold text-gray-800">$451.99</span>
                                            </div>
                                          </div>
                                          
                                          {/* Transaction ID */}
                                          <div className="text-center">
                                            <p className="text-xs text-gray-500">Transaction ID: PNM-{Date.now().toString().slice(-8)}</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Payment Success Messages */}
                                    {paymentSuccessful && chatStep >= 2.5 && (
                                      <>
                                        {/* Payment Confirmation Message */}
                                        <div className="flex justify-start animate-fadeIn">
                                          <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                                            <p className="text-gray-800 text-sm">Your payment has been successfully completed. I emailed you a copy of your receipt.</p>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    {/* Proactive Offer Message */}
                                    {paymentSuccessful && chatStep >= 2.75 && (
                                      <>
                                        <div className="flex justify-start animate-fadeIn">
                                          <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                                            <p className="text-gray-800 text-sm">We noticed that you have paid 3 days past due in 3 instances, would you like to speak to an agent about requesting a due date change?</p>
                                          </div>
                                        </div>

                                        {/* Quick Reply Buttons */}
                                        {chatStep < 3 && (
                                          <div className="px-4 py-2">
                                            <div className="flex space-x-2">
                                              <button 
                                                className="flex-1 bg-[#4566D7] hover:bg-[#3B5BC7] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                                onClick={() => setChatStep(3)}
                                              >
                                                Yes
                                              </button>
                                              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                                                No thanks
                                              </button>
                                            </div>
                                          </div>
                                        )}

                                        {/* User Response - Yes */}
                                        {chatStep >= 3 && (
                                          <div className="flex justify-end animate-fadeIn">
                                            <div className="bg-[#4566D7] rounded-lg px-4 py-3 max-w-[80%]">
                                              <p className="text-sm text-white">Yes</p>
                                            </div>
                                          </div>
                                        )}

                                        {/* System Response - VIP Line Message */}
                                        {chatStep >= 3 && (
                                          <div className="flex justify-start animate-fadeIn">
                                            <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                                              <p className="text-gray-800 text-sm">Great, click the button below to dial our VIP line and speak to an agent within 3 minutes.</p>
                                            </div>
                                          </div>
                                        )}

                                        {/* Call Button */}
                                        {chatStep >= 3 && (
                                          <div className="px-4 py-3">
                                            <button 
                                              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
                                              onClick={() => setShowCallScreen(true)}
                                            >
                                              <i className="fas fa-phone mr-2"></i>
                                              Call
                                            </button>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>

                          {/* Quick Reply Buttons */}
                          {chatStep >= 0.5 && chatStep < 1 && (
                            <div className="px-4 py-3 space-y-2">
                              <div className="flex space-x-2">
                                <button 
                                  className="bg-[#4566D7] hover:bg-[#3B5BC7] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                  onClick={handleChatProgression}
                                >
                                  Yes, help me fix this payment
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                                  I have a different question
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                                  Talk to a human agent
                                </button>
                              </div>
                            </div>
                          )}

                          {chatStep >= 1.5 && chatStep < 2 && (
                            <div className="px-4 py-3 space-y-2">
                              <div className="flex space-x-2">
                                <button 
                                  className="bg-[#4566D7] hover:bg-[#3B5BC7] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                  onClick={handleChatProgression}
                                >
                                  Yes
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                                  I'll pay another way
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                                  Live Agent
                                </button>
                              </div>
                            </div>
                          )}



                          {/* Text Input */}
                          <div className="px-4 py-3 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                                              <input 
                                  type="text" 
                                  placeholder="Type your message here..." 
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                                />
                              <button className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                                <i className="fas fa-paper-plane text-white text-xs"></i>
                              </button>
                            </div>
                          </div>

                          {/* Virtual Keyboard */}
                          <div className="px-4 py-3 bg-gray-100 border-t border-gray-200">
                            <div className="space-y-2">
                              {/* Top Row */}
                              <div className="flex justify-center space-x-1">
                                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                                  <button key={key} className="w-8 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">
                                    {key}
                                  </button>
                                ))}
                              </div>
                              {/* Middle Row */}
                              <div className="flex justify-center space-x-1">
                                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                                  <button key={key} className="w-8 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">
                                    {key}
                                  </button>
                                ))}
                              </div>
                              {/* Bottom Row */}
                              <div className="flex justify-center space-x-1">
                                <button className="w-12 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">
                                  <i className="fas fa-arrow-up text-gray-600"></i>
                                </button>
                                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
                                  <button key={key} className="w-8 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">
                                    {key}
                                  </button>
                                ))}
                                <button className="w-12 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">
                                  <i className="fas fa-backspace text-gray-600"></i>
                                </button>
                              </div>
                              {/* Special Keys */}
                              <div className="flex justify-center space-x-1">
                                <button className="w-12 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">123</button>
                                <button className="w-8 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">
                                  <i className="fas fa-globe text-gray-600"></i>
                                </button>
                                <button className="w-8 h-8 bg-white border border-gray-500 rounded text-xs font-medium hover:bg-gray-50">
                                  <i className="fas fa-microphone text-gray-600"></i>
                                </button>
                                <button className="w-24 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">space</button>
                                <button className="w-12 h-8 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50">return</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        )}

                        {/* Call Screen */}
                        {showCallScreen && (
                          <div className="animate-fadeIn h-full absolute inset-0 z-50">
                            {/* Hidden audio element for call simulation */}
                            <audio 
                              ref={callAudioRef}
                              src="/IVA Demo.mp4"
                              preload="auto"
                              style={{ display: 'none' }}
                            />
                            
                            <div className="bg-white h-full flex flex-col">
                              {/* Call Header */}
                              <div className="bg-[#4566D7] px-5 py-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-6 h-6 flex items-center justify-center">
                                    <i className="fas fa-phone text-white text-sm"></i>
                                  </div>
                                  <div className="text-white text-sm font-medium">Active Call</div>
                                </div>
                                <button 
                                  onClick={handleCallHangup}
                                  className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                                >
                                  <i className="fas fa-times text-white text-sm"></i>
                                </button>
                              </div>

                              {/* Call Content */}
                              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                {/* Agent Avatar */}
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                                  <i className="fas fa-user-tie text-white text-3xl"></i>
                                </div>
                                
                                {/* Call Status */}
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                  {callDuration < 3 ? 'Connecting to Agent' : 'Connected'}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                  {callDuration < 3 
                                    ? 'Please wait while we connect you to a VIP agent' 
                                    : 'You are now speaking with Brian Johnson'
                                  }
                                </p>
                                
                                {/* Call Timer */}
                                <div className="bg-gray-100 rounded-full px-6 py-3 mb-6">
                                  <div className="text-2xl font-mono text-gray-800">
                                    {callDuration < 3 ? `00:0${3 - callDuration}` : formatCallDuration(callDuration - 3)}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {callDuration < 3 ? 'Estimated wait time' : 'Call duration'}
                                  </div>
                                </div>
                                
                                {/* Call Controls */}
                                <div className="flex space-x-4">
                                  <button 
                                    onClick={handleCallHangup}
                                    className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
                                  >
                                    <i className="fas fa-phone-slash text-white text-xl"></i>
                                  </button>
                                  <button 
                                    onClick={handleCallMute}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                                      isCallMuted 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                  >
                                    <i className={`fas ${isCallMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-white text-xl`}></i>
                                  </button>
                                  <button className="w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
                                    <i className="fas fa-volume-up text-white text-xl"></i>
                                  </button>
                                </div>
                                
                                {/* Call Info */}
                                <div className="mt-8 text-sm text-gray-500">
                                  <p>VIP Priority Line</p>
                                  <p>Agent: Brian Johnson</p>
                                  <p>Department: Customer Success</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        </>
                      )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* iPhone Label */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">iPhone 16 Pro - Demo Size</p>
                <p className="text-gray-500 text-xs mt-1">Larger mockup for better visibility</p>
                <p className="text-blue-400 text-xs mt-2 font-medium">Click anywhere on screen to advance</p>
                <p className="text-gray-500 text-xs mt-1">Step {currentStep + 1} of 6</p>
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

export default Prototype1; 