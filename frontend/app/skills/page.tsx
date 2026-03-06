"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/skills`);
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(skills.map((s) => s.category)))];
  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const getSkillLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
      case 'advanced':
        return 90;
      case 'intermediate':
        return 70;
      case 'beginner':
      case 'basic':
        return 50;
      default:
        return 60;
    }
  };

  const getSkillColor = (index: number) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-[#DAA520] to-orange-500',
      'from-green-500 to-emerald-500',
      'from-red-500 to-rose-500',
      'from-indigo-500 to-blue-500',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading Skills...</p>
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
              Portfolio
            </Link>
            <div className="hidden md:flex gap-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium">About</Link>
              <Link href="/skills" className="text-white font-medium">Skills</Link>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors font-medium">Projects</Link>
              <Link href="/experiences" className="text-gray-300 hover:text-white transition-colors font-medium">Experience</Link>
              <Link href="/contact" className="bg-gradient-to-r from-[#DAA520] to-orange-500 hover:from-[#C4941D] hover:to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Skills Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Skills</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
            <p className="text-gray-300 text-xl">Technologies and tools I work with</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'glass text-gray-300 hover:text-white border border-white/10'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill, index) => {
              const skillLevel = getSkillLevel(skill.level);
              const gradient = getSkillColor(index);

              return (
                <div
                  key={skill._id}
                  className="glass p-6 rounded-3xl border border-white/10 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    <span className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-sm rounded-full font-medium`}>
                      {skill.level}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Proficiency</span>
                      <span>{skillLevel}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${gradient} rounded-full animate-shimmer relative overflow-hidden`}
                        style={{ width: `${skillLevel}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{skill.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
                {skills.length}
              </div>
              <div className="text-gray-300 text-lg">Total Skills</div>
            </div>

            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-300 text-lg">Categories</div>
            </div>

            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-orange-400 mb-2">
                {skills.filter(s => s.level.toLowerCase() === 'expert' || s.level.toLowerCase() === 'advanced').length}
              </div>
              <div className="text-gray-300 text-lg">Expert Skills</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2026 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
