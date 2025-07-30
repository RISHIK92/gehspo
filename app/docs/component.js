"use client"

import { Scale, Shield, CheckCircle, FileText } from "lucide-react"

// The component props remain the same.
export function EHSDocsContent({ title, content, type, sources }) {

  // This function for bold text remains unchanged.
  function parseBoldText(text) {
    if (typeof text !== 'string') return text;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) =>
      idx % 2 === 0 ? part : <strong key={idx} className="text-white font-semibold">{part}</strong>
    );
  }

  /**
   * This function now parses text to find links to .pdf, .xls, and .xlsx files.
   * It has been renamed from renderTextWithPdfLinks.
   */
  function renderTextWithFileLinks(text) {
    if (!text) return null;
    
    // The regex is updated to include .xls and .xlsx extensions.
    const urlRegex = /(https?:\/\/[^\s]+\.(pdf|xls|xlsx))/gi;
    const parts = text.split(urlRegex);
    
    return parts.map((part, idx) => {
      // Check if the current part is a URL that matches our regex.
      if (part.match(urlRegex)) {
        let label = "File Document"; // Default label
        if (part.toLowerCase().endsWith('.pdf')) {
          label = "PDF Document";
        } else if (part.toLowerCase().endsWith('.xls') || part.toLowerCase().endsWith('.xlsx')) {
          label = "Excel Spreadsheet";
        }

        return (
          <span key={idx} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <FileText className="h-5 w-5" />
            <a 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              {label} {/* The label is now dynamic */}
            </a>
          </span>
        );
      }
      
      // For any non-URL text, apply the bold formatting.
      return parseBoldText(part);
    });
  }

  // The main rendering logic now calls the new function.
  const renderMainContent = () => {
    if (!content) return null;

    // This part is for rendering raw HTML if needed, remains unchanged.
    if (type === 'html') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    
    // This now calls our updated function for .txt files.
    return (
      <div className="whitespace-pre-line">
        {renderTextWithFileLinks(content)}
      </div>
    );
  };

  return (
    <>
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-slate-900/5" />

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
                {renderMainContent()}
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
    </>
  )
}