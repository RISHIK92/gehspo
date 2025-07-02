"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCSrVIWadg4QFvU1pShX17bsrYD6N_aV2E",
  authDomain: "gehspo-work.firebaseapp.com",
  projectId: "gehspo-work",
  appId: "1:542875410734:web:11d0bcaa55d805dc419abf",
};

let firebaseApp = null;
let firebaseAuth = null;

async function getFirebase() {
  if (!firebaseApp) {
    let firebaseModule = await import("firebase/compat/app");
    firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule;
    await import("firebase/compat/auth");
    if (!firebaseModule.apps.length) {
      firebaseModule.initializeApp(firebaseConfig);
    }
    firebaseApp = firebaseModule;
    firebaseAuth = firebaseModule.auth();
  }
  return { firebaseApp, firebaseAuth };
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { firebaseAuth } = await getFirebase();
      if (mode === "login") {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
      } else {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
      }
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const { firebaseAuth, firebaseApp } = await getFirebase();
      const provider = new firebaseApp.auth.GoogleAuthProvider();
      await firebaseAuth.signInWithPopup(provider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-950 text-white flex items-center justify-center">
      <section className="max-w-md w-full px-4 mb-10">
        <div className="bg-gray-900 bg-opacity-95 border border-gray-700 rounded-xl shadow-xl p-8 mt-4">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 text-center">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Password"
              />
            </div>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg py-3 transition-all duration-200 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (mode === "login" ? "Logging in..." : "Signing up...") : (mode === "login" ? "Login" : "Sign Up")}
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-700" />
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-all duration-200 mb-2 disabled:opacity-60"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.7 30.23 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.99 6.2C12.13 13.13 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.19 5.59C43.99 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.68 28.68c-1.04-3.13-1.04-6.53 0-9.66l-7.99-6.2C.86 17.1 0 20.45 0 24c0 3.55.86 6.9 2.69 10.18l7.99-6.2z"/><path fill="#EA4335" d="M24 48c6.23 0 11.64-2.06 15.53-5.61l-7.19-5.59c-2.01 1.35-4.59 2.15-8.34 2.15-6.44 0-11.87-3.63-14.32-8.79l-7.99 6.2C6.71 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
            Continue with Google
          </button>
          <div className="mt-6 text-center">
            <button
              className="text-emerald-400 hover:underline text-sm"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              disabled={loading}
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}