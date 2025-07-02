"use client";

import { useEffect, useState } from "react";

export function Hover() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Scroll to Top - Glass Morph Icon */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to Top"
          className={`${
            show
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          } group w-14 h-14 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl transition-all duration-300`}
        >
          <svg
            className="w-6 h-6 text-emerald-400 group-hover:rotate-[-45deg] transition-transform duration-300 ease-in-out"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>

        {/* WhatsApp button - Optional */}
        <a
          href="https://wa.me/919949845759"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#25D366] hover:bg-[#1DA955] shadow-xl hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-7 h-7 text-white"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.206C13.416 27.168 14.686 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.332-.207-3.418-.613l-.244-.09-4.646 1.31 1.242-4.51-.16-.234C7.13 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-7.75c-.277-.139-1.637-.807-1.89-.899-.253-.093-.438-.139-.623.139-.184.277-.713.899-.874 1.086-.161.185-.322.208-.599.07-.277-.139-1.17-.431-2.23-1.375-.823-.734-1.379-1.64-1.541-1.917-.161-.277-.017-.427.122-.566.126-.125.277-.322.415-.483.139-.161.185-.277.277-.462.092-.185.046-.347-.023-.485-.07-.139-.623-1.507-.853-2.064-.224-.54-.453-.466-.623-.475l-.53-.009c-.17 0-.446.063-.68.293-.234.23-.89.87-.89 2.122s.911 2.463 1.038 2.635c.126.161 1.793 2.74 4.348 3.735.608.209 1.082.334 1.452.427.61.155 1.166.133 1.606.081.49-.058 1.637-.668 1.87-1.312.231-.643.231-1.194.162-1.312-.07-.119-.253-.185-.53-.324z" />
          </svg>
        </a>
      </div>
    </>
  );
}
