"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "95%", label: "Pass Rate", description: "Students achieve their target scores" },
    { number: "260+", label: "Average Score", description: "Step 1 & Step 2 CK combined" },
    { number: "10,000+", label: "Questions", description: "Comprehensive question bank" },
    { number: "24/7", label: "AI Support", description: "Always available for learning" }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Intelligent AI Tutor",
      description: "Advanced GPT-4 powered medical tutor that understands complex medical concepts and provides personalized explanations tailored to your learning style.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Personal Knowledge Base",
      description: "Upload your study materials, notes, and textbooks. Our AI creates a personalized knowledge repository that enhances every learning session.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Adaptive Learning",
      description: "Smart algorithms identify your weak areas and create targeted study plans. Focus on what matters most for your success.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Clinical Integration",
      description: "Bridge the gap between basic science and clinical practice with real-world case studies and clinical reasoning exercises.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const usmleSteps = [
    {
      step: "Step 1",
      title: "Foundation of Medical Knowledge",
      description: "Master the fundamental sciences that form the backbone of clinical medicine. Our AI tutor helps you understand complex biochemical pathways, physiological mechanisms, and pathological processes.",
      topics: ["Biochemistry", "Physiology", "Pathology", "Pharmacology", "Microbiology", "Anatomy"],
      color: "from-blue-500 to-blue-600",
      icon: "🧬"
    },
    {
      step: "Step 2 CK",
      title: "Clinical Knowledge Mastery",
      description: "Apply your foundational knowledge to real clinical scenarios. Learn to diagnose, treat, and manage patients across all medical specialties with confidence.",
      topics: ["Internal Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Psychiatry", "Emergency Medicine"],
      color: "from-green-500 to-green-600",
      icon: "🏥"
    }
  ];

  const successStrategies = [
    {
      title: "Spaced Repetition Mastery",
      description: "Our AI implements scientifically-proven spaced repetition algorithms to maximize long-term retention and minimize study time.",
      icon: "🔄"
    },
    {
      title: "Active Recall Training",
      description: "Transform passive reading into active learning with our intelligent questioning system that strengthens memory pathways.",
      icon: "💭"
    },
    {
      title: "Clinical Reasoning Development",
      description: "Develop the critical thinking skills needed to excel in clinical scenarios through our case-based learning approach.",
      icon: "🧠"
    },
    {
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics that identify strengths, weaknesses, and optimal study strategies.",
      icon: "📊"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Top Left Educational Disclaimer */}
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg border border-red-400">
          <span className="text-xs sm:text-sm font-bold">⚠️ THIS APP IS FOR EDUCATIONAL PURPOSES ONLY</span>
        </div>
      </div>

      {/* Bottom Left Educational Disclaimer */}
      <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm text-gray-600 px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-lg border border-gray-200">
          <span className="text-xs font-medium">For Educational Purposes Only</span>
        </div>
      </div>

      {/* Detailed Medical Professional Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main Medical Professional Silhouette */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] sm:w-[500px] sm:h-[700px] opacity-15 blur-2xl">
          <div className="w-full h-full relative">
            {/* Medical Professional Figure */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-56 sm:w-72 sm:h-80 relative">
                {/* Head with Medical Cap */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-blue-300/40 rounded-full"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-blue-400/30 rounded-full"></div>
                
                {/* Body with Medical Coat */}
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-36 h-52 bg-cyan-300/40 rounded-t-full"></div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 h-48 bg-cyan-400/30 rounded-t-full"></div>
                
                {/* Stethoscope */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-emerald-400/50 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald-500/40 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform translate-x-8 w-6 h-6 bg-emerald-500/40 rounded-full"></div>
                
                {/* Arms */}
                <div className="absolute top-28 left-6 w-6 h-20 bg-blue-400/40 rounded-full"></div>
                <div className="absolute top-28 right-6 w-6 h-20 bg-blue-400/40 rounded-full"></div>
                
                {/* Hands */}
                <div className="absolute top-46 left-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                <div className="absolute top-46 right-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                
                {/* Medical Bag */}
                <div className="absolute top-50 left-8 w-12 h-16 bg-emerald-400/30 rounded-lg"></div>
                <div className="absolute top-52 left-10 w-8 h-2 bg-emerald-500/40 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Medical Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full relative">
            {/* Medical Cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-white/30 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 w-2 h-full bg-white/30 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-10 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full relative">
            {/* Heart Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-8 blur-xl">
          <div className="w-full h-full bg-gradient-to-br from-cyan-300/20 to-emerald-300/20 rounded-full relative">
            {/* DNA Helix */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

      {/* Hero Section */}
      <div className="relative container mx-auto max-w-7xl px-4 py-20">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <svg className="w-10 h-10 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg">
              <span className="text-white font-semibold text-xs sm:text-sm">Niveditha Rajulapati</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-fade-in px-4">
            USMLE AI Tutor
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 animate-fade-in-delay px-4">
            Transform your medical education with the world's most advanced AI-powered USMLE preparation platform. 
            Achieve your dream score and unlock your medical career potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-delay-2 px-4">
            <Link href="/chat" className="group w-full sm:w-auto">
              <button className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex items-center justify-center text-sm sm:text-base">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start Learning Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
            <Link href="/uploads" className="group w-full sm:w-auto">
              <button className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-200 flex items-center justify-center text-sm sm:text-base">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Build Knowledge Base
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20 px-4">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center p-3 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-delay-${index + 1}`}>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* USMLE Impact Section */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              How USMLE Transforms Your Medical Career
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              The USMLE isn't just an exam - it's your gateway to a successful medical career. 
              Discover how achieving excellence opens doors to prestigious residencies and lifelong opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center mb-8 sm:mb-16">
            <div className="space-y-4 sm:space-y-8">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl border border-blue-100">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">🎯</span>
                  Residency Program Access
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  High USMLE scores unlock doors to competitive residency programs in dermatology, 
                  radiology, orthopedic surgery, and other highly sought-after specialties. 
                  Your score directly impacts your career trajectory.
                </p>
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl border border-green-100">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">💼</span>
                  Career Advancement
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Strong USMLE performance demonstrates clinical competence and opens opportunities 
                  for leadership roles, research positions, and academic appointments throughout your career.
                </p>
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-100">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">🌟</span>
                  Professional Recognition
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Excellence in USMLE establishes your reputation as a competent physician, 
                  earning respect from colleagues, patients, and the medical community.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-2xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Success Metrics</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span>Step 1 Score 250+</span>
                    <span className="text-green-300">✓ Top 10%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span>Step 2 CK Score 260+</span>
                    <span className="text-green-300">✓ Competitive</span>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span>Combined Excellence</span>
                    <span className="text-green-300">✓ Dream Residency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* USMLE Steps Section */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Master Both USMLE Steps
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Comprehensive preparation for Step 1 and Step 2 CK with our AI-powered learning system
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {usmleSteps.map((step, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-6 sm:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">{step.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{step.step}</h3>
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">{step.title}</h4>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">{step.description}</p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {step.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="p-2 sm:p-3 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl text-center font-medium text-gray-700 shadow-sm text-sm sm:text-base">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className={`w-full h-60 sm:h-80 bg-gradient-to-br ${step.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl`}>
                    <div className="text-white text-center">
                      <div className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-4">{step.icon}</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">{step.step}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Strategies Section */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Strategies for #1 Rank Achievement
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Proven methodologies used by top performers to achieve exceptional USMLE scores
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {successStrategies.map((strategy, index) => (
              <div key={index} className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center">{strategy.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">{strategy.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed text-center">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Revolutionary Learning Features
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Experience the future of medical education with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={index < 2 ? (index === 0 ? "/chat" : "/uploads") : "/chat"} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-start mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors text-sm sm:text-base">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* USMLE Study Roadmap Section */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Complete USMLE Study Roadmap
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your personalized journey from medical student to licensed physician
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
            
            <div className="space-y-8 sm:space-y-16">
              {/* Phase 1: Foundation */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="w-full sm:w-1/2 sm:pr-8 text-left sm:text-right">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-center sm:justify-end mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 sm:ml-4">
                        <span className="text-white font-bold text-sm sm:text-base">1</span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Foundation Phase</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Months 1-6: Build strong fundamentals</p>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center sm:justify-end">
                        <span className="text-xs sm:text-sm text-gray-600">Basic Sciences Mastery</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full ml-2"></div>
                      </div>
                      <div className="flex items-center sm:justify-end">
                        <span className="text-xs sm:text-sm text-gray-600">First Aid + UWorld</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full ml-2"></div>
                      </div>
                      <div className="flex items-center sm:justify-end">
                        <span className="text-xs sm:text-sm text-gray-600">NBME Practice Tests</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full ml-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
                <div className="w-full sm:w-1/2 sm:pl-8 mt-4 sm:mt-0">
                  <div className="text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">📚</div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">Study Materials</h4>
                    <p className="text-sm sm:text-base text-gray-600">First Aid, UWorld, Pathoma, Sketchy</p>
                  </div>
                </div>
              </div>

              {/* Phase 2: Intensive */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="w-full sm:w-1/2 sm:pr-8 text-left sm:text-right">
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">⚡</div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">Intensive Review</h4>
                    <p className="text-sm sm:text-base text-gray-600">Months 7-8: Focused preparation</p>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-cyan-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
                <div className="w-full sm:w-1/2 sm:pl-8 mt-4 sm:mt-0">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Intensive Phase</h3>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mr-3 sm:ml-4">
                        <span className="text-white font-bold text-sm sm:text-base">2</span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Months 7-8: Dedicated study period</p>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full mr-2"></div>
                        <span className="text-xs sm:text-sm text-gray-600">Question Bank Completion</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full mr-2"></div>
                        <span className="text-xs sm:text-sm text-gray-600">Weak Area Focus</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full mr-2"></div>
                        <span className="text-xs sm:text-sm text-gray-600">Mock Exams</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3: Step 1 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="w-full sm:w-1/2 sm:pr-8 text-left sm:text-right">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-center sm:justify-end mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 sm:ml-4">
                        <span className="text-white font-bold text-sm sm:text-base">3</span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Step 1 Exam</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Month 9: Take the exam</p>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center sm:justify-end">
                        <span className="text-xs sm:text-sm text-gray-600">280 Questions</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full ml-2"></div>
                      </div>
                      <div className="flex items-center sm:justify-end">
                        <span className="text-xs sm:text-sm text-gray-600">8 Hours Duration</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full ml-2"></div>
                      </div>
                      <div className="flex items-center sm:justify-end">
                        <span className="text-xs sm:text-sm text-gray-600">Target: 250+</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full ml-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
                <div className="w-full sm:w-1/2 sm:pl-8 mt-4 sm:mt-0">
                  <div className="text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🎯</div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">Exam Day</h4>
                    <p className="text-sm sm:text-base text-gray-600">Confidence and preparation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analytics Section */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Performance Analytics & Success Metrics
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Track your progress with detailed analytics and visualizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {/* Score Distribution Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Score Distribution</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">240-250</span>
                  <div className="flex items-center">
                    <div className="w-12 sm:w-16 md:w-20 h-1 sm:h-2 bg-gray-200 rounded-full mr-1 sm:mr-2">
                      <div className="w-10 sm:w-12 md:w-16 h-1 sm:h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">250-260</span>
                  <div className="flex items-center">
                    <div className="w-12 sm:w-16 md:w-20 h-1 sm:h-2 bg-gray-200 rounded-full mr-1 sm:mr-2">
                      <div className="w-11 sm:w-14 md:w-18 h-1 sm:h-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">90%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">260+</span>
                  <div className="flex items-center">
                    <div className="w-12 sm:w-16 md:w-20 h-1 sm:h-2 bg-gray-200 rounded-full mr-1 sm:mr-2">
                      <div className="w-12 sm:w-16 md:w-20 h-1 sm:h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">95%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Time Analytics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Study Time</h3>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">6-8</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Hours Daily</div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Morning</span>
                    <span>3-4h</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Evening</span>
                    <span>3-4h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Bank Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Question Bank</h3>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">85%</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Completion Rate</div>
                <div className="w-full bg-gray-200 rounded-full h-1 sm:h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1 sm:h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>

            {/* Accuracy Rate */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Accuracy</h3>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">78%</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Average Score</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Recent</span>
                    <span className="text-emerald-600">↑ 5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Schedule Visualization */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Weekly Study Schedule</h3>
            <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">{day}</div>
                  <div className="space-y-1">
                    <div className="h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                    <div className="h-2 sm:h-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded"></div>
                    <div className="h-2 sm:h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded"></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 sm:mt-2">6-8h</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialty Match Visualization */}
        <div className="mb-12 sm:mb-20 px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Specialty Match Success Rates
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              How your USMLE scores impact residency matching
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { specialty: 'Dermatology', score: '250+', matchRate: '85%', color: 'from-pink-500 to-rose-600' },
              { specialty: 'Orthopedic Surgery', score: '255+', matchRate: '78%', color: 'from-blue-500 to-indigo-600' },
              { specialty: 'Radiology', score: '245+', matchRate: '82%', color: 'from-purple-500 to-violet-600' },
              { specialty: 'Internal Medicine', score: '230+', matchRate: '95%', color: 'from-green-500 to-emerald-600' },
              { specialty: 'Emergency Medicine', score: '235+', matchRate: '88%', color: 'from-orange-500 to-red-600' },
              { specialty: 'Pediatrics', score: '225+', matchRate: '92%', color: 'from-cyan-500 to-blue-600' },
              { specialty: 'Neurology', score: '240+', matchRate: '87%', color: 'from-indigo-500 to-purple-600' },
              { specialty: 'Cardiology', score: '260+', matchRate: '75%', color: 'from-red-500 to-pink-600' },
              { specialty: 'Gynecology', score: '245+', matchRate: '83%', color: 'from-teal-500 to-green-600' }
            ].map((item, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <span className="text-white text-lg sm:text-xl md:text-2xl">🏥</span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">{item.specialty}</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-xs sm:text-sm text-gray-600">Target Score: <span className="font-semibold text-blue-600">{item.score}</span></div>
                    <div className="text-xs sm:text-sm text-gray-600">Match Rate: <span className="font-semibold text-emerald-600">{item.matchRate}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl mx-4 sm:mx-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to Achieve Your Dream Score?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful medical students who have transformed their USMLE preparation 
            with our AI-powered learning platform. Your medical career starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/chat" className="group w-full sm:w-auto">
              <button className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex items-center justify-center text-sm sm:text-base">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start Your Journey
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
            <Link href="/uploads" className="group w-full sm:w-auto">
              <button className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex items-center justify-center text-sm sm:text-base">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Build Knowledge Base
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}