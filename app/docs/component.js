"use client"

import { Scale, Shield, CheckCircle, Link } from "lucide-react"

// Component props are correct: it will receive the file's text in the 'content' prop.
export function EHSDocsContent({ title, content, type, sources }) {

  /**
   * This function replaces the old link finders. It parses the text line by line,
   * expecting the format: "Document Title - URL"
   * @param {string} inputText The entire text content from the .txt file.
   */
  function renderDocumentList(inputText) {
    if (!inputText) return null;

    // Split the text block into individual lines.
    const lines = inputText.split('\n');

    return (
      // Render a container for the list of documents.
      <div className="space-y-4">
        {lines.map((line, index) => {
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

          return (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-800/70 border border-gray-700 rounded-lg transition-all hover:bg-gray-800"
            >
              <p className="font-semibold text-gray-200 mb-2 sm:mb-0 sm:mr-4">
                {docTitle}
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

              {/* The main content area now renders the structured list. */}
              {/* Note: The 'prose' and 'text-justify' classes were removed to allow the list to span the full width. */}
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