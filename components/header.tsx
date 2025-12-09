"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import CTAButton from "./cta-button";
import { FadeIn } from "./motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const mailto = `mailto:${siteConfig.contact.email}`;

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-black/5 bg-brand-paper/95 backdrop-blur-md">
        <FadeIn className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 relative z-50 shrink-0">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full shadow-[0_10px_24px_-12px_rgba(111,55,21,0.45)]">
              <Image
                src="/android-chrome-192x192.png"
                alt={siteConfig.name}
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-sm sm:text-base font-semibold text-brand-black truncate">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-xs text-brand-neutral truncate">
                Properti &amp; kemitraan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-brand-neutral md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative transition-colors hover:text-brand-black ${isActive(item.href) ? "text-brand-primary font-semibold" : ""
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-brand-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <CTAButton href={mailto}>Hubungi Kami</CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-brand-black/10 bg-white transition-colors hover:bg-brand-black/5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`h-0.5 w-5 bg-brand-black transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
            />
            <span
              className={`h-0.5 w-5 bg-brand-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`h-0.5 w-5 bg-brand-black transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
            />
          </button>
        </FadeIn>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-[280px] bg-brand-paper shadow-2xl transition-transform duration-300 ease-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <nav className="flex flex-col gap-2 px-6 pt-24 pb-8">
          {/* Mobile Navigation Links */}
          {siteConfig.navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative overflow-hidden rounded-lg px-4 py-3 text-base font-medium transition-all ${isActive(item.href)
                ? "bg-brand-primary text-white shadow-sm"
                : "text-brand-neutral hover:bg-brand-black/5 hover:text-brand-black"
                }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <span className="relative z-10">{item.label}</span>
              {isActive(item.href) && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white/40 rounded-r" />
              )}
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <div className="mt-6 pt-6 border-t border-brand-black/10">
            <CTAButton href={mailto} className="w-full justify-center">
              Hubungi Kami
            </CTAButton>
          </div>

          {/* Mobile Footer Info */}
          <div className="mt-auto pt-8">
            <p className="text-xs text-brand-neutral text-center">
              {siteConfig.tagline}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
