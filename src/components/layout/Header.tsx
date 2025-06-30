"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CurrencySelector } from "@/components/common/CurrencySelector";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Coins", href: "/coins" },
  { name: "Exchanges", href: "/exchanges" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-105 transition-transform">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cryptonics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CurrencySelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-800">
                <CurrencySelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 