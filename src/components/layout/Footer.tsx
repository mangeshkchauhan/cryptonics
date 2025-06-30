import { Bitcoin, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cryptonics
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              The most advanced cryptocurrency tracking platform. Get real-time prices, 
              detailed charts, and comprehensive market data for thousands of cryptocurrencies.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/coins" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cryptocurrencies
                </Link>
              </li>
              <li>
                <Link href="/exchanges" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Market Cap
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Cryptonics. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 sm:mt-0">
            Data provided by CoinGecko API
          </p>
        </div>
      </div>
    </footer>
  );
} 