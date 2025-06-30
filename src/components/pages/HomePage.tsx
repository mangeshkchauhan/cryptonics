"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart3, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";

export function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Track Crypto
                  </span>
                  <br />
                  <span className="text-white">Like a Pro</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-gray-300 leading-relaxed max-w-lg"
              >
                Get real-time cryptocurrency prices, detailed charts, and comprehensive 
                market analysis. Stay ahead of the market with Cryptonics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/coins">
                  <Button size="lg" className="group">
                    Explore Cryptocurrencies
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/exchanges">
                  <Button variant="outline" size="lg">
                    View Exchanges
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Animated Bitcoin */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <Image
                  src="/btc.png"
                  alt="Bitcoin"
                  width={400}
                  height={400}
                  className="relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Cryptonics?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced features designed for both beginners and professional traders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Start Your Crypto Journey Today
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join millions of traders who trust Cryptonics for their cryptocurrency tracking needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/coins">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/exchanges">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

const features = [
  {
    title: "Real-Time Data",
    description: "Get live cryptocurrency prices and market data updated every second from trusted sources.",
    icon: TrendingUp,
  },
  {
    title: "Advanced Charts",
    description: "Analyze price movements with professional-grade charts and technical indicators.",
    icon: BarChart3,
  },
  {
    title: "Secure & Reliable",
    description: "Built with security in mind, ensuring your data privacy and platform reliability.",
    icon: Shield,
  },
]; 