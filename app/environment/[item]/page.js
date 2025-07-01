"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EnvironmentContent } from "../component";

export default function EnvironmentPage() {
  const params = useParams();
  const topicSlug = params.item;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      try {
        // Try to fetch the .txt file for this topic
        const res = await fetch(`/content/${topicSlug}.txt`);
        console.log(res)
        if (!res.ok) throw new Error("File not found");
        const text = await res.text();
        setContent({
          title: topicSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          text,
          sources: [
            { label: "Source: Provided Text File", url: "" },
          ],
        });
      } catch (err) {
        setContent({
          title: topicSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          text: "No content available for this topic yet.",
          sources: [],
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [topicSlug]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  return <EnvironmentContent {...content} />;
}
