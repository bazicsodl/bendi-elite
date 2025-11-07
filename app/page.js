"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteState, setQuoteState] = useState({ loading: false, submitted: false, error: null });
  const [messageState, setMessageState] = useState({ loading: false, submitted: false, error: null });
  const [scrollY, setScrollY] = useState(0);
    const videos = [
    "/const1.mp4",
    "/farm1.mp4",
    "/const2.mp4",
    "/farm2.mp4"
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000); // change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function postToFormspree(payload) {
    const res = await fetch("https://formspree.io/f/mgvpgdjp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res;
  }

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteState({ loading: true, submitted: false, error: null });
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());
    
    if (payload._honey) {
      setQuoteState({ loading: false, submitted: true, error: null });
      return;
    }

    try {
      const res = await postToFormspree(payload);
      if (res.ok) {
        setQuoteState({ loading: false, submitted: true, error: null });
        e.target.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setQuoteState({ loading: false, submitted: false, error: json.error || 'Submission failed' });
      }
    } catch (err) {
      setQuoteState({ loading: false, submitted: false, error: err.message });
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setMessageState({ loading: true, submitted: false, error: null });
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());
    if (payload._honey) {
      setMessageState({ loading: false, submitted: true, error: null });
      return;
    }

    try {
      const res = await postToFormspree(payload);
      if (res.ok) {
        setMessageState({ loading: false, submitted: true, error: null });
        e.target.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setMessageState({ loading: false, submitted: false, error: json.error || 'Submission failed' });
      }
    } catch (err) {
      setMessageState({ loading: false, submitted: false, error: err.message });
    }
  };

  return (
    <div className="font-sans bg-black text-gray-800 overflow-x-hidden">
      {/* Premium Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="backdrop-blur-sm bg-[rgba(10,42,67,0.55)] py-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F1A100] rounded-full flex items-center justify-center shadow-inner">
                <span className="font-bold text-[#0A2A43] text-sm">BE</span>
              </div>
              <h1 className="text-lg md:text-xl font-semibold tracking-wide text-white">Bendi Elite Services</h1>
            </div>

            <nav className="hidden md:flex gap-8 text-sm text-gray-100">
              <a href="#about" className="hover:text-[#F1A100] transition">About</a>
              <a href="#sectors" className="hover:text-[#F1A100] transition">Sectors</a>
              <a href="#quote" className="hover:text-[#F1A100] transition">Request Quote</a>
              <a href="#contact" className="hover:text-[#F1A100] transition">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <a href="#quote" className="hidden md:inline-block bg-[#F1A100] text-[#0A2A43] px-4 py-2 rounded-md font-semibold">Request Quote</a>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-white">{menuOpen ? '✕' : '☰'}</button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-[#0A2A43]/95 text-white px-6 py-4">
              <nav className="flex flex-col gap-3">
                <a href="#about" className="py-2">About</a>
                <a href="#sectors" className="py-2">Sectors</a>
                <a href="#quote" className="py-2">Request Quote</a>
                <a href="#contact" className="py-2">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="pt-24">
        {/* HERO with background video */}
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        ref={videoRef}
        key={currentVideo} // forces React to re-render video frame
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

          <div className="absolute inset-0 bg-gradient-to-t from-[#031427]/80 via-[#031427]/40 to-transparent"></div>

          <div className="relative z-10 max-w-5xl px-6">
            <div className="inline-block mb-4 px-4 py-1 bg-[#F1A100] text-[#0A2A43] text-sm font-semibold rounded-full">Trusted Industrial Supplier</div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "Merriweather, serif", color: "#F8FAFC" }}>
              Supplying <span className="text-[#F1A100]">Quality</span>. Delivering <span className="text-[#F1A100]">Trust</span>.
            </h2>
            <p className="mt-6 text-gray-200 max-w-3xl mx-auto text-lg md:text-xl">Premium procurement and supply solutions across Agriculture, Construction, Corporate Procurement and Government contracts.</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#quote" className="inline-flex items-center gap-3 bg-[#F1A100] text-[#0A2A43] px-6 py-3 rounded-md font-semibold shadow-lg">Request a Quote</a>
              <a href="#about" className="inline-flex items-center gap-3 border border-white/30 text-white px-6 py-3 rounded-md font-medium">Learn More</a>
            </div>
          </div>
        </section>

        {/* ABOUT - Premium Showcase */}
        <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50/80 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#F1A100] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0A2A43] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                {/* Section Header */}
                <div className="mb-8">
                  <div className="text-sm font-bold text-[#F1A100] uppercase tracking-wider mb-2">About Us</div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#0A2A43] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Industrial Excellence <span className="text-[#F1A100]">Since 2012</span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Bendi Elite Services stands as Nigeria's premier industrial procurement partner, delivering unmatched quality and reliability across multiple sectors with over a decade of trusted service.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Quality Assurance', desc: 'ISO-certified supply chain with rigorous quality checks' },
                    { title: 'Timely Delivery', desc: 'Nationwide logistics network with real-time tracking' },
                    { title: 'Competitive Pricing', desc: 'Transparent quotes with volume-based discounts' },
                    { title: 'Expert Support', desc: '24/7 dedicated account management and technical support' }
                  ].map((feature, index) => (
                    <div key={feature.title} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F1A100] to-[#ffb82b] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Showcase */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Trusted Partners', color: 'from-[#0A2A43] to-[#0d3555]' },
                    { title: 'Nationwide Reach', color: 'from-[#F1A100] to-[#ffb82b]' },
                    { title: 'Quality Focus', color: 'from-[#F1A100] to-[#ffb82b]' },
                    { title: 'Client First', color: 'from-[#0A2A43] to-[#0d3555]' }
                  ].map((card, index) => (
                    <div 
                      key={card.title}
                      className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white transform hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl ${
                        card.color.includes('F1A100') ? 'text-[#0A2A43]' : 'text-white'
                      }`}
                    >
                      <h3 className="font-black text-lg mb-2">{card.title}</h3>
                      <p className="text-sm opacity-90">Premium service delivery</p>
                    </div>
                  ))}
                </div>
                
                {/* Floating Element */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#F1A100] to-[#ffb82b] rounded-2xl rotate-12 opacity-20 animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#0A2A43] to-[#0d3555] rounded-2xl -rotate-12 opacity-20 animate-float-reverse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTORS - Premium Cards */}
        <section id="sectors" className="py-24 bg-gradient-to-b from-gray-50/80 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="text-sm font-bold text-[#F1A100] uppercase tracking-wider mb-2">Our Expertise</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0A2A43] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Industries We <span className="text-[#F1A100]">Serve</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive supply chain solutions tailored to your industry's unique requirements
              </p>
            </div>

            {/* Sectors Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Agriculture Supply',
                  icon: '🌿',
                  gradient: 'from-orange-500/20 to-red-600/20',
                  border: 'border-orange-200',
                  items: ['Fertilizers & Chemicals', 'Animal Feeds', 'Farm Equipment', 'Seedlings & Crops'],
                  stats: '200+ Projects'
                },
                {
                  title: 'Construction Materials',
                  icon: '🏗️',
                  gradient: 'from-orange-500/20 to-red-600/20',
                  border: 'border-orange-200',
                  items: ['Cement & Aggregates', 'Steel & Reinforcement', 'Roofing Materials', 'Heavy Machinery'],
                  stats: '150+ Projects'
                },
                {
                  title: 'Corporate Procurement',
                  icon: '🏢',
                  gradient: 'from-orange-500/20 to-red-600/20',
                  border: 'border-orange-200',
                  items: ['Office Supplies', 'Facility Materials', 'Bulk Procurement', 'Government Contracts'],
                  stats: '100+ Partners'
                }
              ].map((sector, index) => (
                <div 
                  key={sector.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 transform hover:-translate-y-4 transition-all duration-500"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0A2A43] to-[#0d3555] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                      {sector.icon}
                    </div>
                    <div className="text-sm font-bold text-[#F1A100] bg-[#F1A100]/10 px-3 py-1 rounded-full">
                      {sector.stats}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-[#0A2A43] mb-4">{sector.title}</h3>
                  
                  <ul className="space-y-3 mb-6">
                    {sector.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-[#F1A100] rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Premium solutions</span>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F1A100] to-[#ffb82b] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      →
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${sector.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE FORM - Luxury Experience */}
        <section id="quote" className="py-24 bg-gradient-to-br from-[#0A2A43] via-[#0d3555] to-[#031427] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#F1A100]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F1A100]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#F1A100] to-[#ffb82b] p-8 text-center">
                <h3 className="text-3xl font-black text-[#0A2A43] mb-2">REQUEST A QUOTE</h3>
                <p className="text-[#0A2A43]/80 font-medium">Get premium pricing for your project requirements</p>
              </div>

              {/* Form Content */}
              <div className="p-8 md:p-12">
                {quoteState.submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
                        ✓
                      </div>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2">Thank You!</h4>
                    <p className="text-gray-300">Our team will contact you within 24 hours with a detailed quote.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="grid md:grid-cols-2 gap-8">
                    {/* Honeypot */}
                    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-semibold mb-3">Company Information</label>
                        <input 
                          name="company" 
                          required 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 outline-none focus:bg-white/10 focus:border-[#F1A100]/50 transition-all duration-300"
                          placeholder="Company Name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          name="contact_person" 
                          required 
                          className="bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 outline-none focus:bg-white/10 focus:border-[#F1A100]/50 transition-all duration-300"
                          placeholder="Contact Person"
                        />
                        <input 
                          name="phone"
                          className="bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 outline-none focus:bg-white/10 focus:border-[#F1A100]/50 transition-all duration-300"
                          placeholder="Phone Number"
                        />
                      </div>

                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 outline-none focus:bg-white/10 focus:border-[#F1A100]/50 transition-all duration-300"
                        placeholder="Email Address"
                      />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-semibold mb-3">Project Details</label>
                        <select 
                          name="industry" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:bg-white/10 focus:border-[#F1A100]/50 transition-all duration-300"
                        >
                          <option className="bg-[#0A2A43]">Select Industry</option>
                          <option className="bg-[#0A2A43]">Agriculture</option>
                          <option className="bg-[#0A2A43]">Construction</option>
                          <option className="bg-[#0A2A43]">Corporate</option>
                          <option className="bg-[#0A2A43]">Government</option>
                        </select>
                      </div>

                      <div>
                        <textarea 
                          name="requirements" 
                          rows={6}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 outline-none focus:bg-white/10 focus:border-[#F1A100]/50 transition-all duration-300 resize-none"
                          placeholder="Detailed project requirements, quantities, and timeline..."
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={quoteState.loading}
                        className="w-full bg-gradient-to-r from-[#F1A100] to-[#ffb82b] text-[#0A2A43] py-4 rounded-xl font-black text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none transition-all duration-300"
                      >
                        {quoteState.loading ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-[#0A2A43] border-t-transparent rounded-full animate-spin"></div>
                            PROCESSING...
                          </div>
                        ) : (
                          'GET PREMIUM QUOTE'
                        )}
                      </button>

                      {quoteState.error && (
                        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
                          {quoteState.error}
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT - Premium Layout */}
        <section id="contact" className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Information */}
              <div>
                <div className="mb-12">
                  <div className="text-sm font-bold text-[#F1A100] uppercase tracking-wider mb-2">Contact Us</div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#0A2A43] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Let's Start Your <span className="text-[#F1A100]">Project</span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    Ready to discuss your industrial procurement needs? Our expert team is here to help.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  {[
                    { icon: '📍', title: 'Our Office', detail: 'Lagos, Nigeria', desc: 'Main headquarters' },
                    { icon: '📞', title: 'Phone', detail: '+234 800 000 0000', desc: 'Mon-Fri, 8AM-6PM' },
                    { icon: '✉️', title: 'Email', detail: 'sales@bendi-elite.com', desc: 'Quick response guaranteed' },
                    { icon: '🕒', title: 'Support', detail: '24/7 Available', desc: 'Emergency procurement' }
                  ].map((contact, index) => (
                    <div key={contact.title} className="flex items-center gap-6 p-6 bg-gray-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#F1A100] to-[#ffb82b] rounded-2xl flex items-center justify-center text-2xl text-[#0A2A43]">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="font-black text-gray-900 mb-1">{contact.title}</div>
                        <div className="text-lg text-[#0A2A43] font-semibold mb-1">{contact.detail}</div>
                        <div className="text-sm text-gray-500">{contact.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="mt-12 p-6 bg-gradient-to-r from-[#0A2A43] to-[#0d3555] rounded-2xl text-white">
                  <div className="text-sm font-semibold opacity-80 mb-2">TRUSTED BY INDUSTRY LEADERS</div>
                  <div className="flex items-center gap-8 opacity-60">
                    <div>Company A</div>
                    <div>Company B</div>
                    <div>Company C</div>
                    <div>Company D</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
                <h3 className="text-2xl font-black text-[#0A2A43] mb-2">Send us a message</h3>
                <p className="text-gray-600 mb-8">We'll get back to you within hours</p>

                {messageState.submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
                        ✓
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">We'll contact you shortly to discuss your requirements.</p>
                  </div>
                ) : (
                  <form onSubmit={handleMessageSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input 
                        name="name" 
                        required 
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:border-[#F1A100] focus:ring-2 focus:ring-[#F1A100]/20 transition-all duration-300"
                        placeholder="Your Name"
                      />
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:border-[#F1A100] focus:ring-2 focus:ring-[#F1A100]/20 transition-all duration-300"
                        placeholder="Your Email"
                      />
                    </div>

                    <input 
                      name="subject"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:border-[#F1A100] focus:ring-2 focus:ring-[#F1A100]/20 transition-all duration-300"
                      placeholder="Subject"
                    />

                    <textarea 
                      name="message" 
                      required 
                      rows={6}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:bg-white focus:border-[#F1A100] focus:ring-2 focus:ring-[#F1A100]/20 transition-all duration-300 resize-none"
                      placeholder="Your message..."
                    ></textarea>

                    <div className="flex gap-4">
                      <button 
                        type="submit"
                        disabled={messageState.loading}
                        className="flex-1 bg-gradient-to-r from-[#F1A100] to-[#ffb82b] text-[#0A2A43] py-4 rounded-xl font-black hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none transition-all duration-300"
                      >
                        {messageState.loading ? 'SENDING...' : 'SEND MESSAGE'}
                      </button>
                      <a 
                        href="https://wa.me/2349130021015" 
                        className="flex items-center gap-2 bg-green-500 text-white px-6 py-4 rounded-xl font-black hover:bg-green-600 transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {messageState.error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        {messageState.error}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER - Premium Design */}
      <footer className="bg-gradient-to-br from-[#0A2A43] to-[#031427] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#F1A100] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F1A100] to-[#ffb82b] rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="font-black text-[#0A2A43] text-lg">BE</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black">BENDI ELITE</div>
                    <div className="text-sm text-gray-400 font-medium">INDUSTRIAL SOLUTIONS</div>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Nigeria's premier industrial procurement partner, delivering excellence across agriculture, construction, and corporate sectors since 2012.
                </p>
                <div className="flex gap-4">
                  {['f', 'in', 't'].map((social, index) => (
                    <a 
                      key={social}
                      href="#" 
                      className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#F1A100] hover:text-[#0A2A43] transition-all duration-300 backdrop-blur-sm"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-black text-lg mb-6">Quick Links</h4>
                <ul className="space-y-3 text-gray-400">
                  {['About', 'Sectors', 'Services', 'Projects', 'Contact'].map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase()}`} className="hover:text-[#F1A100] transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-black text-lg mb-6">Our Services</h4>
                <ul className="space-y-3 text-gray-400">
                  {[
                    'Agriculture Supply',
                    'Construction Materials', 
                    'Corporate Procurement',
                    'Government Contracts',
                    'Bulk Procurement'
                  ].map((service) => (
                    <li key={service} className="hover:text-[#F1A100] transition-colors duration-300">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Bendi Elite Services. All rights reserved.
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-[#F1A100] transition-colors duration-300">Privacy Policy</a>
                  <a href="#" className="hover:text-[#F1A100] transition-colors duration-300">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}