"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  link?: string;
  image?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const getProjectGradient = (index: number) => {
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
          <p className="text-white font-medium">Loading Projects...</p>
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
              <Link href="/skills" className="text-gray-300 hover:text-white transition-colors font-medium">Skills</Link>
              <Link href="/projects" className="text-white font-medium">Projects</Link>
              <Link href="/experiences" className="text-gray-300 hover:text-white transition-colors font-medium">Experience</Link>
              <Link href="/contact" className="bg-gradient-to-r from-[#DAA520] to-orange-500 hover:from-[#C4941D] hover:to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Projects Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Projects</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
            <p className="text-gray-300 text-xl">Explore my work and creative solutions</p>
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const gradient = getProjectGradient(index);

              return (
                <div
                  key={project._id}
                  className="glass rounded-3xl overflow-hidden hover-lift border border-white/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-56 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <span className="text-white text-7xl font-bold z-10 group-hover:scale-110 transition-transform">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <span className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-sm rounded-full font-medium`}>
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6 line-clamp-2 text-lg">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white/10 text-gray-300 text-sm rounded-full font-medium border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient} font-bold text-lg group/link hover:scale-105 transition-transform`}
                      >
                        View Project
                        <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
                {projects.length}
              </div>
              <div className="text-gray-300 text-lg">Total Projects</div>
            </div>

            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-300 text-lg">Categories</div>
            </div>

            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-orange-400 mb-2">
                {projects.filter(p => p.link).length}
              </div>
              <div className="text-gray-300 text-lg">Live Projects</div>
            </div>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-400 text-xl">No projects found in this category.</p>
            </div>
          )}
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
