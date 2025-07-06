"use client"

import { useState, useEffect } from "react"
import { Scale, Shield, AlertTriangle, FileText, CheckCircle, Gavel } from "lucide-react"

export function EHSLegalContent({ title, text, sources }) {
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
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) =>
      idx % 2 === 0 ? part : <strong key={idx} className="text-white font-semibold">{part}</strong>
    );
  }

  function renderTextWithPdfLinks(text) {
    if (!text) return null;
    
    // Split text into parts: regular text and PDF links
    const parts = text.split(/(https?:\/\/[^\s]+\.pdf)/gi);
    
    return parts.map((part, idx) => {
      // Check if this part is a PDF link
      if (part.match(/https?:\/\/[^\s]+\.pdf/i)) {
        return (
          <span key={idx} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <FileText className="h-5 w-5" />
            <a 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              PDF Document
            </a>
          </span>
        );
      }
      
      // Regular text - apply bold formatting
      return parseBoldText(part);
    });
  }

  const generateLegalElements = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute animate-legal-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      >
        <Shield
          className="text-blue-400 opacity-70"
          size={16 + Math.random() * 16}
          style={{
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      </div>
    ))
  }

  return (
    <>
      {/* Immersive EHS Legal Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-slate-900/10 animate-pulse" />

          {/* Floating Legal Elements */}
          {generateLegalElements()}

          {/* Central Legal Animation */}
          <div className="relative z-10 flex flex-col items-center animate-establish">
            <Scale className="text-blue-400 mb-4 animate-balance" size={80} />
            <div className="text-2xl font-bold text-blue-100 animate-fade-in-up">EHS Legal Compliance</div>
            <div className="flex items-center mt-4 text-slate-300 animate-fade-in-up-delay">
              <Gavel className="mr-2 animate-authority" size={20} />
              <span>Ensuring regulatory excellence...</span>
            </div>
          </div>

          {/* Particle Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-compliance"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-slate-900/5" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-10 animate-legal-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <FileText className="text-blue-400" size={24} />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-1 sm:px-2 lg:px-4 relative z-10">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-slate-500/10 rounded-2xl" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 drop-shadow-lg relative text-center">
                {title}
                <div className="absolute -top-2 -right-2 opacity-20">
                  <Shield className="text-blue-400 animate-pulse" size={32} />
                </div>
              </h1>

              <div className="prose prose-invert text-xl text-gray-300 mb-10 relative max-w-2xl mx-auto text-justify">
                {text && <div className="whitespace-pre-line">{renderTextWithPdfLinks(text)}</div>}
                <div className="absolute top-4 right-4 opacity-20">
                  <CheckCircle className="text-green-400 animate-authority" size={20} />
                </div>
              </div>

              {Array.isArray(sources) && sources.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-700/50 relative">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
                    Legal References
                    <Scale className="ml-2 text-blue-400 opacity-60" size={20} />
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {sources.map((src, idx) => (
                      <li key={idx} className="group">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-slate-300 transition-colors duration-300 hover:underline break-all group-hover:drop-shadow-sm"
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
        @keyframes legal-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 1; }
        }
        @keyframes legal-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-35px) rotate(90deg) scale(1.1); }
        }
        @keyframes establish {
          0% { transform: scale(0) rotate(-90deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes balance {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          25% { transform: rotate(2deg) scale(1.02); }
          50% { transform: rotate(-1deg) scale(0.98); }
          75% { transform: rotate(1deg) scale(1.01); }
        }
        @keyframes authority {
          0%, 100% { transform: translateX(0px) rotate(0deg) scale(1); }
          25% { transform: translateX(2px) rotate(5deg) scale(1.05); }
          50% { transform: translateX(-1px) rotate(-3deg) scale(0.95); }
          75% { transform: translateX(-2px) rotate(-5deg) scale(1.02); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up-delay {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes compliance {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes secure {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }
        .animate-legal-float {
          animation: legal-float 3s ease-in-out infinite;
        }
        .animate-legal-slow {
          animation: legal-slow 8s ease-in-out infinite;
        }
        .animate-establish {
          animation: establish 2s ease-out;
        }
        .animate-balance {
          animation: balance 3s ease-in-out infinite;
        }
        .animate-authority {
          animation: authority 2s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 1s ease-out 1s both;
        }
        .animate-compliance {
          animation: compliance 2s ease-in-out infinite;
        }
        .animate-secure {
          animation: secure 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
