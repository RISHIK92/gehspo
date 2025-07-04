"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  Shield,
  Leaf,
  Heart,
  Flame,
  Scale,
  FileText,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  Target,
  CheckCircle,
  Building2,
} from "lucide-react"
import Link from "next/link"
import CommentsSection from "./app-components/comments-section"
import ContactUsSection from "./app-components/contact-us-section"

const bannerSlides = [
  {
    id: "environment",
    title: "Environmental Excellence",
    subtitle: "Leading sustainable practices and environmental protection initiatives",
    cta: "Environment",
    link: "/environment",
    bgGradient: "from-emerald-400 via-green-500 to-teal-600",
    accentGradient: "from-green-400 to-emerald-500",
    pattern: "environment",
  },
  {
    id: "health",
    title: "Occupational Health",
    subtitle: "Promoting health and wellness programs for safer workplaces",
    cta: "Health",
    link: "/health",
    bgGradient: "from-blue-400 via-indigo-500 to-purple-600",
    accentGradient: "from-blue-400 to-indigo-500",
    pattern: "health",
  },
  {
    id: "safety",
    title: "Workplace Safety",
    subtitle: "Comprehensive safety standards and risk management solutions",
    cta: "Safety",
    link: "/safety",
    bgGradient: "from-orange-400 via-red-500 to-pink-600",
    accentGradient: "from-orange-400 to-red-500",
    pattern: "safety",
  },
  {
    id: "fire",
    title: "Fire Safety & Prevention",
    subtitle: "Advanced fire protection systems and emergency response protocols",
    cta: "Fire Safety",
    link: "/fire",
    bgGradient: "from-red-500 via-orange-500 to-yellow-500",
    accentGradient: "from-red-400 to-orange-500",
    pattern: "fire",
  },
]

