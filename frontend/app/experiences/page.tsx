"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Experience {
  _id: string;
  title: string;
  company: string;
  from: string;
  to?: string;
  description?: string;
  isCurrent: boolean;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/experiences`);
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getDotColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-purple-500 to-pink-500',
      'bg-gradient-to-br from-[#DAA520] to-orange-500',
    ];
    return colors[index % colors.length];
  };

  const getCompanyColor = (index: number) => {
    const colors = [
      'text-blue-400',
      'text-purple-400',
      'text-[#DAA520]',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading Experience...</p>
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
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors font-medium">Projects</Link>
              <Link href="/experiences" className="text-white font-medium">Experience</Link>
              <Link href="/contact" className="bg-gradient-to-r from-[#DAA520] to-orange-500 hover:from-[#C4941D] hover:to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Experience Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Experience</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
            <p className="text-gray-300 text-xl">My professional journey and career milestones</p>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            {experiences.length > 0 ? (
              <div className="space-y-16">
                {experiences.map((exp, index) => (
                  <div key={exp._id} className="relative pl-12 pb-16 border-l-2 border-white/10 last:border-l-0 last:pb-0 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                    <div className={`absolute -left-4 top-0 w-8 h-8 ${getDotColor(index)} rounded-full border-4 border-gray-900 shadow-2xl`}></div>

                    <div className="glass p-8 rounded-3xl hover-lift border border-white/10">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                          <p className={`text-xl ${getCompanyColor(index)} font-medium`}>{exp.company}</p>
                        </div>
                        {exp.isCurrent && (
                          <span className="px-6 py-3 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="text-gray-400 flex items-center gap-3 text-lg mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatDate(exp.from)} - {exp.isCurrent ? "Present" : exp.to ? formatDate(exp.to) : "N/A"}
                      </p>

                      {exp.description && (
                        <p className="text-gray-300 leading-relaxed text-lg">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-xl">No experience added yet.</p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                {experiences.length}
              </div>
              <div className="text-gray-300 text-lg">Total Positions</div>
            </div>

            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {experiences.filter(exp => exp.isCurrent).length}
              </div>
              <div className="text-gray-300 text-lg">Current Roles</div>
            </div>

            <div className="glass p-8 rounded-3xl text-center border border-white/10 hover-lift">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-orange-400 mb-2">
                {new Set(experiences.map(exp => exp.company)).size}
              </div>
              <div className="text-gray-300 text-lg">Companies</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
            >
              Interested in working together?
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
          <p className="text-gray-400">© 2026 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
