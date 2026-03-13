"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 transition-all duration-300 ${
        scrolled ? "bg-neutral-950/95" : "bg-neutral-950/80"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
        <span className="font-display font-semibold text-neutral-100">
          Dusan Luketic
        </span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-0.5 bg-neutral-400 block transition-all" />
          <span className="w-5 h-0.5 bg-neutral-400 block transition-all" />
          <span className="w-5 h-0.5 bg-neutral-400 block transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-neutral-800/50 bg-neutral-950/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