// Client logos with different sizes
const clientLogos = [
  {
    name: "Amara Raja",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639846/IMG-20250702-WA0010_fjo8j9.jpg",
    size: "h-64 w-64",
  },
  {
    name: "TCS",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639846/IMG-20250702-WA0008_uaa9kv.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Mahindra",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639847/IMG-20250702-WA0013_dqdq61.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Tata Power",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639847/IMG-20250702-WA0015_zvg0id.jpg",
    size: "h-64 w-64",
  },
  {
    name: "DELL",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639847/IMG-20250702-WA0014_bsgwqb.jpg",
    size: "h-64 w-64",
  },
  {
    name: "ICICI",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639847/IMG-20250702-WA0009_gsktrv.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Eduforce",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639848/IMG-20250702-WA0017_k2nobm.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Techshore",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639848/IMG-20250702-WA0018_u3ns4y.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Safety Force",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639847/IMG-20250702-WA0016_nelqsq.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Sembcorp",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639847/IMG-20250702-WA0011_wovekl.jpg",
    size: "h-64 w-64",
  },
  {
    name: "Lenskart",
    logo: "https://res.cloudinary.com/df622sxkk/image/upload/v1751639846/IMG-20250702-WA0012_pa8xaj.jpg",
    size: "h-64 w-64",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const getPatternSVG = (pattern) => {
    switch (pattern) {
      case "environment":
        return (
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="envPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="white" opacity="0.3" />
                  <path d="M8,10 Q10,6 12,10 Q10,14 8,10" fill="white" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#envPattern)" />
              <g opacity="0.1">
                <circle cx="20" cy="30" r="15" fill="white" />
                <circle cx="80" cy="70" r="20" fill="white" />
                <circle cx="60" cy="20" r="10" fill="white" />
                <path d="M10,80 Q30,60 50,80 Q70,60 90,80" stroke="white" strokeWidth="2" fill="none" />
              </g>
            </svg>
          </div>
        )
      case "health":
        return (
          <div className="absolute inset-0 opacity-15">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="healthPattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M7.5,3 L7.5,12 M3,7.5 L12,7.5" stroke="red" strokeWidth="1" opacity="0.3" />
                  <circle cx="7.5" cy="7.5" r="1" fill="red" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#healthPattern)" />
              <g opacity="0.1">
                <path d="M20,50 Q30,30 40,50 Q50,70 60,50 Q70,30 80,50" stroke="red" strokeWidth="3" fill="none" />
                <circle cx="25" cy="25" r="8" fill="red" />
                <circle cx="75" cy="75" r="12" fill="red" />
                <rect x="45" y="15" width="10" height="3" fill="red" />
                <rect x="48.5" y="12" width="3" height="10" fill="red" />
              </g>
            </svg>
          </div>
        )
      case "safety":
        return (
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="safetyPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                  <polygon points="12.5,5 17,10 12.5,15 8,10" fill="white" opacity="0.2" />
                  <circle cx="12.5" cy="12.5" r="1.5" fill="white" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#safetyPattern)" />
              <g opacity="0.1">
                <polygon points="30,20 40,30 30,40 20,30" fill="white" />
                <polygon points="70,60 80,70 70,80 60,70" fill="white" />
                <polygon points="80,20 90,30 80,40 70,30" fill="white" />
                <path d="M10,10 L90,90 M90,10 L10,90" stroke="white" strokeWidth="1" opacity="0.1" />
              </g>
            </svg>
          </div>
        )
      case "fire":
        return (
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="firePattern" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M9,2 Q12,6 9,10 Q6,6 9,2" fill="white" opacity="0.3" />
                  <path d="M9,6 Q11,8 9,12 Q7,8 9,6" fill="white" opacity="0.2" />
                  <circle cx="9" cy="14" r="1" fill="white" opacity="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#firePattern)" />
              <g opacity="0.1">
                {/* Fire flame shapes */}
                <path d="M25,80 Q30,60 25,40 Q20,60 25,80" fill="white" />
                <path d="M75,85 Q82,65 75,45 Q68,65 75,85" fill="white" />
                <path d="M50,75 Q55,55 50,35 Q45,55 50,75" fill="white" />
                {/* Sparks/embers */}
                <circle cx="35" cy="30" r="2" fill="white" />
                <circle cx="65" cy="25" r="1.5" fill="white" />
                <circle cx="85" cy="40" r="1" fill="white" />
                <circle cx="15" cy="35" r="1.5" fill="white" />
                {/* Heat waves */}
                <path
                  d="M10,90 Q20,85 30,90 Q40,85 50,90 Q60,85 70,90 Q80,85 90,90"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M5,95 Q15,90 25,95 Q35,90 45,95 Q55,90 65,95 Q75,90 85,95 Q95,90 100,95"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                />
              </g>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const currentBanner = bannerSlides[currentSlide]

  return (
    <div className="min-h-screen">
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 text-white">
        {/* Main Header Content */}
        <div className="py-8 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
              className="h-40 w-40 md:h-64 md:w-64 object-contain"
              alt="GEHSPO Logo"
            />
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-wide font-times">GEHSPO</h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium leading-relaxed max-w-4xl mb-4 font-times">
                Ghanta's Environment, Health & Safety Professionals Organisation
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed font-times">
                Advancing professional excellence in environmental, health, and safety management through education,
                certification, and industry collaboration.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          {bannerSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              {/* Main Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />
              {/* Accent Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accentGradient} opacity-30`} />
              {/* SVG Pattern Overlay */}
              {getPatternSVG(slide.pattern)}
              {/* Geometric Shapes */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-10 animate-pulse" />
                <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-white opacity-5" />
                <div className="absolute bottom-10 right-1/4 w-32 h-32 rotate-45 bg-white opacity-10" />
                {/* Animated Floating Elements */}
                <div
                  className="absolute top-20 left-1/4 w-4 h-4 bg-white opacity-30 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="absolute top-40 right-1/3 w-3 h-3 bg-white opacity-40 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute bottom-32 left-1/3 w-5 h-5 bg-white opacity-20 rounded-full animate-bounce"
                  style={{ animationDelay: "2s" }}
                />
              </div>
              {/* Subtle Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-opacity-20" />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl">
            {/* Animated Badge */}
            <div className="mb-6 inline-block">
              <Badge className="bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 px-4 py-2">
                <div className="flex items-center space-x-2">
                  {currentBanner.id === "environment" && <Leaf className="h-4 w-4" />}
                  {currentBanner.id === "health" && <Heart className="h-4 w-4" />}
                  {currentBanner.id === "safety" && <Shield className="h-4 w-4" />}
                  {currentBanner.id === "fire" && <Flame className="h-4 w-4" />}
                  <span className="font-medium">Professional Excellence</span>
                </div>
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg font-times">{currentBanner.title}</h1>
            <p className="text-xl md:text-2xl mb-8 text-white text-opacity-95 leading-relaxed drop-shadow-md max-w-3xl mx-auto font-times">
              {currentBanner.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={currentBanner.link}>
                <Button
                  size="lg"
                  className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-900 border-2 border hover:bg-white hover:bg-opacity-100 font-semibold px-8 py-4 shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {currentBanner.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Banner Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 cursor-pointer transform -translate-y-1/2 z-50 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform cursor-pointer -translate-y-1/2 z-50 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {bannerSlides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-white shadow-lg"
                  : "w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
            }}
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10 font-times">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
              className="h-44 w-44 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">Our Mission & Vision</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Uniting EHS professionals worldwide to advance safety standards, drive environmental stewardship, and
              protect our communities through innovative solutions and industry leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-3 text-2xl">
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-xl">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-gray-100">Our Mission</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  The purpose of the Global Environmental, Health and Safety Professionals Organization (GEHSPO) is to
                  promote and advance the profession of EHS management through excellence, innovation, and collaborative
                  leadership.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-3 text-2xl">
                  <div className="p-3 bg-purple-900 bg-opacity-40 rounded-xl">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-gray-100">Our Vision</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Our vision is to bring together EHS professionals from all communities to create one unified voice for
                  the cause of EHS management and advancement, fostering a safer, healthier, and more sustainable world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Clients Section */}
      <section className="py-16 font-times">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2">
              <Building2 className="h-4 w-4 mr-2" />
              Trusted Partners
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">
              Industry Leaders Trust Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Partnering with organizations to deliver exceptional EHS solutions and drive industry standards
            </p>
          </div>

          {/* Horizontal Infinite Auto-Scrolling Client Logos */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-8 py-6 px-2 animate-scroll-horizontal"
              style={{
                width: "max-content",
                minWidth: "100%",
                animation: "scroll-horizontal 30s linear infinite",
              }}
            >
              {/* Duplicate the logos for seamless looping */}
              {clientLogos.concat(clientLogos).map((client, index) => (
                <div
                  key={client.name + index}
                  className="group flex-shrink-0 flex items-center justify-center p-1 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ width: "220px", minWidth: "220px", height: "110px" }}
                >
                  <img
                    src={client.logo || "/placeholder.svg"}
                    alt={`${client.name} logo`}
                    className="h-24 w-48 object-contain duration-300"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "flex"
                    }}
                  />
                  <div
                    className="hidden items-center justify-center bg-gray-800 rounded-lg p-4 border border-gray-600"
                    style={{ width: "200px", height: "80px" }}
                  >
                    <span className="text-gray-300 font-medium text-lg">{client.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes scroll-horizontal {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll-horizontal {
              animation: scroll-horizontal 30s linear infinite;
            }
          `}</style>
        </div>
      </section>

      {/* EHS Focus Areas */}
      <section className="py-10 font-times">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Core Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">Our Focus Areas</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive EHS solutions delivering measurable impact across industries worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-green-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-100">Environment</div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Environmental protection, sustainability initiatives, and carbon footprint reduction strategies
                </p>
              </div>
            </div>

            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-blue-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-100">Health</div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Occupational health programs, wellness initiatives, and employee wellbeing solutions
                </p>
              </div>
            </div>

            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-orange-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-100">Safety</div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Workplace safety standards, risk management, and incident prevention protocols
                </p>
              </div>
            </div>

            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-red-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Flame className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-100">Fire Safety</div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Fire prevention systems, emergency response protocols, and safety compliance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 font-times">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2">
              <Settings className="h-4 w-4 mr-2" />
              Professional Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">
              Comprehensive EHS Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Supporting EHS professionals with industry-leading resources, expertise, and innovative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-xl">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl text-gray-100 font-bold">Legal Compliance</div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-white bg-opacity-10 text-white border border-white border-opacity-20"
                    >
                      Expert Guidance
                    </Badge>
                  </div>
                </div>
                <div className="text-md text-gray-300">
                  Stay ahead of evolving EHS regulations with our comprehensive legal compliance solutions and expert
                  guidance
                </div>
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-2 mb-6 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Regulatory Updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Compliance Audits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Legal Documentation</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg">Explore Legal Services</Button>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-900 bg-opacity-40 rounded-xl">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl text-gray-100 font-bold">Documentation Hub</div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-white bg-opacity-10 text-white border border-white border-opacity-20"
                    >
                      Resource Library
                    </Badge>
                  </div>
                </div>
                <div className="text-md text-gray-300">
                  Access our comprehensive library of EHS documentation, templates, and best practice resources
                </div>
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-2 mb-6 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Policy Templates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Training Materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Best Practices Guide</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg">Access Documentation</Button>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-900 bg-opacity-40 rounded-xl">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl text-gray-100 font-bold">Career Development</div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-white bg-opacity-10 text-white border border-white border-opacity-20"
                    >
                      Growth Opportunities
                    </Badge>
                  </div>
                </div>
                <div className="text-md text-gray-300">
                  Advance your EHS career with our job placement services, networking opportunities, and professional
                  development
                </div>
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-2 mb-6 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Job Placement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Professional Network</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Skill Development</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-7 text-lg">Explore Careers</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 text-white font-times">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-8 bg-white bg-opacity-20 text-white border-white border-opacity-30 px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            Join Our Community
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your EHS Career</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with industry leaders, access cutting-edge resources, and advance your career in environmental,
            health, and safety management with GEHSPO's global professional community.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold">
              Become a Member
            </Button>
          </div>
        </div>
      </section>

      <CommentsSection />
      <ContactUsSection />

      {/* Footer */}
      <footer className="text-white py-16 font-times">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
                  alt="GEHSPO Logo"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <span className="text-2xl font-bold">GEHSPO</span>
                  <p className="text-sm text-gray-400 font-times">Global EHS Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Advancing EHS excellence through professional development, innovative solutions, and global community
                collaboration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "Services", "Careers", "Contact", "News"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "")}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">EHS Solutions</h3>
              <ul className="space-y-3">
                {["Environment", "Health", "Safety", "Fire Safety", "Compliance"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "")}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-3">
                {["EHS Legal", "Documentation", "Training", "Certifications", "Support"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "")}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} GEHSPO - Global Environmental, Health and Safety Professionals
                Organization. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
