"use client"

import { useState, useEffect } from "react"
import { Shield, HardHat, AlertTriangle, FileText, CheckCircle, Zap, Eye, Users } from "lucide-react"

export function SafetyContent({ title, text, sources }) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false)
      setShowContent(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  function parseBoldText(text) {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, idx) =>
      idx % 2 === 0 ? (
        part
      ) : (
        <strong key={idx} className="text-white font-semibold">
          {part}
        </strong>
      ),
    )
  }

  function renderTextWithFileLinks(text) {
    if (!text) return null;
    // Match URLs that contain file extensions anywhere in the URL
    const parts = text.split(/(https?:\/\/[^\s]+?\.(pdf|xlsx|xls|pptx)[^\s]*)/gi);
    return parts.map((part, idx) => {
      // Check if this part is a URL with a file extension
      if (part.match(/https?:\/\/[^\s]+?\.(pdf|xlsx|xls|pptx)/i)) {
        if (part.match(/\.pdf/i)) {
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <a href={part} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                PDF Document
              </a>
            </span>
          );
        }
        if (part.match(/\.(xlsx|xls)/i)) {
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <a href={part} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Excel Spreadsheet
              </a>
            </span>
          );
        }
        if (part.match(/\.pptx/i)) {
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <a href={part} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                PowerPoint Presentation
              </a>
            </span>
          );
        }
      }
      // If it's not a file link, parse for bold text
      return parseBoldText(part);
    });
  }

  const generateSafetyElements = () => {
    const safetyIcons = [Shield, HardHat, AlertTriangle, Eye, Users]
    return Array.from({ length: 15 }, (_, i) => {
      const IconComponent = safetyIcons[Math.floor(Math.random() * safetyIcons.length)]
      return (
        <div
          key={i}
          className="absolute animate-safety-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <IconComponent
            className="text-orange-400 opacity-60"
            size={12 + Math.random() * 20}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      )
    })
  }

  const generateWarningSignals = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="absolute animate-warning-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      >
        <AlertTriangle className="text-yellow-400 opacity-40" size={24 + Math.random() * 16} />
      </div>
    ))
  }

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-orange-900/20 to-gray-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-red-900/10 animate-pulse-slow" />

          {generateSafetyElements()}
          {generateWarningSignals()}

          <div className="relative z-10 flex flex-col items-center animate-safety-establish">
            <div className="relative mb-6">
              <Shield className="text-orange-400 animate-safety-shield" size={80} />
              <div className="absolute inset-0 flex items-center justify-center">
                <HardHat className="text-white animate-safety-helmet" size={32} />
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-100 animate-fade-in-up">Workplace Safety Excellence</div>
            <div className="flex items-center mt-4 text-yellow-300 animate-fade-in-up-delay">
              <Zap className="mr-2 animate-safety-alert" size={20} />
              <span>Ensuring safe operations...</span>
            </div>
          </div>

          <div className="absolute bottom-20 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-safety-barrier" />

          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-safety-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <section
        className={`py-16 relative overflow-hidden transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-red-900/5" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-5 animate-safety-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            >
              <HardHat className="text-orange-400" size={32} />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-orange-700/30 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-red-500/10 rounded-2xl" />

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-safety-scan" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 drop-shadow-lg relative">
                {title}
                <div className="absolute -top-2 -right-2 opacity-30">
                  <Shield className="text-orange-400 animate-safety-pulse" size={32} />
                </div>
              </h1>

              <div className="prose prose-invert max-w-none text-xl text-gray-300 mb-10 relative">
                {text && <div className="whitespace-pre-line">{renderTextWithFileLinks(text)}</div>}
                <div className="absolute top-4 right-4 opacity-20">
                  <CheckCircle className="text-green-400 animate-safety-check" size={20} />
                </div>
              </div>

              {Array.isArray(sources) && sources.length > 0 && (
                <div className="mt-10 pt-6 border-t border-orange-700/30 relative">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
                    Safety References
                    <HardHat className="ml-2 text-orange-400 opacity-60" size={20} />
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {sources.map((src, idx) => (
                      <li key={idx} className="group">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-400 hover:text-yellow-400 transition-colors duration-300 hover:underline break-all group-hover:drop-shadow-sm"
                        >
                          {src.label || src.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes safety-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes safety-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-40px) rotate(90deg) scale(1.2); }
        }
        
        @keyframes safety-establish {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes safety-shield {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          25% { transform: scale(1.1) rotate(5deg); opacity: 0.9; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 0.8; }
          75% { transform: scale(1.1) rotate(-5deg); opacity: 0.9; }
        }
        
        @keyframes safety-helmet {
          0% { transform: rotate(0deg) scale(0); opacity: 0; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 0.8; }
          100% { transform: rotate(360deg) scale(1); opacity: 1; }
        }
        
        @keyframes safety-alert {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          25% { transform: scale(1.3) rotate(10deg); opacity: 0.7; }
          50% { transform: scale(0.8) rotate(-5deg); opacity: 1; }
          75% { transform: scale(1.2) rotate(-10deg); opacity: 0.8; }
        }
        
        @keyframes safety-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        
        @keyframes safety-check {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes warning-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delay {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes safety-sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
        }
        
        @keyframes safety-barrier {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes safety-scan {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-safety-float {
          animation: safety-float 4s ease-in-out infinite;
        }
        
        .animate-safety-slow {
          animation: safety-slow 12s ease-in-out infinite;
        }
        
        .animate-safety-establish {
          animation: safety-establish 2s ease-out;
        }
        
        .animate-safety-shield {
          animation: safety-shield 2s ease-in-out infinite;
        }
        
        .animate-safety-helmet {
          animation: safety-helmet 2s ease-out 0.5s both;
        }
        
        .animate-safety-alert {
          animation: safety-alert 1.5s ease-in-out infinite;
        }
        
        .animate-safety-pulse {
          animation: safety-pulse 2s ease-in-out infinite;
        }
        
        .animate-safety-check {
          animation: safety-check 3s ease-in-out infinite;
        }
        
        .animate-warning-pulse {
          animation: warning-pulse 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 1s ease-out 1s both;
        }
        
        .animate-safety-sparkle {
          animation: safety-sparkle 3s ease-in-out infinite;
        }
        
        .animate-safety-barrier {
          animation: safety-barrier 4s ease-in-out infinite;
        }
        
        .animate-safety-scan {
          animation: safety-scan 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}