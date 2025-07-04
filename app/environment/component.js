"use client"

import { useState, useEffect } from "react"
import { Leaf, TreePine, Wind } from "lucide-react"

export function EnvironmentContent({ title, text, sources }) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false)
      setShowContent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  function renderContentWithTables(text) {
    if (!text) return null;
    const blocks = text.split(/\n\s*\n/);
    return blocks.map((block, i) => {
      const lines = block.split(/\n/).filter(Boolean);
      const isTable =
        lines.length > 1 &&
        lines.filter((l) => (l.match(/\s{2,}/g) || []).length > 0).length > 1;
      if (isTable) {
        const rows = lines.map((line) =>
          line
            .trim()
            .split(/\s{2,}|\t+/)
            .map((cell) => cell.trim())
        );
        return (
          <div key={i} className="overflow-x-auto my-6">
            <table className="min-w-full text-sm text-left border border-gray-700 bg-gray-800 rounded-lg">
              <tbody>
                {rows.map((row, ridx) => (
                  <tr key={ridx} className={ridx === 0 ? "font-bold bg-gray-900" : ""}>
                    {row.map((cell, cidx) => (
                      <td
                        key={cidx}
                        className="px-3 py-2 border border-gray-700 whitespace-pre-line"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        // Render as paragraph
        return (
          <p key={i} className="mb-6">
            {block}
          </p>
        );
      }
    });
  }

  const generateLeaves = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      >
        <Leaf
          className="text-green-400 opacity-70"
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
      {/* Immersive Environment Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-green-900/20 to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10 animate-pulse" />

          {/* Floating Leaves */}
          {generateLeaves()}

          {/* Central Tree Animation */}
          <div className="relative z-10 flex flex-col items-center animate-grow">
            <TreePine className="text-green-400 mb-4 animate-sway" size={80} />
            <div className="text-2xl font-bold text-green-100 animate-fade-in-up">Exploring Our Environment</div>
            <div className="flex items-center mt-4 text-green-300 animate-fade-in-up-delay">
              <Wind className="mr-2 animate-wind" size={20} />
              <span>Immersing in nature's wisdom...</span>
            </div>
          </div>

          {/* Particle Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-twinkle"
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
        className={`py-16 relative overflow-hidden transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-blue-900/5" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-10 animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <Leaf className="text-green-400" size={24} />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 rounded-2xl" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 drop-shadow-lg relative">
                {title}
                <div className="absolute -top-2 -right-2 opacity-20">
                  <Leaf className="text-green-400 animate-pulse" size={32} />
                </div>
              </h1>

              <div className="prose prose-invert max-w-none text-xl text-gray-300 mb-10 relative">
                {renderContentWithTables(text)}
                <div className="absolute top-4 right-4 opacity-20">
                  <Wind className="text-blue-400 animate-wind" size={20} />
                </div>
              </div>

              {Array.isArray(sources) && sources.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-700/50 relative">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
                    Sources
                    <TreePine className="ml-2 text-green-400 opacity-60" size={20} />
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {sources.map((src, idx) => (
                      <li key={idx} className="group">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-green-400 transition-colors duration-300 hover:underline break-all group-hover:drop-shadow-sm"
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
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(90deg); }
        }
        
        @keyframes grow {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        
        @keyframes wind {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(5px) rotate(10deg); }
          75% { transform: translateX(-5px) rotate(-10deg); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delay {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-grow {
          animation: grow 2s ease-out;
        }
        
        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
        
        .animate-wind {
          animation: wind 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 1s ease-out 1s both;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
