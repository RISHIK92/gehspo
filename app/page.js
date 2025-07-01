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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const bannerSlides = [
  {
    title: "Advancing EHS Excellence",
    subtitle: "Leading the future of Environmental, Health & Safety management",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Learn More",
  },
  {
    title: "Professional Development",
    subtitle:
      "Enhance your EHS skills with our comprehensive training programs",
    image: "/placeholder.svg?height=400&width=800",
    cta: "View Courses",
  },
  {
    title: "Industry Standards",
    subtitle: "Stay updated with the latest EHS regulations and best practices",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Explore Resources",
  },
];

const navItems = [
  { name: "Home", href: "/", icon: null },
  { name: "Environment", href: "/environment", icon: Leaf },
  { name: "Health", href: "/health", icon: Heart },
  { name: "Safety", href: "/safety", icon: Shield },
  { name: "Fire", href: "/fire", icon: Flame },
  { name: "EHS Legal", href: "/legal", icon: Scale },
  { name: "EHS Docs", href: "/docs", icon: FileText },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Services", href: "/services", icon: Settings },
  { name: "About Us", href: "/about", icon: null },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="https://scontent.fdel25-5.fna.fbcdn.net/v/t39.30808-6/303309187_454650413347479_9016194842414955070_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zaUabi4yK50Q7kNvwHwWQKK&_nc_oc=AdlnrSH9Haybn-9usdWEyk2sikU3iSJppp_XfdA70aPEzVU1aQ8zJaGWbir7lDNvbS8&_nc_zt=23&_nc_ht=scontent.fdel25-5.fna&_nc_gid=WL3cUYtVgR4Xu7Ykct5dSQ&oh=00_AfOcSrm2FInF-YO-df0ZaB3Su5RtELEnaX5nkNcSqhTDVA&oe=68698A0F"
                  alt="GEHSPO Logo"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="text-xl font-bold text-gray-900">GEHSPO</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner with Transitions */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          {bannerSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {bannerSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {bannerSlides[currentSlide].subtitle}
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {bannerSlides[currentSlide].cta}
            </Button>
          </div>
        </div>

        {/* Banner Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Environmental, Health and Safety Professionals Organization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uniting EHS professionals worldwide to advance safety standards
              and protect our communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The purpose of the Global Environmental, Health and Safety
                  Professionals Organization (GEHSPO) is to promote and advance
                  the profession of EHS management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-blue-600" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Our vision is to bring together EHS professionals from all
                  communities to create one voice for the cause of EHS
                  management and EHS advancement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EHS Focus Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive EHS solutions for a safer tomorrow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Environmental protection and sustainability initiatives
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Occupational health and wellness programs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Workplace safety standards and risk management
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Flame className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Fire Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fire prevention and emergency response protocols
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Services
            </h2>
            <p className="text-xl text-gray-600">
              Supporting EHS professionals with comprehensive resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Legal Compliance</CardTitle>
                <CardDescription>
                  Stay updated with EHS regulations and legal requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Access comprehensive EHS documentation and resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Browse Docs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Career Opportunities</CardTitle>
                <CardDescription>
                  Find your next EHS role with our job placement services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  View Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the GEHSPO Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with EHS professionals worldwide and advance your career in
            environmental, health, and safety management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Become a Member
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://scontent.fdel25-5.fna.fbcdn.net/v/t39.30808-6/303309187_454650413347479_9016194842414955070_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zaUabi4yK50Q7kNvwHwWQKK&_nc_oc=AdlnrSH9Haybn-9usdWEyk2sikU3iSJppp_XfdA70aPEzVU1aQ8zJaGWbir7lDNvbS8&_nc_zt=23&_nc_ht=scontent.fdel25-5.fna&_nc_gid=WL3cUYtVgR4Xu7Ykct5dSQ&oh=00_AfOcSrm2FInF-YO-df0ZaB3Su5RtELEnaX5nkNcSqhTDVA&oe=68698A0F"
                  alt="GEHSPO Logo"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="text-xl font-bold">GEHSPO</span>
              </div>
              <p className="text-gray-400">
                Advancing EHS excellence through professional development and
                community collaboration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">EHS Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/environment"
                    className="text-gray-400 hover:text-white"
                  >
                    Environment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/health"
                    className="text-gray-400 hover:text-white"
                  >
                    Health
                  </Link>
                </li>
                <li>
                  <Link
                    href="/safety"
                    className="text-gray-400 hover:text-white"
                  >
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/fire" className="text-gray-400 hover:text-white">
                    Fire Safety
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal & Docs</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/legal"
                    className="text-gray-400 hover:text-white"
                  >
                    EHS Legal
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} GEHSPO - Global Environmental,
              Health and Safety Professionals Organization. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
