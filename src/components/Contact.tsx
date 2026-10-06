import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { SocialIcon } from './SocialIcons';

interface SocialLink {
  name: string;
  handle: string;
  url: string;
}

interface ContactProps {
  socials: SocialLink[];
  email: string;
  location: string;
}

export const Contact: React.FC<ContactProps> = ({ socials, email, location }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Digital Marketing',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields before sending.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        service: 'Digital Marketing',
        message: ''
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden border-t border-[#360302]/70 text-white">
      {/* Ambient Burgundy Glow Background */}
      <div className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-[#360302]/35 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a85250] mb-3">
              <span>07 / Direct Inquiry</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              Let's Work Together
            </h2>

            <p className="mt-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              Ready to elevate your digital presence or launch your next high-converting project? Connect directly via social channels or share your project inquiry below.
            </p>

            {/* Quick Contact Details */}
            <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-950/80 border border-[#360302]/60 hover:border-[#520504] text-neutral-300 hover:text-white transition-all shadow-[0_0_15px_rgba(54,3,2,0.4)]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#360302] border border-[#520504] flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Email Address
                  </div>
                  <div className="text-sm font-medium text-white">
                    {email}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-950/80 border border-[#360302]/60 text-neutral-300">
                <div className="w-9 h-9 rounded-lg bg-[#360302] border border-[#520504] flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Global Availability
                  </div>
                  <div className="text-sm font-medium text-white">
                    {location}
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Social Media Channels (All 5 Links opening in new tabs) */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Verified Social Profiles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-[#360302] hover:border-[#520504] hover:bg-[#360302]/30 transition-all duration-300 shadow-[0_0_15px_rgba(54,3,2,0.5)] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#360302]/60 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <SocialIcon platform={social.name} className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-semibold text-white block">
                          {social.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {social.handle}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-[#360302] shadow-[0_20px_60px_-15px_rgba(54,3,2,0.85)]">
              {submitted ? (
                <div className="py-12 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-[#360302] border border-[#520504] flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(54,3,2,1)]">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto font-light leading-relaxed">
                    Thank you for reaching out! Noor Ul Ain will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 rounded-xl bg-black border border-[#360302] text-xs font-semibold text-white hover:bg-[#360302] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-[#360302]/60 border border-[#520504] text-xs text-white">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-[#360302] focus:border-[#520504] focus:ring-1 focus:ring-[#520504] text-sm text-white placeholder-neutral-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-[#360302] focus:border-[#520504] focus:ring-1 focus:ring-[#520504] text-sm text-white placeholder-neutral-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Interested In Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-[#360302] focus:border-[#520504] focus:ring-1 focus:ring-[#520504] text-sm text-white outline-none transition-all"
                    >
                      <option value="Digital Marketing">01 — Digital Marketing & Ad Scaling</option>
                      <option value="Graphic Design">02 — Graphic Design & Brand Identity</option>
                      <option value="Video Editing">03 — Commercial Video Editing & Reels</option>
                      <option value="Shopify Development">04 — Shopify Store Development</option>
                      <option value="Social Media Management">05 — Social Media Management</option>
                      <option value="Full Creative Retainer">06 — Full Creative Retainer Suite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Message / Project Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your brand goals, target timeline, or what you need created..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-[#360302] focus:border-[#520504] focus:ring-1 focus:ring-[#520504] text-sm text-white placeholder-neutral-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full group relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white bg-[#360302] hover:bg-[#480403] border border-[#520504] shadow-[0_0_35px_rgba(54,3,2,0.9)] hover:shadow-[0_0_50px_rgba(54,3,2,1)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 text-sm">
                      {submitting ? 'Sending Message...' : 'Send Message'}
                    </span>
                    <Send className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
