"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import {
  Shield,
  Leaf,
  Heart,
  Flame,
  Scale,
  FileText,
  Briefcase,
  Settings,
  ChevronDown,
  User,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: null, subItems: [] },
  {
    name: "Environment",
    href: "/environment/What-is-Environment",
    icon: Leaf,
    subItems: [
      { name: "What is Environment", href: "/environment/What-is-Environment" },
      { name: "Water Pollution-1", href: "/environment/Water-Pollution-1" },
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
      { name: "AHA-Activity Hazard Analysis", href: "/docs/AHA-Activity-Hazard-Analysis" },
      { name: "CL-Check List", href: "/docs/CL-Check-List" },
      { name: "COP-Code Of Practice", href: "/docs/COP-Code-Of-Practice" },
      { name: "HIRA-Hazard Identification & Risk Assessment", href: "/docs/HIRA-Hazard-Identification-Risk-Assessment" },
      { name: "JCC-Job Cycle Check", href: "/docs/JCC-Job-Cycle-Check" },
      { name: "JHA-Job Hazard Analysis", href: "/docs/JHA-Job-Hazard-Analysis" },
      { name: "JSA-Job Safety Analysis", href: "/docs/JSA-Job-Safety-Analysis" },
      { name: "JSP-Job Safe Practices", href: "/docs/JSP-Job-Safe-Practices" },
      { name: "JTA-Job Training Analysis", href: "/docs/JTA-Job-Training-Analysis" },
      { name: "MI-Management Instructions", href: "/docs/MI-Management-Instructions" },
      { name: "MS-Method Statement", href: "/docs/MS-Method-Statement" },
      { name: "OCP-Operation Control Procedure", href: "/docs/OCP-Operation-Control-Procedure" },
      { name: "PTW-Permit To Work", href: "/docs/PTW-Permit-To-Work" },
      { name: "SMP-Safe Maintenance Procedure", href: "/docs/SMP-Safe-Maintenance-Procedure" },
      { name: "SOP-Standard Operating Procedure", href: "/docs/SOP-Standard-Operating-Procedure" },
      { name: "SPA-Safe Plan of Action", href: "/docs/SPA-Safe-Plan-of-Action" },
      { name: "SWMS-Safe Work Method Statement", href: "/docs/SWMS-Safe-Work-Method-Statement" },
      { name: "TBT-Tool Box Talk", href: "/docs/TBT-Tool-Box-Talk" },
      { name: "TP-Template", href: "/docs/TP-Template" },
      { name: "TRA-Task Risk Assessment", href: "/docs/TRA-Task-Risk-Assessment" },
      { name: "WI-Work Instructions", href: "/docs/WI-Work-Instructions" },
    ],
  },
  { name: "Jobs", href: "/jobs", icon: Briefcase, subItems: [] },
  { name: "Services", href: "/services", icon: Settings, subItems: [] },
  { name: "About Us", href: "/about", icon: null, subItems: [] },
  { name: "Blog", href: "/blog", icon: null, subItems: [] },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;
    let firebaseApp = null;
    let firebaseAuth = null;
    (async () => {
      if (typeof window !== "undefined") {
        let firebaseModule = await import("firebase/compat/app");
        firebaseModule = firebaseModule.default
          ? firebaseModule.default
          : firebaseModule;
        await import("firebase/compat/auth");
        if (!firebaseModule.apps.length) {
          // Use your config here or import from a config file
          firebaseModule.initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          });
        }
        firebaseApp = firebaseModule;
        firebaseAuth = firebaseModule.auth();
        unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
          setUser(firebaseUser);
          setAuthLoading(false);
        });
      }
    })();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      let firebaseModule = await import("firebase/compat/app");
      firebaseModule = firebaseModule.default
        ? firebaseModule.default
        : firebaseModule;
      await import("firebase/compat/auth");
      const firebaseAuth = firebaseModule.auth();
      await firebaseAuth.signOut();
      setUser(null);
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 text-white">
      {/* Top Navigation Bar */}
      <nav className="border-b border-gray-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
                            "absolute left-0 top-full w-56 bg-gray-900 shadow-lg border border-gray-700 rounded-md z-50 py-1 animate-fade-in"
                          )}
                          role="menu"
                          tabIndex={-1}
                        >
                          <div className="px-3 py-2 text-sm font-semibold text-gray-100 bg-gray-900 border-b border-gray-700 rounded-t-md">
                            {item.name}
                          </div>
                          {item.subItems.map((subItem, index) => (
                            <div key={index} role="menuitem">
                              <Link
                                href={subItem.href}
                                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 cursor-pointer rounded transition-colors"
                                tabIndex={0}
                                onClick={() => setHoveredMenu(null)}
                              >
                                {subItem.name}
                              </Link>
                            </div>
                          ))}
                          {/* <div className="my-1 border-t border-gray-700" />
                          <div role="menuitem">
                            <Link
                              href={item.href}
                              className="flex items-center px-3 py-2 text-sm font-semibold text-white hover:bg-gray-900 cursor-pointer rounded-b-md transition-colors"
                              tabIndex={0}
                              onClick={() => setHoveredMenu(null)}
                            >
                              View All {item.name}
                            </Link>
                          </div> */}
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
              {/* Auth Buttons */}
              {!authLoading && user ? (
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
                      <button
                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer w-full text-left"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                !authLoading && (
                  <Link
                    href="/auth"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )
              )}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;