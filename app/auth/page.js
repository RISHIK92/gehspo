"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Shield, Mail, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (activeTab === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { firebaseAuth } = await getFirebase();
      if (activeTab === "login") {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-200">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-start justify-center bg-transparent mt-12 md:mt-24 px-2">
        {/* Mobile: Small logo at top */}
        <div className="flex md:hidden justify-center mb-6 w-full">
          <img
            src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
            className="h-24 w-24 object-cover rounded-xl shadow-lg"
            alt="Auth Logo"
          />
        </div>
        {/* Desktop: Large image on left */}
        <div className="hidden md:flex flex-shrink-0 items-start justify-center">
          <img
            src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
            className="h-[512px] w-[512px] object-cover rounded-2xl shadow-2xl"
            alt="Auth Illustration"
          />
        </div>
        {/* Right: Card */}
        <div className="flex-1 md:ml-16 w-full max-w-xl">
          <Card className="shadow-2xl border-0 bg-slate-900/80 backdrop-blur-md min-w-[0] w-full">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl text-white">Welcome Back</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/80 rounded-lg mb-2">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400 text-slate-300"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-slate-900 data-[state=active]:text-blue-400 text-slate-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <TabsContent value="login" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-200">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-slate-200">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-slate-200">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-slate-200">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {error && (
                    <Alert className="border-red-400 bg-red-900/60">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {activeTab === "login" ? "Signing In..." : "Creating Account..."}
                      </div>
                    ) : (
                      activeTab === "login" ? "Sign In" : "Create Account"
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <Separator className="bg-slate-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-slate-900/80 px-2 text-xs text-slate-400 uppercase tracking-wide">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                  disabled={loading}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}