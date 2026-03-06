"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      console.log("📤 Sending message to:", `${API_URL}/contact`);
      console.log("📝 Form data:", form);

      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log("📊 Response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Success:", data);
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const data = await res.json();
        console.error("❌ Error:", data);
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("💥 Error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      </div>

      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">
              <a href="/" className="hover:text-amber-400 transition-colors">Tesfaye Eshatu</a>
            </h1>
            <div className="hidden md:flex gap-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors font-medium">About</a>
              <a href="/skills" className="text-gray-300 hover:text-white transition-colors font-medium">Skills</a>
              <a href="/projects" className="text-gray-300 hover:text-white transition-colors font-medium">Projects</a>
              <a href="/experience" className="text-gray-300 hover:text-white transition-colors font-medium">Experience</a>
              <a href="/contact" className="text-amber-400 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 mb-6 animate-gradient">
            Get In Touch
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto rounded-full animate-scale-in"></div>
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="glass p-8 rounded-3xl border border-white/10 backdrop-blur-md hover-lift">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-3xl">📧</span>
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-300">tesfayeeshatu5@gmail.com</p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Location</h3>
                    <p className="text-gray-300">Ethiopia, Harar</p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-300">+2 (519) 245-84409</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-8 rounded-3xl border border-white/10 backdrop-blur-md hover-lift">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🌐</span>
                Follow Me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Hope1321"
                  className="group bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all hover:scale-110 border border-white/10 hover-glow"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all hover:scale-110 border border-white/10 hover-glow"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/Hope_Software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all hover:scale-110 border border-white/10 hover-glow"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-slide-in-right">
            <div className="glass p-10 rounded-3xl border border-white/10 backdrop-blur-md hover-lift">
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 mb-8 animate-gradient">
                Send Message
              </h3>

              {/* Status Messages */}
              {status === "success" && (
                <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl backdrop-blur-sm animate-fade-in-up">
                  <div className="flex items-center gap-3 text-green-300">
                    <div className="bg-green-500/20 p-2 rounded-xl">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400">Message Sent Successfully!</h4>
                      <p className="text-green-300">I'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm animate-fade-in-up">
                  <div className="flex items-center gap-3 text-red-300">
                    <div className="bg-red-500/20 p-2 rounded-xl">
                      <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-400">Error Sending Message</h4>
                      <p className="text-red-300">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="relative">
                  <label className={`block text-sm font-medium mb-3 transition-colors ${focusedField === 'name' ? 'text-amber-400' : 'text-gray-300'
                    }`}>
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-6 py-4 bg-white/10 border rounded-2xl outline-none transition-all placeholder-gray-400 text-white backdrop-blur-sm ${focusedField === 'name'
                          ? 'border-amber-400 ring-2 ring-amber-400/30'
                          : 'border-white/20 hover:border-white/30'
                        }`}
                      placeholder="John Doe"
                    />
                    {focusedField === 'name' && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className={`block text-sm font-medium mb-3 transition-colors ${focusedField === 'email' ? 'text-amber-400' : 'text-gray-300'
                    }`}>
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-6 py-4 bg-white/10 border rounded-2xl outline-none transition-all placeholder-gray-400 text-white backdrop-blur-sm ${focusedField === 'email'
                          ? 'border-amber-400 ring-2 ring-amber-400/30'
                          : 'border-white/20 hover:border-white/30'
                        }`}
                      placeholder="john@example.com"
                    />
                    {focusedField === 'email' && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className={`block text-sm font-medium mb-3 transition-colors ${focusedField === 'message' ? 'text-amber-400' : 'text-gray-300'
                    }`}>
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      className={`w-full px-6 py-4 bg-white/10 border rounded-2xl outline-none transition-all placeholder-gray-400 text-white backdrop-blur-sm resize-none ${focusedField === 'message'
                          ? 'border-amber-400 ring-2 ring-amber-400/30'
                          : 'border-white/20 hover:border-white/30'
                        }`}
                      placeholder="Tell me about your project or inquiry..."
                    />
                    {focusedField === 'message' && (
                      <div className="absolute right-4 top-6">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-400">{form.message.length} characters</p>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">Professional</span>
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">Friendly</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-2xl hover:shadow-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="glass border-t border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">© 2026 Tesfaye Eshatu. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy</a>
              <a href="/" className="text-gray-400 hover:text-amber-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
