import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoPath from "@/assets/logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/verification", label: "Certificate Verification" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-16">
          {/* Mobile: Center logo, Desktop: Left align */}
          <div className="flex items-center md:flex-none flex-1 justify-center md:justify-start order-2 md:order-1">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src={logoPath} 
                alt="AccredCert Logo" 
                className="h-12 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block order-3 md:order-2">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium px-4 py-3 rounded-md transition-colors duration-200 hover:bg-gray-800 whitespace-nowrap",
                    isActiveLink(link.href) ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden order-1 md:order-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-gray-800 p-3"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-3 bg-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors",
                  isActiveLink(link.href) ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
