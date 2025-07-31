"use client"

import { useState } from "react"
import { Scale, Shield, CheckCircle, Link, Search, X } from "lucide-react"

// Component props are correct: it will receive the file's text in the 'content' prop.
export function EHSDocsContent({ title, content, type, sources }) {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * This function replaces the old link finders. It parses the text line by line,
   * expecting the format: "Document Title - URL"
   * @param {string} inputText The entire text content from the .txt file.
   */
  function renderDocumentList(inputText) {
    if (!inputText) return null;

    // Split the text block into individual lines.
    const lines = inputText.split('\n');

    // Filter lines based on search term
    const filteredLines = lines.filter(line => {
      if (!line.trim()) return false;
      const parts = line.split(' - ');
      if (parts.length < 2) return false;
      const docTitle = parts[0].trim().toLowerCase();
      return docTitle.includes(searchTerm.toLowerCase());
    });

    if (filteredLines.length === 0 && searchTerm) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">No documents found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search terms</div>
        </div>
      );
    }

    const linesToRender = searchTerm ? filteredLines : lines;

    return (
      // Render a container for the list of documents.
      <div className="space-y-4">
        {linesToRender.map((line, index) => {
          // Skip any empty lines in the text file.
          if (!line.trim()) return null;

          // Split each line into two parts at the " - " separator.
          const parts = line.split(' - ');
          
          // A valid line must have at least a title and a URL.
          if (parts.length < 2) {
            // You can optionally render lines that don't match the format as plain text.
            return <div key={index}>{line}</div>;
          }
          
          const docTitle = parts[0].trim();
          // The URL is everything after the first " - ".
          const docUrl = parts.slice(1).join(' - ').trim();

          // Ensure the URL is a valid http link before rendering.
          if (!docUrl.startsWith('http')) return null;

          // Highlight search term in title
          const highlightedTitle = searchTerm 
            ? docTitle.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                '<mark class="bg-yellow-400 text-black rounded px-1">$1</mark>'
              )
            : docTitle;

          return (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-800/70 border border-gray-700 rounded-lg transition-all hover:bg-gray-800"
            >
              <p className="font-semibold text-gray-200 mb-2 sm:mb-0 sm:mr-4">
                {searchTerm ? (
                  <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
                ) : (
                  docTitle
                )}
              </p>
              <a 
                href={docUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium shrink-0"
              >
                <Link className="h-4 w-4"/>
                <span>Open Document</span>
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  const renderMainContent = () => {
    if (!content) return null;

    // The logic to handle raw HTML remains, just in case.
    if (type === 'html') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    
    // For 'text' content, we now call our new list-rendering function.
    // The `whitespace-pre-line` div is no longer needed as the new function handles line breaks.
    return renderDocumentList(content);
  };

  const clearSearch = () => {
    setSearchTerm("");
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

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search documents by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-600 rounded-lg bg-gray-800/80 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 text-gray-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <p className="text-center text-gray-400 text-sm mt-2">
                    Searching for: "{searchTerm}"
                  </p>
                )}
              </div>

              {/* The main content area now renders the structured list with search functionality. */}
              <div className="text-xl text-gray-300 mb-10 relative max-w-full mx-auto">
                {renderMainContent()}
                <div className="absolute top-4 right-4 opacity-20">
                  <CheckCircle className="text-green-400" size={20} />
                </div>
              </div>

              {/* The "Legal References" section remains unchanged. */}
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
  );
}