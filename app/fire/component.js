"use client"

import { useState, useEffect } from "react"
import { Flame, Zap, Sun } from "lucide-react"

export function FireContent({ title, text, sources }) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setShowAnimation(false)
      setShowContent(true)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  function parseBoldText(str) {
    // split on **bold** and keep the bold segments
    const parts = str.split(/\*\*(.*?)\*\*/g);
    return parts.map((seg, idx) =>
      idx % 2 === 0 ? seg : <strong key={idx} className="font-semibold">{seg}</strong>
    );
  }
  
  function renderTextWithInlineImages(srcText = "") {
  const imageRE =
    /(https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s]*)?|\/[^\s]+?\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s]*)?)/gi

    return srcText
      .split(/\n\s*\n/) // paragraphs
      .map((block, pIdx) => {
        const parts = block.split(imageRE) // keeps the delimiter
        return (
          <p key={pIdx} className="mb-6 whitespace-pre-wrap text-justify">
            {parts.map((part, i) => {
              const isImg = imageRE.test(part)
              return isImg ? (
                <img
                  key={`img-${pIdx}-${i}`}
                  src={part}
                  className="my-4 max-w-full rounded shadow"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <span key={`txt-${pIdx}-${i}`}>{parseBoldText(part)}</span>
              )
            })}
          </p>
        )
      })
  }

  const generateEmbers = () =>
    Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute animate-ember"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      >
        <Flame
          className="text-orange-400 opacity-70"
          size={16 + Math.random() * 16}
          style={{ transform: `rotate(${Math.random() * 360}deg)` }}
        />
      </div>
    ))

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-orange-900/10 animate-pulse" />
          {generateEmbers()}
          <div className="relative z-10 flex flex-col items-center animate-ignite">
            <Flame className="text-orange-400 mb-4 animate-flicker" size={80} />
            <div className="text-2xl font-bold text-orange-100 animate-fade-in-up">
              Igniting the Fire Within
            </div>
            <div className="flex items-center mt-4 text-red-300 animate-fade-in-up-delay">
              <Zap className="mr-2 animate-spark" size={20} />
              <span>Embracing the power of flame...</span>
            </div>
          </div>
          {/* glowing particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-glow"
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
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-orange-900/5" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-10 animate-ember-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <Flame className="text-orange-400" size={24} />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-1 sm:px-3 lg:px-4 relative z-10">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10 rounded-2xl" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 drop-shadow-lg relative text-center">
                {title}
                <span className="absolute -top-2 -right-2 opacity-20">
                  <Flame className="text-orange-400 animate-pulse" size={32} />
                </span>
              </h1>

              {/* ----- render text with inline images ----- */}
              <div className="prose prose-invert text-xl text-gray-300 mb-10 relative max-w-2xl mx-auto text-justify">
                {renderTextWithInlineImages(text)}
                <span className="absolute top-4 right-4 opacity-20">
                  <Sun className="text-yellow-400 animate-spark" size={20} />
                </span>
              </div>

              {/* ----- sources (unchanged) ----- */}
              {Array.isArray(sources) && sources.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-700/50">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
                    Sources
                    <Flame className="ml-2 text-orange-400 opacity-60" size={20} />
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {sources.map((s, i) => (
                      <li key={i}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-400 hover:text-red-400 transition-colors duration-300 hover:underline break-all"
                        >
                          {s.label || s.url}
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
        @keyframes ember {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }
        @keyframes ember-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-40px) rotate(90deg) scale(1.2); }
        }
        @keyframes ignite {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes flicker {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          25% { transform: rotate(3deg) scale(1.05); }
          50% { transform: rotate(-2deg) scale(0.95); }
          75% { transform: rotate(2deg) scale(1.02); }
        }
        @keyframes spark {
          0%, 100% { transform: translateX(0px) rotate(0deg) scale(1); }
          25% { transform: translateX(3px) rotate(15deg) scale(1.1); }
          50% { transform: translateX(-2px) rotate(-10deg) scale(0.9); }
          75% { transform: translateX(-3px) rotate(-15deg) scale(1.05); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up-delay {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-ember {
          animation: ember 3s ease-in-out infinite;
        }
        .animate-ember-slow {
          animation: ember-slow 8s ease-in-out infinite;
        }
        .animate-ignite {
          animation: ignite 2s ease-out;
        }
        .animate-flicker {
          animation: flicker 2s ease-in-out infinite;
        }
        .animate-spark {
          animation: spark 1.5s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 1s ease-out 1s both;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
