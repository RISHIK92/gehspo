"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import Image from "next/image";
import CommentsSection from "./components/comments-section";
import ContactUsSection from "./components/contact-us-section";
import { cn } from "@/lib/utils";

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
      { name: "Environmental Management", href: "/environment/management" },
      { name: "Sustainability Programs", href: "/environment/sustainability" },
      { name: "Carbon Footprint", href: "/environment/carbon-footprint" },
      { name: "Waste Management", href: "/environment/waste-management" },
      { name: "Green Certifications", href: "/environment/certifications" },
    ],
  },
  {
    name: "Health",
    href: "/health",
    icon: Heart,
    subItems: [
      { name: "Occupational Health", href: "/health/occupational" },
      { name: "Wellness Programs", href: "/health/wellness" },
      { name: "Health Assessments", href: "/health/assessments" },
      { name: "Mental Health", href: "/health/mental-health" },
      { name: "Ergonomics", href: "/health/ergonomics" },
    ],
  },
  {
    name: "Safety",
    href: "/safety",
    icon: Shield,
    subItems: [
      { name: "Workplace Safety", href: "/safety/workplace" },
      { name: "Risk Management", href: "/safety/risk-management" },
      { name: "Safety Training", href: "/safety/training" },
      { name: "Incident Management", href: "/safety/incidents" },
      { name: "Safety Audits", href: "/safety/audits" },
    ],
  },
  {
    name: "Fire",
    href: "/fire",
    icon: Flame,
    subItems: [
      { name: "Fire Prevention", href: "/fire/prevention" },
      { name: "Emergency Response", href: "/fire/emergency-response" },
      { name: "Fire Safety Training", href: "/fire/training" },
      { name: "Fire Risk Assessment", href: "/fire/risk-assessment" },
      { name: "Fire Equipment", href: "/fire/equipment" },
    ],
  },
  {
    name: "EHS Legal",
    href: "/legal",
    icon: Scale,
    subItems: [
      { name: "Regulations", href: "/legal/regulations" },
      { name: "Compliance", href: "/legal/compliance" },
      { name: "Legal Updates", href: "/legal/updates" },
      { name: "Policy Development", href: "/legal/policy-development" },
      { name: "Legal Consulting", href: "/legal/consulting" },
    ],
  },
  {
    name: "EHS Docs",
    href: "/docs",
    icon: FileText,
    subItems: [
      { name: "Templates", href: "/docs/templates" },
      { name: "Policies", href: "/docs/policies" },
      { name: "Procedures", href: "/docs/procedures" },
      { name: "Forms", href: "/docs/forms" },
      { name: "Guidelines", href: "/docs/guidelines" },
    ],
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    subItems: [
      { name: "Job Search", href: "/jobs/search" },
      { name: "Career Development", href: "/jobs/career-development" },
      { name: "Networking", href: "/jobs/networking" },
      { name: "Resume Services", href: "/jobs/resume-services" },
      { name: "Interview Prep", href: "/jobs/interview-prep" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    icon: Settings,
    subItems: [
      { name: "Consulting", href: "/services/consulting" },
      { name: "Training", href: "/services/training" },
      { name: "Auditing", href: "/services/auditing" },
      { name: "Certification", href: "/services/certification" },
      { name: "Implementation", href: "/services/implementation" },
    ],
  },
  {
    name: "About Us",
    href: "/about",
    icon: null,
    subItems: [
      { name: "Our Team", href: "/about/team" },
      { name: "History", href: "/about/history" },
      { name: "Mission & Vision", href: "/about/mission" },
      { name: "Contact", href: "/about/contact" },
      { name: "Partnerships", href: "/about/partnerships" },
    ],
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

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
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 text-white">
        {/* Top Navigation Bar */}
        <nav className="border-b border-gray-700">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3">
                  <img
                    src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
                    alt="GEHSPO Logo"
                    width={45}
                    height={45}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">GEHSPO</span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  if (item.subItems.length > 0) {
                    return (
                      <div
                        key={item.name}
                        onMouseEnter={() => setHoveredMenu(item.name)}
                        onMouseLeave={() => setHoveredMenu(null)}
                        style={{
                          display: "inline-block",
                          position: "relative",
                        }}
                      >
                        <button
                          className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap group"
                          aria-haspopup="true"
                          aria-expanded={hoveredMenu === item.name}
                          tabIndex={0}
                          onFocus={() => setHoveredMenu(item.name)}
                          onBlur={(e) => {
                            if (
                              !e.relatedTarget ||
                              !e.currentTarget.parentNode.contains(
                                e.relatedTarget
                              )
                            ) {
                              setHoveredMenu(null);
                            }
                          }}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{item.name}</span>
                          <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />
                        </button>
                        {hoveredMenu === item.name && (
                          <div
                            className={cn(
                              "absolute left-0 top-full w-56 bg-white shadow-lg border border-gray-200 rounded-md z-50 py-1 animate-fade-in"
                            )}
                            role="menu"
                            tabIndex={-1}
                          >
                            <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 border-b rounded-t-md">
                              {item.name}
                            </div>
                            {item.subItems.map((subItem, index) => (
                              <div key={index} role="menuitem">
                                <Link
                                  href={subItem.href}
                                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 cursor-pointer rounded"
                                  tabIndex={0}
                                  onClick={() => setHoveredMenu(null)}
                                >
                                  {subItem.name}
                                </Link>
                              </div>
                            ))}
                            <div className="my-1 border-t border-gray-200" />
                            <div role="menuitem">
                              <Link
                                href={item.href}
                                className="flex items-center px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-gray-50 cursor-pointer rounded-b-md"
                                tabIndex={0}
                                onClick={() => setHoveredMenu(null)}
                              >
                                View All {item.name}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.name}</span>
                      </Link>
                    );
                  }
                })}
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 mt-1 bg-white shadow-lg border border-gray-200"
                    align="end"
                  >
                    <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 border-b">
                      My Account
                    </div>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <button className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer w-full text-left">
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden border-t border-gray-700">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {Icon && <Icon className="h-5 w-5" />}
                          <span>{item.name}</span>
                        </Link>
                        {item.subItems.length > 0 && (
                          <div className="ml-8 space-y-1">
                            {item.subItems.map((subItem, index) => (
                              <Link
                                key={index}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex flex-col space-y-2 px-4">
                      <Button
                        variant="ghost"
                        className="text-gray-300 hover:text-white hover:bg-gray-700 justify-start"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-gray-300 hover:text-white hover:bg-gray-700 justify-start"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Header Content */}
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374466/1000018013_leru1q.jpg"
              className="h-64 w-64 absolute left-12"
            />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-wide">
              GEHSPO
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium leading-relaxed max-w-4xl mx-auto mb-8">
              Global Environment, Health & Safety Professionals Organisation
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Advancing professional excellence in environmental, health, and
              safety management through education, certification, and industry
              collaboration.
            </p>
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751374467/1000018015_gmdpjb.jpg"
              className="h-40 w-40 mx-auto mb-12"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Uniting EHS professionals worldwide to advance safety standards,
              drive environmental stewardship, and protect our communities
              through innovative solutions and industry leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-gray-900">Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  The purpose of the Global Environmental, Health and Safety
                  Professionals Organization (GEHSPO) is to promote and advance
                  the profession of EHS management through excellence,
                  innovation, and collaborative leadership.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-gray-900">Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our vision is to bring together EHS professionals from all
                  communities to create one unified voice for the cause of EHS
                  management and advancement, fostering a safer, healthier, and
                  more sustainable world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EHS Focus Areas */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Core Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive EHS solutions delivering measurable impact across
              industries worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Environmental protection, sustainability initiatives, and
                  carbon footprint reduction strategies
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Occupational health programs, wellness initiatives, and
                  employee wellbeing solutions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Workplace safety standards, risk management, and incident
                  prevention protocols
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Flame className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Fire Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Fire prevention systems, emergency response protocols, and
                  safety compliance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-100 text-purple-800 px-4 py-2">
              <Settings className="h-4 w-4 mr-2" />
              Professional Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive EHS Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supporting EHS professionals with industry-leading resources,
              expertise, and innovative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      Legal Compliance
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-blue-100 text-blue-800"
                    >
                      Expert Guidance
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-600">
                  Stay ahead of evolving EHS regulations with our comprehensive
                  legal compliance solutions and expert guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Regulatory Updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Compliance Audits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Legal Documentation</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore Legal Services
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-600 rounded-xl">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      Documentation Hub
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-green-100 text-green-800"
                    >
                      Resource Library
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-600">
                  Access our comprehensive library of EHS documentation,
                  templates, and best practice resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Policy Templates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Training Materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Best Practices Guide</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      Career Development
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-purple-100 text-purple-800"
                    >
                      Growth Opportunities
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-base text-gray-600">
                  Advance your EHS career with our job placement services,
                  networking opportunities, and professional development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Job Placement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional Network</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Skill Development</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Explore Careers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-gray-900 text-white">
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
      <footer className="bg-gray-900 text-white py-16">
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
