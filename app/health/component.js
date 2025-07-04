"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Activity,
  Stethoscope,
  Plus,
  FileText,
  Shield
} from "lucide-react";

export function HealthContent({
  title = "Health & Wellness Guide",
  text = "4. Arrange transportation to the hospital\n\nhttps://example.com/doc.pdf",
  sources = [],
}) {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showContent, setShowContent]   = useState(false);
  const [pdfLinks,   setPdfLinks]       = useState([]);
  const [imageLinks, setImageLinks]     = useState([]);
  const [cleanedText,setCleanedText]    = useState("");
  const [modalImage, setModalImage]     = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowAnimation(false);
      setShowContent(true);
    }, 2_000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const rePDF   = /https?:\/\/[^\s]+\.pdf/gi;
    const reDOCX  = /https?:\/\/[^\s]+\.docx/gi;
    const rePDFl  = /https?:\/\/pdflink\.to\/[^\s]+/gi;
    const reImg   = /https?:\/\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?[^\s]*)?/gi;
    const reV1Img = /\/v1\/fill\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|webp|svg)/gi;

    const pdfs  = [...(text.match(rePDF)   || [])];
    const docx  = [...(text.match(reDOCX)  || [])];
    const links = [...(text.match(rePDFl)  || [])];
    const imgs  = Array.from(new Set([...(text.match(reImg)   || [])]));
    const v1    = [...(text.match(reV1Img) || [])];

    const allDocs = [...pdfs, ...docx, ...links];

    let cleaned = text;

    const strip = (arr) => {
      arr.forEach((raw) => {
        const esc = raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`[\\s\\t]*${esc}[\\s\\t,;.!?]*`, "gi");
        cleaned = cleaned.replace(re, " ");
      });
    };

    strip(imgs);
    strip(v1);
    strip(allDocs);

    /* gentle whitespace normalisation */
    cleaned = cleaned
      .replace(/\n\s+/g, "\n")      // trim whitespace after newlines
      .replace(/\s+\n/g, "\n")      // trim whitespace before newlines
      .replace(/\n{3,}/g, "\n\n")   // >2 blank lines → 2
      .replace(/ {3,}/g, "  ")      // 3+ spaces → 2 (tables)
      .replace(/^\s+|\s+$/gm, "")   // trim per-line
      .trim();

    /* populate state */
    setPdfLinks(
      allDocs.map((url, i) => ({
        url,
        label: url.includes(".docx")
          ? `DOCX Document ${i + 1}`
          : `PDF Document ${i + 1}`,
        type : url.includes(".docx") ? "docx" : "pdf",
      }))
    );
    setImageLinks(imgs);
    setCleanedText(cleaned);
  }, [text]);

  const openPdfInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function renderContentWithTables(text) {
    if (!text) return null;
    const blocks = text.split(/\n\s*\n/);
    return blocks.map((block, i) => {
      const lines = block.split(/\n/).filter(Boolean);
      const isTable =
        lines.length > 1 &&
        lines.filter((l) => (l.match(/\s{2,}/g) || []).length > 1)
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
                        className="px-3 py-2 border border-gray-700 whitespace-pre-line text-lg font-times"
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
          <p key={i} className="mb-6 whitespace-pre-line">
            {block}
          </p>
        );
      }
    });
  }

  const generateHeartbeats = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <div
        key={i}
        className="absolute animate-heartbeat"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      >
        <Heart
          className="text-red-400 opacity-60"
          size={12 + Math.random() * 20}
          style={{
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
          }}
        />
      </div>
    ))
  }

  const generateMedicalIcons = () => {
    const icons = [Plus, Shield, Activity]
    return Array.from({ length: 12 }, (_, i) => {
      const IconComponent = icons[Math.floor(Math.random() * icons.length)]
      return (
        <div
          key={i}
          className="absolute animate-medical-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          <IconComponent className="text-blue-400 opacity-40" size={16 + Math.random() * 12} />
        </div>
      )
    })
  }

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-blue-900/10 animate-pulse-slow" />

          {generateHeartbeats()}
          {generateMedicalIcons()}
          <div className="relative z-10 flex flex-col items-center animate-health-grow">
            <div className="relative mb-6">
              <Heart className="text-red-400 animate-heartbeat-main" size={80} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Plus className="text-white animate-cross-spin" size={32} />
              </div>
            </div>
            <div className="text-2xl font-bold text-red-100 animate-fade-in-up">Exploring Health & Wellness</div>
            <div className="flex items-center mt-4 text-blue-300 animate-fade-in-up-delay">
              <Activity className="mr-2 animate-pulse-rhythm" size={20} />
              <span>Monitoring vital signs...</span>
            </div>
          </div>

          <div className="absolute bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400/20 to-transparent animate-ekg-line" />

          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-400/40 rounded-full animate-medical-twinkle"
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
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-blue-900/5" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-5 animate-medical-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            >
              <Stethoscope className="text-blue-400" size={32} />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-red-700/30 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10 rounded-2xl" />

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent animate-ekg-subtle" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 drop-shadow-lg relative">
                {title}
                <div className="absolute -top-2 -right-2 opacity-30">
                  <Heart className="text-red-400 animate-heartbeat" size={32} />
                </div>
              </h1>

              {/* Main text content with improved spacing */}
              <div className="prose prose-invert font-times text-[1.35rem] max-w-none text-gray-300 mb-10 relative">
                {renderContentWithTables(cleanedText)}
                <div className="absolute top-4 right-4 opacity-20">
                  <Activity className="text-blue-400 animate-pulse-rhythm" size={20} />
                </div>
              </div>

              {/* Images Section */}
              {imageLinks.length > 0 && (
                <div className="mb-8 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {imageLinks.map((img, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 cursor-pointer"
                        onClick={() => setModalImage(img)}
                        title="Click to enlarge"
                      >
                        <img
                          src={img}
                          alt={`Related visual ${idx + 1}`}
                          className="max-h-64 w-auto rounded shadow mb-2 transition-transform duration-200 hover:scale-105"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Section after text */}
              {pdfLinks.length > 0 && (
                <div className="mb-8 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {pdfLinks.map((doc, index) => (
                      <div
                        key={index}
                        onClick={() => openPdfInNewTab(doc.url)}
                        className="group cursor-pointer bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50 hover:border-blue-500/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg mr-4 transition-colors ${
                            doc.type === 'docx' 
                              ? 'bg-blue-500/20 group-hover:bg-blue-500/30' 
                              : 'bg-red-500/20 group-hover:bg-red-500/30'
                          }`}>
                            <FileText className={`group-hover:text-${doc.type === 'docx' ? 'blue' : 'red'}-300 ${
                              doc.type === 'docx' ? 'text-blue-400' : 'text-red-400'
                            }`} size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-100 group-hover:text-blue-300">
                              {doc.label}
                            </h3>
                            <p className="text-sm text-gray-400 group-hover:text-gray-300">
                              Click to open {doc.type === 'docx' ? 'DOCX' : 'PDF'} in new tab
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 truncate">
                          {doc.url}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(sources) && sources.length > 0 && (
                <div className="mt-10 pt-6 border-t border-red-700/30 relative">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
                    Sources
                    <Stethoscope className="ml-2 text-red-400 opacity-60" size={20} />
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {sources.map((src, idx) => (
                      <li key={idx} className="group">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-red-400 transition-colors duration-300 hover:underline break-all group-hover:drop-shadow-sm"
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

      {/* Modal for large image */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setModalImage(null)}
          style={{ cursor: "zoom-out" }}
        >
          <img
            src={modalImage}
            alt="Enlarged visual"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
            style={{ objectFit: "contain" }}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-4 py-2"
            onClick={() => setModalImage(null)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1.2); }
          75% { transform: scale(1.1); }
        }
        
        @keyframes heartbeat-main {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(1.15); opacity: 0.9; }
          50% { transform: scale(1.3); opacity: 0.8; }
          75% { transform: scale(1.15); opacity: 0.9; }
        }
        
        @keyframes medical-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        
        @keyframes medical-float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(90deg); }
        }
        
        @keyframes health-grow {
          0% { transform: scale(0) rotate(-90deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes cross-spin {
          0% { transform: rotate(0deg); opacity: 0; }
          50% { transform: rotate(180deg); opacity: 1; }
          100% { transform: rotate(360deg); opacity: 1; }
        }
        
        @keyframes pulse-rhythm {
          0%, 100% { transform: scale(1); opacity: 1; }
          20% { transform: scale(1.3); opacity: 0.8; }
          40% { transform: scale(1); opacity: 1; }
          60% { transform: scale(1.2); opacity: 0.9; }
          80% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delay {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes medical-twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes ekg-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes ekg-subtle {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-heartbeat-main {
          animation: heartbeat-main 1.2s ease-in-out infinite;
        }
        
        .animate-medical-float {
          animation: medical-float 4s ease-in-out infinite;
        }
        
        .animate-medical-float-slow {
          animation: medical-float-slow 10s ease-in-out infinite;
        }
        
        .animate-health-grow {
          animation: health-grow 2s ease-out;
        }
        
        .animate-cross-spin {
          animation: cross-spin 2s ease-out 0.5s both;
        }
        
        .animate-pulse-rhythm {
          animation: pulse-rhythm 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 1s ease-out 1s both;
        }
        
        .animate-medical-twinkle {
          animation: medical-twinkle 3s ease-in-out infinite;
        }
        
        .animate-ekg-line {
          animation: ekg-line 4s ease-in-out infinite;
        }
        
        .animate-ekg-subtle {
          animation: ekg-subtle 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}