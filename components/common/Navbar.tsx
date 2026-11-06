"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import { useSiteStore } from "@/lib/siteStore";
import {
  Menu,
  X,
  UserPlus,
  LogIn,
  HeartHandshake,
  Droplet,
  FileText,
  Users,
  Info,
  Phone,
  Home,
  ShieldAlert,
  Sparkles,
  MapPin,
  Settings,
} from "lucide-react";

const navLinks = [
  { name: "হোম", href: "/", icon: Home },
  { name: "আমাদের সম্পর্কে", href: "/about", icon: Info },
  { name: "গঠনতন্ত্র", href: "/constitution", icon: FileText },
  { name: "কমিটি", href: "/committee", icon: Users },
  { name: "সদস্য ডিরেক্টরি", href: "/members", icon: Users },
  { name: "নোটিশ", href: "/notices", icon: FileText },
  { name: "ব্লাড ব্যাংক", href: "/blood-bank", icon: Droplet },
  { name: "কল্যাণ তহবিল", href: "/welfare", icon: HeartHandshake },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useSiteStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Dynamic Notification Ticker (Admin customizable) */}
      <div className="bg-[#06261C] text-emerald-200/90 text-[11px] sm:text-xs py-1 px-4 border-b border-emerald-800/40 font-bangla overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-ping shrink-0"></span>
            <span className="text-[#FBBF24] font-bold shrink-0">নোটিশ:</span>
            <span className="truncate text-slate-200">
              {settings.announcementTicker}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#FBBF24]" />
              কিশোরগঞ্জ উপজেলা, নীলফামারী
            </span>
            <Link
              href="/admin"
              className="text-[#FBBF24] hover:underline flex items-center gap-1 font-semibold"
            >
              <Settings className="w-3 h-3" />
              অ্যাডমিন প্যানেল
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B3B2C]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-emerald-900/50"
            : "bg-gradient-to-b from-[#0B3B2C]/90 via-[#0B3B2C]/60 to-transparent py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Title with Nilphamari context */}
            <Link href="/" className="flex items-center gap-3 group">
              <AnimatedLogo size="sm" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-white font-extrabold text-base sm:text-lg tracking-wide group-hover:text-[#FBBF24] transition-colors font-bangla leading-tight">
                    {settings.heroHeadline}
                  </span>
                  <span className="hidden xl:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A3E0]/20 text-[#38BDF8] border border-[#00A3E0]/40">
                    নীলফামারী
                  </span>
                </div>
                <span className="text-[#FBBF24] text-[11px] sm:text-xs font-semibold tracking-wider font-bangla">
                  {settings.slogan}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all font-bangla ${
                      isActive
                        ? "bg-white/20 text-[#FBBF24] font-bold shadow-xs"
                        : "text-white/90 hover:text-[#FBBF24] hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={`tel:${settings.contactPhone}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white/40 text-white hover:bg-white/15 hover:border-white transition-all backdrop-blur-sm flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>{settings.contactPhone}</span>
              </a>

              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#FBBF24] text-[#0B3B2C] hover:bg-[#F59E0B] shadow-sm hover:shadow transition-all flex items-center gap-1.5 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                সদস্য হোন
              </Link>

              <Link
                href="/login"
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#00A3E0] text-white hover:bg-[#0284C7] shadow-sm transition-all flex items-center gap-1"
                title="লগইন করুন"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden md:inline">লগইন</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/register"
                className="px-3 py-1 rounded-full text-xs font-bold bg-[#FBBF24] text-[#0B3B2C]"
              >
                সদস্য হোন
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                aria-label="মেনু খুলুন"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#FBBF24]" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B3B2C] border-b border-emerald-900/60 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium ${
                    isActive
                      ? "bg-[#145A43] text-[#FBBF24] font-bold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#FBBF24]" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-900/60 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold bg-[#00A3E0] text-white flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              লগইন / ড্যাশবোর্ড
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-xs font-medium border border-white/30 text-[#FBBF24] flex items-center justify-center gap-2"
            >
              <Settings className="w-3.5 h-3.5 text-[#FBBF24]" />
              অ্যাডমিন ড্যাশবোর্ড ও CMS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
