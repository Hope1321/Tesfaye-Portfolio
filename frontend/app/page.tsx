"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ParallaxSection from "./components/ParallaxSection";

interface About {
  name: string;
  role: string;
  description: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  link?: string;
  image?: string;
}

interface Experience {
  _id: string;
  title: string;
  company: string;
  from: string;
  to?: string;
  isCurrent: boolean;
}

export default function HomePage() {
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    try {
      const [aboutRes, skillsRes, projectsRes, experiencesRes] =
        await Promise.all([
          fetch(`${API_URL}/about`),
          fetch(`${API_URL}/skills`),
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/experiences`),
        ]);

      if (aboutRes.ok) setAbout(await aboutRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json());
      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (experiencesRes.ok) setExperiences(await experiencesRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const topSkills = skills.slice(0, 8);
  const featuredProjects = projects.slice(0, 6);
  const yearsOfExperience = experiences.length > 0 ? experiences.length : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              {about?.name || "Tesfaye Eshatu"}
            </h1>

            {/* Desktop links */}
            <div className="hidden md:flex gap-8 items-center">
              <a
                href="/home"
                className="text-slate-200 hover:text-[#DAA520] transition-colors font-medium text-sm"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-slate-200 hover:text-[#DAA520] transition-colors font-medium text-sm"
              >
                About
              </a>
              <a
                href="/skills"
                className="text-slate-200 hover:text-[#DAA520] transition-colors font-medium text-sm"
              >
                Skills
              </a>
              <a
                href="/projects"
                className="text-slate-200 hover:text-[#DAA520] transition-colors font-medium text-sm"
              >
                Projects
              </a>
              <a
                href="/experience"
                className="text-slate-200 hover:text-[#DAA520] transition-colors font-medium text-sm"
              >
                Experience
              </a>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#DAA520] to-orange-500 hover:from-[#C4941D] hover:to-orange-600 text-slate-950 px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold text-sm"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:text-white hover:bg-slate-800 md:hidden focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu (toggles open/close on small screens) */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-800/80">
              <div className="space-y-1 py-3">
                <a
                  href="/home"
                  className="block px-2 py-2 text-sm text-slate-200 hover:text-[#DAA520] hover:bg-slate-900/70 rounded-md"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="block px-2 py-2 text-sm text-slate-200 hover:text-[#DAA520] hover:bg-slate-900/70 rounded-md"
                >
                  About
                </a>
                <a
                  href="/skills"
                  className="block px-2 py-2 text-sm text-slate-200 hover:text-[#DAA520] hover:bg-slate-900/70 rounded-md"
                >
                  Skills
                </a>
                <a
                  href="/projects"
                  className="block px-2 py-2 text-sm text-slate-200 hover:text-[#DAA520] hover:bg-slate-900/70 rounded-md"
                >
                  Projects
                </a>
                <a
                  href="/experience"
                  className="block px-2 py-2 text-sm text-slate-200 hover:text-[#DAA520] hover:bg-slate-900/70 rounded-md"
                >
                  Experience
                </a>
                <Link
                  href="/contact"
                  className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#DAA520] to-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-[#C4941D] hover:to-orange-600"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(147,51,234,0.18),_transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
            {/* Left: main content */}
            <div className="space-y-8">
              {/* Small badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1 text-sm text-slate-200 backdrop-blur-sm animate-fade-in-up">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Open to opportunities</span>
              </div>

              {/* Name and role */}
              <div className="space-y-4 animate-fade-in-up animation-delay-200">
                <p className="text-sm font-medium tracking-[0.35em] text-slate-400 uppercase">
                  Portfolio of
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  {about?.name || "Tesfaye Eshatu"}
                </h1>
                <h2 className="text-xl sm:text-2xl font-medium text-slate-300">
                  {about?.role || "Full Stack Developer"}
                </h2>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl animate-fade-in-up animation-delay-400">
                {about?.description ||
                  "I design and build reliable, scalable web applications with a focus on clean architecture, performance, and a great user experience."}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-600">
                <div className="min-w-[120px] group">
                  <p className="text-3xl font-semibold text-white transition-transform duration-200 group-hover:-translate-y-1">
                    {yearsOfExperience}+
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Years of experience
                  </p>
                </div>
                <div className="min-w-[120px] group">
                  <p className="text-3xl font-semibold text-white transition-transform duration-200 group-hover:-translate-y-1">
                    {projects.length}+
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Projects delivered
                  </p>
                </div>
                <div className="min-w-[120px] group">
                  <p className="text-3xl font-semibold text-white transition-transform duration-200 group-hover:-translate-y-1">
                    {skills.length}+
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Technologies
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animation-delay-800">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition"
                >
                  Get in touch
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 hover:border-slate-400 hover:text-white transition"
                >
                  View projects
                </Link>
              </div>

              {/* Contact line */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 animate-fade-in-up animation-delay-1000">
                {about?.email && (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {about.email}
                  </span>
                )}
                {about?.location && (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {about.location}
                  </span>
                )}
              </div>
            </div>

            {/* Right: simple, professional card */}
            <div className="hidden lg:flex justify-end animate-slide-in-right animation-delay-400">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-blue-500/60 via-slate-500/40 to-purple-500/60 blur opacity-60 animate-pulse" />
                <div className="relative rounded-3xl bg-slate-900/90 border border-white/10 px-8 py-10 shadow-xl backdrop-blur">
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-6">
                    PROFILE SUMMARY
                  </p>
                  <p className="text-sm text-slate-300 mb-6">
                    I help teams ship reliable, maintainable products by combining
                    strong engineering fundamentals with a pragmatic, business‑aware
                    mindset.
                  </p>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Primary stack</span>
                      <span className="font-medium text-slate-100">
                        JavaScript / TypeScript
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Backend</span>
                      <span className="font-medium text-slate-100">
                        Node.js, Express, MongoDB
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Frontend</span>
                      <span className="font-medium text-slate-100">
                        React, Next.js, Tailwind CSS
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>Available for remote / onsite</span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="font-medium text-emerald-300">
                        Accepting new projects
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-xs text-slate-400">
          <span className="uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
          <a
            href="#about"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600/70 hover:border-slate-300 text-slate-300 hover:text-white transition-colors animate-bounce"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-orange-500">
                Me
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#DAA520] via-purple-500 to-pink-500 mx-auto rounded-full animate-scale-in dark:bg-gradient-to-r from-[#DAA520] via-purple-500 to-pink-500"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="glass p-8 rounded-3xl border border-white/10 dark:border-gray-700">
                <p className="text-xl text-gray-300 leading-relaxed dark:text-gray-400">
                  {about?.description || "Loading..."}
                </p>
              </div>

              <div className="space-y-6">
                {about?.email && (
                  <div className="flex items-center gap-4 text-gray-300 glass p-4 rounded-2xl border border-white/10 dark:border-gray-700 hover-lift">
                    <div className="bg-gradient-to-r from-[#DAA520] to-orange-500 p-3 rounded-xl dark:bg-gradient-to-r from-[#DAA520] to-orange-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 dark:text-gray-500">
                        Email
                      </div>
                      <div className="font-medium">{about.email}</div>
                    </div>
                  </div>
                )}

                {about?.location && (
                  <div className="flex items-center gap-4 text-gray-300 glass p-4 rounded-2xl border border-white/10 dark:border-gray-700 hover-lift">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl dark:bg-gradient-to-r from-purple-500 to-pink-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 dark:text-gray-500">
                        Location
                      </div>
                      <div className="font-medium">{about.location}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 dark:bg-gradient-to-r from-purple-600 to-pink-600 dark:hover:bg-gradient-to-r from-purple-700 to-pink-700"
                >
                  Let's Talk
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 animate-slide-in-right">
              <div className="group glass p-8 rounded-3xl text-center hover-lift border border-white/10">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                  {projects.length}+
                </div>
                <div className="text-gray-300 font-medium">
                  Projects Completed
                </div>
              </div>
              <div className="group glass p-8 rounded-3xl text-center hover-lift border border-white/10">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3 group-hover:scale-110 transition-transform">
                  {yearsOfExperience}+
                </div>
                <div className="text-gray-300 font-medium">
                  Years Experience
                </div>
              </div>
              <div className="group glass p-8 rounded-3xl text-center hover-lift border border-white/10">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-orange-400 mb-3 group-hover:scale-110 transition-transform">
                  {skills.length}+
                </div>
                <div className="text-gray-300 font-medium">Skills Mastered</div>
              </div>
              <div className="group glass p-8 rounded-3xl text-center hover-lift border border-white/10">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  100%
                </div>
                <div className="text-gray-300 font-medium">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Parallax */}
      <ParallaxSection speed={0.3} className="parallax-container">
        <section
          id="skills"
          className="py-24 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Skills
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
              <p className="text-gray-300 text-xl">
                Technologies and tools I work with
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {topSkills.map((skill, index) => {
                const percentage =
                  skill.level === "Advanced"
                    ? 90
                    : skill.level === "Intermediate"
                      ? 70
                      : 50;

                // Multicolor gradients for different skills
                const gradients = [
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-pink-500",
                  "from-[#DAA520] to-orange-500",
                  "from-green-500 to-emerald-500",
                  "from-red-500 to-orange-500",
                  "from-indigo-500 to-purple-500",
                  "from-pink-500 to-rose-500",
                  "from-cyan-500 to-blue-500",
                ];

                const iconGradients = [
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-pink-500",
                  "from-[#DAA520] to-orange-500",
                  "from-green-500 to-emerald-500",
                  "from-red-500 to-orange-500",
                  "from-indigo-500 to-purple-500",
                  "from-pink-500 to-rose-500",
                  "from-cyan-500 to-blue-500",
                ];

                const gradient = gradients[index % gradients.length];
                const iconGradient =
                  iconGradients[index % iconGradients.length];

                return (
                  <div
                    key={skill._id}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${iconGradient} rounded-lg flex items-center justify-center shadow-md`}
                        >
                          <span className="text-xl font-bold text-white">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {skill.category}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-bold text-lg bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                      >
                        {percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="mt-3 flex justify-end">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${skill.level === "Advanced"
                          ? "bg-green-100 text-green-700"
                          : skill.level === "Intermediate"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/skills"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              >
                View All Skills
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Projects Section */}
      <ParallaxSection speed={0.2} className="parallax-container">
        <section
          id="projects"
          className="py-24 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Projects
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
              <p className="text-gray-300 text-xl">Some of my recent work</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredProjects.map((project, index) => {
                // Multicolor gradients for projects
                const projectGradients = [
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-pink-500",
                  "from-[#DAA520] to-orange-500",
                  "from-green-500 to-emerald-500",
                  "from-red-500 to-rose-500",
                  "from-indigo-500 to-blue-500",
                ];

                const gradient =
                  projectGradients[index % projectGradients.length];

                return (
                  <div
                    key={project._id}
                    className="group glass rounded-3xl overflow-hidden hover-lift border border-white/10 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`h-56 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <span className="text-white text-7xl font-bold z-10 group-hover:scale-110 transition-transform">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    <div className="p-8">
                      <h3
                        className={`text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:bg-clip-text group-hover:text-transparent transition-colors`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-6 line-clamp-2 text-lg">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
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
                          <svg
                            className="w-5 h-5 group-hover/link:translate-x-1 transition-transform text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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

          </div>
        </section>
      </ParallaxSection>

      {/* Experience Section */}
      <ParallaxSection speed={0.1} className="parallax-container">
        <section
          id="experience"
          className="py-24 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Work{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Experience
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6 animate-scale-in"></div>
              <p className="text-gray-300 text-xl">My professional journey</p>
            </div>

            <div className="max-w-5xl mx-auto">
              {experiences.slice(0, 3).map((exp, index) => {
                const dotColors = [
                  "bg-gradient-to-br from-blue-500 to-cyan-500",
                  "bg-gradient-to-br from-purple-500 to-pink-500",
                  "bg-gradient-to-br from-[#DAA520] to-orange-500",
                ];

                const companyColors = [
                  "text-blue-400",
                  "text-purple-400",
                  "text-[#DAA520]",
                ];

                const dotColor = dotColors[index % dotColors.length];
                const companyColor =
                  companyColors[index % companyColors.length];

                return (
                  <div
                    key={exp._id}
                    className="relative pl-12 pb-16 border-l-2 border-white/10 last:border-l-0 last:pb-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`absolute -left-4 top-0 w-8 h-8 ${dotColor} rounded-full border-4 border-gray-900 shadow-2xl`}
                    ></div>

                    <div className="glass p-8 rounded-3xl hover-lift border border-white/10">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {exp.title}
                          </h3>
                          <p className={`text-xl ${companyColor} font-medium`}>
                            {exp.company}
                          </p>
                        </div>
                        {exp.isCurrent && (
                          <span className="px-6 py-3 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="text-gray-400 flex items-center gap-3 text-lg">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {new Date(exp.from).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}{" "}
                        -{" "}
                        {exp.isCurrent
                          ? "Present"
                          : exp.to
                            ? new Date(exp.to).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })
                            : "N/A"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {experiences.length > 3 && (
              <div className="text-center mt-16">
                <Link
                  href="/experiences"
                  className="group inline-flex items-center gap-3 glass hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-white/10 border-2 border-white/20 hover:scale-105"
                >
                  View All Experience
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your
            ideas to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="group bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start a Project
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <a
              href="#about"
              className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all border-2 border-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#DAA520] mb-4">
                {about?.name || "Portfolio"}
              </h3>
              <p className="text-gray-400">
                {about?.role || "Professional Developer"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="#home"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </a>
                <Link
                  href="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 {about?.name || "Portfolio"}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
