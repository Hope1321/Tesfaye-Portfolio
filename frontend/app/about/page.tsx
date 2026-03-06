"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface About {
  name: string;
  role: string;
  description: string;
  email?: string;
  phone?: string;
  location?: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/about`);
      
      if (res.ok) {
        const data = await res.json();
        setAbout(data);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading About...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              {about?.name || "Portfolio"}
            </Link>
            <div className="hidden md:flex gap-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-white font-medium">About</Link>
              <Link href="/skills" className="text-gray-300 hover:text-white transition-colors font-medium">Skills</Link>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors font-medium">Projects</Link>
              <Link href="/experiences" className="text-gray-300 hover:text-white transition-colors font-medium">Experience</Link>
              <Link href="/contact" className="bg-gradient-to-r from-[#DAA520] to-orange-500 hover:from-[#C4941D] hover:to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Me</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Profile */}
            <div className="text-center lg:text-left space-y-8 animate-slide-in-left">
              <div className="glass p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center animate-float">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4">{about?.name || "Your Name"}</h2>
                <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-orange-400 font-semibold mb-6">
                  {about?.role || "Your Role"}
                </p>
                
                <div className="space-y-4 text-gray-300 text-lg">
                  {about?.email && (
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>{about.email}</span>
                    </div>
                  )}
                  
                  {about?.phone && (
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{about.phone}</span>
                    </div>
                  )}
                  
                  {about?.location && (
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{about.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - Description */}
            <div className="animate-slide-in-right">
              <div className="glass p-8 rounded-3xl border border-white/10 hover-lift">
                <h3 className="text-3xl font-bold text-white mb-6">My Story</h3>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {about?.description || "I am a passionate developer with a love for creating beautiful and functional web applications. My journey in tech has been driven by curiosity and a desire to solve complex problems with elegant solutions."}
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="glass p-6 rounded-2xl border border-white/5">
                      <h4 className="text-xl font-bold text-white mb-3">What I Do</h4>
                      <p className="text-gray-300">
                        I specialize in building modern web applications using cutting-edge technologies. From responsive frontends to robust backends, I bring ideas to life through code.
                      </p>
                    </div>
                    
                    <div className="glass p-6 rounded-2xl border border-white/5">
                      <h4 className="text-xl font-bold text-white mb-3">My Approach</h4>
                      <p className="text-gray-300">
                        I believe in writing clean, maintainable code and creating user experiences that delight. Every project is an opportunity to learn and grow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
            >
              Get In Touch
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2026 {about?.name || "Portfolio"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
