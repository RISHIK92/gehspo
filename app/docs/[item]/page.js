"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EHSDocsContent } from "../component";

export default function DocsPage() {
  const params = useParams();
  const topicSlug = params.item;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      const formattedTitle = topicSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      try {
        // First, try to fetch the .html file
        const htmlRes = await fetch(`/content/${topicSlug}.html`);
        if (htmlRes.ok) {
          const html = await htmlRes.text();
          setContent({
            title: formattedTitle,
            content: html,
            type: 'html', // Set type to 'html'
            sources: [{ label: "Source: Provided HTML File", url: "" }],
          });
          return; // Success, no need to go further
        }

        // If .html is not found, try to fetch the .txt file
        const txtRes = await fetch(`/content/${topicSlug}.txt`);
        if (txtRes.ok) {
          const text = await txtRes.text();
          setContent({
            title: formattedTitle,
            content: text,
            type: 'text', // Set type to 'text'
            sources: [{ label: "Source: Provided Text File", url: "" }],
          });
          return; // Success
        }

        // If neither file is found, throw an error
        throw new Error("File not found");

      } catch (err) {
        setContent({
          title: formattedTitle,
          content: "No content available for this topic yet.",
          type: 'text', // Default to text for the error message
          sources: [],
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (topicSlug) {
      fetchContent();
    }
  }, [topicSlug]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!content) return null; // Or some other placeholder

  return (
    <div className="font-times">
      <EHSDocsContent {...content} />
    </div>
  );
}