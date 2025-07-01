"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
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
  Menu,
  X,
  Award,
  Users,
  Target,
  CheckCircle,
  ChevronDown,
  User,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";
import CommentsSection from "./app-components/comments-section";
import ContactUsSection from "./app-components/contact-us-section";

const bannerSlides = [
  {
    id: "environment",
    title: "Environmental Excellence",
    subtitle:
      "Leading sustainable practices and environmental protection initiatives",
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
];

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: null,
    subItems: [],
  },
  {
    name: "Environment",
    href: "/environment",
    icon: Leaf,
    subItems: [
      { name: "What is Environment", href: "/environment/What-is-Environment" },
      { name: "Water Pollution-1", href: "/environmentWater-Pollution-1" },
      { name: "Water Pollution-2", href: "/environment/Water-Pollution-2" },
      { name: "Water Pollution-3", href: "/environment/Water-Pollution-3" },
      { name: "Air Pollution", href: "/environment/Air-Pollution" },
      { name: "Noise Pollution", href: "/environment/Noise-Pollution" },
      {
        name: "Soild Waste Management-1",
        href: "/environment/Soild-Waste-Management-1",
      },
      {
        name: "Soild Waste Management-2",
        href: "/environment/Soild-Waste-Management-2",
      },
      { name: "Ecology", href: "/environment/Ecology" },
      { name: "Sources of Energy", href: "/environment/Sources-of-Energy" },
      { name: "Aspect and impact", href: "/environment/Aspect-and-impact" },
    ],
  },
  {
    name: "Health",
    href: "/health",
    icon: Heart,
    subItems: [
      { name: "First Aid", href: "/health/First-Aid" },
      { name: "First Aid Types", href: "/health/First-Aid-Types" },
      { name: "First Aid Charts", href: "/health/First-Aid-Charts" },
      { name: "CPR", href: "/health/CPR" },
      { name: "Choking", href: "/health/Choking" },
      { name: "Health Tips", href: "/health/Health-Tips" },
    ],
  },
  {
    name: "Safety",
    href: "/safety",
    icon: Shield,
    subItems: [
      { name: "5 'S'", href: "/safety/5S" },
      { name: "Auditing-1", href: "/safety/Auditing-1" },
      { name: "Auditing-2", href: "/safety/Auditing-2" },
      { name: "Audit Plan", href: "/safety/Audit-Plan" },
      { name: "Blasting", href: "/safety/Blasting" },
      { name: "BBS", href: "/safety/BBS" },
      { name: "Chemical-1", href: "/safety/Chemical-1" },
      { name: "Chemical-2", href: "/safety/Chemical-2" },
      { name: "Civil-1", href: "/safety/Civil-1" },
      { name: "Civil-2", href: "/safety/Civil-2" },
      { name: "Climate-Heat", href: "/safety/Climate-Heat" },
      { name: "Climate-Cold", href: "/safety/Climate-Cold" },
      { name: "Climate-Mansoon", href: "/safety/Climate-Mansoon" },
      { name: "Construction-1", href: "/safety/Construction-1" },
      { name: "Construction-2", href: "/safety/Construction-2" },
      { name: "Construction-3", href: "/safety/Construction-3" },
      { name: "Construction-4", href: "/safety/Construction-4" },
      { name: "Cranes", href: "/safety/Cranes" },
      { name: "Contractor", href: "/safety/Contractor" },
      { name: "Confined Space", href: "/safety/Confined-Space" },
      { name: "Cutting & Welding", href: "/safety/Cutting-Welding" },
      { name: "Demolition", href: "/safety/Demolition" },
      { name: "Electrical", href: "/safety/Electrical" },
      { name: "Erganomics", href: "/safety/Erganomics" },
      { name: "ERP", href: "/safety/ERP" },
      { name: "Excavation", href: "/safety/Excavation" },
      { name: "Food", href: "/safety/Food" },
      { name: "Fork Lifts", href: "/safety/Fork-Lifts" },
      { name: "General", href: "/safety/General" },
      { name: "HIRAC", href: "/safety/HIRAC" },
      { name: "Hot Works", href: "/safety/Hot-Works" },
      { name: "Incident's", href: "/safety/Incidents" },
      { name: "LOTO", href: "/safety/LOTO" },
      { name: "Machine Guarding-1", href: "/safety/Machine-Guarding-1" },
      { name: "Machine Guarding-2", href: "/safety/Machine-Guarding-2" },
      { name: "Material Handling-1", href: "/safety/Material-Handling-1" },
      { name: "Material Handling-2", href: "/safety/Material-Handling-2" },
      { name: "Mechanical", href: "/safety/Mechanical" },
      { name: "Metro Rail", href: "/safety/Metro-Rail" },
      { name: "MOC", href: "/safety/MOC" },
      { name: "Mock Drill", href: "/safety/Mock-Drill" },
      { name: "Offshore", href: "/safety/Offshore" },
      { name: "Oil & Gas-1", href: "/safety/Oil-Gas-1" },
      { name: "Oil & Gas-2", href: "/safety/Oil-Gas-2" },
      { name: "Operations", href: "/safety/Operations" },
      { name: "Pharmaciutical", href: "/safety/Pharmaciutical" },
      { name: "PPE's", href: "/safety/PPEs" },
      { name: "Radiography", href: "/safety/Radiography" },
      { name: "Road Safety-1", href: "/safety/Road-Safety-1" },
      { name: "Road Safety-2", href: "/safety/Road-Safety-2" },
      { name: "Sacffolding-1", href: "/safety/Sacffolding-1" },
      { name: "Scaffolding-2", href: "/safety/Scaffolding-2" },
      { name: "Shopping Malls", href: "/safety/Shopping-Malls" },
      { name: "Soil", href: "/safety/Soil" },
      { name: "Tower-1", href: "/safety/Tower-1" },
      { name: "Tower-2", href: "/safety/Tower-2" },
      { name: "Tower-3", href: "/safety/Tower-3" },
      { name: "Working at Height", href: "/safety/Working-at-Height" },
      { name: "Water", href: "/safety/Water" },
      { name: "Wind", href: "/safety/Wind" },
      { name: "Work Place", href: "/safety/Work-Place" },
      { name: "Work Shop", href: "/safety/Work-Shop" },
      { name: "Work Place Transport", href: "/safety/Work-Place-Transport" },
      { name: "HSE Management", href: "/safety/HSE-Management" },
      { name: "Safety Procedures-1", href: "/safety/Safety-Procedures-1" },
      { name: "Safety Procedures-2", href: "/safety/Safety-Procedures-2" },
    ],
  },
  {
    name: "Fire",
    href: "/fire",
    icon: Flame,
    subItems: [
      {
        name: "Fire - Chemistry & Physics",
        href: "/fire/Fire-Chemistry-Physics",
      },
      { name: "Fire - Types", href: "/fire/Fire-Types" },
      {
        name: "Fire - Extingushing Equipments",
        href: "/fire/Fire-Extingushing-Equipments",
      },
      {
        name: "Fire - Extingushing Methods",
        href: "/fire/Fire-Extingushing-Methods",
      },
      {
        name: "Fire - Prevention Requirements",
        href: "/fire/Fire-Prevention-Requirements",
      },
      {
        name: "Fire - Detection Devices",
        href: "/fire/Fire-Detection-Devices",
      },
    ],
  },
  {
    name: "EHS Legal",
    href: "/legal",
    icon: Scale,
    subItems: [
      {
        name: "Indian Environmental Legal",
        href: "/legal/Indian-Environmental-Legal",
      },
      {
        name: "International Environmental Legal-1",
        href: "/legal/International-Environmental-Legal-1",
      },
      {
        name: "International Environmental Legal-2",
        href: "/legal/International-Environmental-Legal-2",
      },
      {
        name: "International Environmental Legal-3",
        href: "/legal/International-Environmental-Legal-3",
      },
      {
        name: "Indian Occupation H & S Legal",
        href: "/legal/Indian-Occupation-HS-Legal",
      },
      {
        name: "Indian Occupation H & S Legal-2",
        href: "/legal/Indian-Occupation-HS-Legal-2",
      },
      {
        name: "International Occupation H & S legal",
        href: "/legal/International-Occupation-HS-legal",
      },
    ],
  },
  {
    name: "EHS Docs",
    href: "/docs",
    icon: FileText,
    subItems: [
      { name: "Checklist", href: "/docs/Checklist" },
      { name: "HIRA", href: "/docs/HIRA" },
      { name: "JSA-Job Safety Analysis", href: "/docs/JSA-Job-Safety-Analysis" },
      { name: "JHA-Job Hazard Analysis", href: "/docs/JHA-Job-Hazard-Analysis" },
      { name: "MS-Method Statement", href: "/docs/MS-Method-Statement" },
      { name: "Permit to Work", href: "/docs/Permit-to-Work" },
      { name: "SOP", href: "/docs/SOP" },
      { name: "SMP", href: "/docs/SMP" },
      { name: "Tool Box Talks", href: "/docs/Tool-Box-Talks" },
      { name: "Template", href: "/docs/Template" },
      { name: "WI-Work Instructions", href: "/docs/WI-Work-Instructions" },
    ],
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    subItems: [],
  },
  {
    name: "Services",
    href: "/services",
    icon: Settings,
    subItems: [],
  },
  {
    name: "About Us",
    href: "/about",
    icon: null,
    subItems: [],
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
  };

  const getPatternSVG = (pattern) => {
    switch (pattern) {
      case "environment":
        return (
          <div className="absolute inset-0 opacity-20">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="envPattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="2" fill="white" opacity="0.3" />
                  <path
                    d="M8,10 Q10,6 12,10 Q10,14 8,10"
                    fill="white"
                    opacity="0.2"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#envPattern)" />
              <g opacity="0.1">
                <circle cx="20" cy="30" r="15" fill="white" />
                <circle cx="80" cy="70" r="20" fill="white" />
                <circle cx="60" cy="20" r="10" fill="white" />
                <path
                  d="M10,80 Q30,60 50,80 Q70,60 90,80"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            </svg>
          </div>
        );
      case "health":
        return (
          <div className="absolute inset-0 opacity-15">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="healthPattern"
                  x="0"
                  y="0"
                  width="15"
                  height="15"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M7.5,3 L7.5,12 M3,7.5 L12,7.5"
                    stroke="red"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <circle cx="7.5" cy="7.5" r="1" fill="red" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#healthPattern)" />
              <g opacity="0.1">
                <path
                  d="M20,50 Q30,30 40,50 Q50,70 60,50 Q70,30 80,50"
                  stroke="red"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="25" cy="25" r="8" fill="red" />
                <circle cx="75" cy="75" r="12" fill="red" />
                <rect x="45" y="15" width="10" height="3" fill="red" />
                <rect x="48.5" y="12" width="3" height="10" fill="red" />
              </g>
            </svg>
          </div>
        );
      case "safety":
        return (
          <div className="absolute inset-0 opacity-20">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="safetyPattern"
                  x="0"
                  y="0"
                  width="25"
                  height="25"
                  patternUnits="userSpaceOnUse"
                >
                  <polygon
                    points="12.5,5 17,10 12.5,15 8,10"
                    fill="white"
                    opacity="0.2"
                  />
                  <circle
                    cx="12.5"
                    cy="12.5"
                    r="1.5"
                    fill="white"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#safetyPattern)" />
              <g opacity="0.1">
                <polygon points="30,20 40,30 30,40 20,30" fill="white" />
                <polygon points="70,60 80,70 70,80 60,70" fill="white" />
                <polygon points="80,20 90,30 80,40 70,30" fill="white" />
                <path
                  d="M10,10 L90,90 M90,10 L10,90"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.1"
                />
              </g>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="min-h-screen">
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 text-white">
        {/* Main Header Content */}
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
              className="h-40 w-40 md:h-64 md:w-64 object-contain"
              alt="GEHSPO Logo"
            />
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-wide">
                GEHSPO
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium leading-relaxed max-w-4xl mb-8">
                Global Environment, Health & Safety Professionals Organisation
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mb-10 leading-relaxed">
                Advancing professional excellence in environmental, health, and
                safety management through education, certification, and industry
                collaboration.
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
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              {/* Main Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`}
              />

              {/* Accent Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${slide.accentGradient} opacity-30`}
              />

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
                  {currentBanner.id === "environment" && (
                    <Leaf className="h-4 w-4" />
                  )}
                  {currentBanner.id === "health" && (
                    <Heart className="h-4 w-4" />
                  )}
                  {currentBanner.id === "safety" && (
                    <Shield className="h-4 w-4" />
                  )}
                  <span className="font-medium">Professional Excellence</span>
                </div>
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {currentBanner.title}
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white text-opacity-95 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
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

              {/* <Button
                size="lg"
                variant="outline"
                className="text-white border-2 border-white bg-transparent hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 backdrop-blur-sm transition-all duration-300"
              >
                Learn More
              </Button> */}
            </div>
          </div>
        </div>

        {/* Enhanced Banner Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-lg hover:scale-110"
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374467/1000018015_gmdpjb.jpg"
              className="h-40 w-40 mx-auto mb-12"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Uniting EHS professionals worldwide to advance safety standards,
              drive environmental stewardship, and protect our communities
              through innovative solutions and industry leadership.
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
                  The purpose of the Global Environmental, Health and Safety
                  Professionals Organization (GEHSPO) is to promote and advance
                  the profession of EHS management through excellence,
                  innovation, and collaborative leadership.
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
                  Our vision is to bring together EHS professionals from all
                  communities to create one unified voice for the cause of EHS
                  management and advancement, fostering a safer, healthier, and
                  more sustainable world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EHS Focus Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Core Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 drop-shadow-lg">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive EHS solutions delivering measurable impact across
              industries worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-green-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-100">
                  Environment
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed">
                  Environmental protection, sustainability initiatives, and
                  carbon footprint reduction strategies
                </p>
              </div>
            </div>

            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-blue-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-100">Health</div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed">
                  Occupational health programs, wellness initiatives, and
                  employee wellbeing solutions
                </p>
              </div>
            </div>

            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-orange-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-100">Safety</div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed">
                  Workplace safety standards, risk management, and incident
                  prevention protocols
                </p>
              </div>
            </div>

            <div className="text-center hover:shadow-2xl transition-all duration-300 group bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
              <div className="pb-6 px-6 pt-6">
                <div className="mx-auto w-20 h-20 bg-red-900 bg-opacity-40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Flame className="h-10 w-10 text-white" />
                </div>
                <div className="text-xl font-bold text-gray-100">
                  Fire Safety
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed">
                  Fire prevention systems, emergency response protocols, and
                  safety compliance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
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
              Supporting EHS professionals with industry-leading resources,
              expertise, and innovative solutions
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
                    <div className="text-xl text-gray-100 font-bold">
                      Legal Compliance
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-white bg-opacity-10 text-white border border-white border-opacity-20"
                    >
                      Expert Guidance
                    </Badge>
                  </div>
                </div>
                <div className="text-base text-gray-300">
                  Stay ahead of evolving EHS regulations with our comprehensive
                  legal compliance solutions and expert guidance
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore Legal Services
                </Button>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-900 bg-opacity-40 rounded-xl">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl text-gray-100 font-bold">
                      Documentation Hub
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-white bg-opacity-10 text-white border border-white border-opacity-20"
                    >
                      Resource Library
                    </Badge>
                  </div>
                </div>
                <div className="text-base text-gray-300">
                  Access our comprehensive library of EHS documentation,
                  templates, and best practice resources
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
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access Documentation
                </Button>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="pb-6 px-6 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-900 bg-opacity-40 rounded-xl">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl text-gray-100 font-bold">
                      Career Development
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-white bg-opacity-10 text-white border border-white border-opacity-20"
                    >
                      Growth Opportunities
                    </Badge>
                  </div>
                </div>
                <div className="text-base text-gray-300">
                  Advance your EHS career with our job placement services,
                  networking opportunities, and professional development
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
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Explore Careers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-8 bg-white bg-opacity-20 text-white border-white border-opacity-30 px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            Join Our Community
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your EHS Career
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with industry leaders, access cutting-edge resources, and
            advance your career in environmental, health, and safety management
            with GEHSPO's global professional community.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
            >
              Become a Member
            </Button>
          </div>
        </div>
      </section>

      <CommentsSection />
      <ContactUsSection />

      {/* Footer */}
      <footer className="text-white py-16">
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
                  <p className="text-sm text-gray-400">Global EHS Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Advancing EHS excellence through professional development,
                innovative solutions, and global community collaboration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "Services", "Careers", "Contact", "News"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(" ", "")}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">EHS Solutions</h3>
              <ul className="space-y-3">
                {[
                  "Environment",
                  "Health",
                  "Safety",
                  "Fire Safety",
                  "Compliance",
                ].map((item) => (
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
                {[
                  "EHS Legal",
                  "Documentation",
                  "Training",
                  "Certifications",
                  "Support",
                ].map((item) => (
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
                &copy; {new Date().getFullYear()} GEHSPO - Global Environmental,
                Health and Safety Professionals Organization. All rights
                reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
