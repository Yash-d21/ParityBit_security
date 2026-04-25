import React, { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending message...");
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Convert to JSON
    const object = Object.fromEntries(formData);
    object.access_key = "220d7158-164a-4569-8b44-52c718f29294";
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const data = await response.json();
      if (data.success) {
        setResult("Message sent successfully! We'll be in touch.");
        form.reset();
      } else {
        setResult("Error: " + (data.message || "Failed to send message."));
      }
    } catch (error) {
      setResult("Error: Connection lost. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 8000); // Clear message after 8 seconds to ensure visibility
    }
  };

  return (
    <section id="contact" className="relative z-20 py-24 md:py-32 px-6 md:px-12 bg-transparent border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8A2BE2]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Info */}
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Secure Comm Channel
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
              Let's secure your<br />digital frontier.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg">
              Whether you need an urgent incident response or a comprehensive security overhaul, our experts are standing by. Reach out via our secure channels below.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8A2BE2] group-hover:bg-[#8A2BE2]/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Encrypted Email</p>
                  <a href="mailto:contact@paritybitsecurity.com" className="text-gray-400 hover:text-[#8A2BE2] transition-colors">contact@paritybitsecurity.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8A2BE2] group-hover:bg-[#8A2BE2]/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Direct Line (24/7 Support)</p>
                  <a href="tel:+12049637230" className="text-gray-400 hover:text-[#8A2BE2] transition-colors">+1 (204) 963-7230</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8A2BE2] group-hover:bg-[#8A2BE2]/10 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Headquarters</p>
                  <p className="text-gray-400">Global Cyber Defense Center<br />Available for on-site audits worldwide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-8 md:p-12 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <form className="relative z-10 flex flex-col gap-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">First Name</label>
                  <input type="text" name="first_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all" placeholder="John" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input type="text" name="last_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Corporate Email</label>
                <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all" placeholder="john@company.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                <select name="subject" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all appearance-none cursor-pointer">
                  <option className="bg-[#0a0a0a] text-white">General Inquiry</option>
                  <option className="bg-[#0a0a0a] text-white">Incident Response (URGENT)</option>
                  <option className="bg-[#0a0a0a] text-white">VAPT & Auditing</option>
                  <option className="bg-[#0a0a0a] text-white">Product Demo (Parity OS)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea rows={4} name="message" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all resize-none" placeholder="Tell us about your security needs..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-4 w-full bg-[#8A2BE2] hover:bg-[#7e22ce] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
              </button>
              
              {result && (
                <div className={`mt-2 text-center text-sm ${result.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                  {result}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
