import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "What makes ParityBit different?",
    answer: "We blend elite, CREST-certified human intelligence with autonomous AI orchestration. We provide continuous monitoring, actionable remediation, and guaranteed threat isolation.",
  },
  {
    question: "Do you provide emergency response?",
    answer: "Yes, our Zero-Day Response Team is available 24/7/365. For critical breaches, we guarantee a 15-minute SLA to engage and begin containment procedures.",
  },
  {
    question: "How does the SIEM deployment work?",
    answer: "Our deployment is seamless and non-disruptive. We use lightweight agents to aggregate logs across your on-premise and cloud environments in under 48 hours.",
  },
  {
    question: "Can you help with SOC 2 compliance?",
    answer: "Absolutely. We guide you through gap analysis, policy creation, control implementation, and final audit preparation, cutting the certification timeline significantly.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer tailored, transparent pricing ranging from project-based engagements (like a single VAPT audit) to Retained Security Services for continuous protection.",
  }
];

export const SupportSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending message...");
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
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
      setTimeout(() => setResult(""), 8000);
    }
  };

  return (
    <section id="support" className="relative z-20 py-24 md:py-32 px-6 md:px-12 bg-transparent border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8A2BE2]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="mb-16 text-center">
          <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">Support & Inquiries</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            We're here to <span className="text-gray-600">secure your operations.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT SIDE: Contact Us */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Secure Comm Channel
              </h2>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
                Let's secure your digital frontier.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Whether you need urgent incident response or a comprehensive security overhaul, our experts are standing by.
              </p>
              

            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              <form className="relative z-10 flex flex-col gap-5" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">First Name</label>
                    <input type="text" name="first_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Last Name</label>
                    <input type="text" name="last_name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Corporate Email</label>
                  <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all" placeholder="john@company.com" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                  <select name="subject" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all appearance-none cursor-pointer">
                    <option className="bg-[#0a0a0a] text-white">General Inquiry</option>
                    <option className="bg-[#0a0a0a] text-white">Incident Response (URGENT)</option>
                    <option className="bg-[#0a0a0a] text-white">VAPT & Auditing</option>
                    <option className="bg-[#0a0a0a] text-white">Product Demo (Parity OS)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                  <textarea rows={3} name="message" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]/50 focus:border-[#8A2BE2] transition-all resize-none" placeholder="Tell us about your security needs..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="mt-2 w-full bg-[#8A2BE2] hover:bg-[#7e22ce] text-white text-sm font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed">
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

          {/* RIGHT SIDE: FAQ */}
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">Knowledge Base</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-8">
              Frequently Asked Questions
            </h3>
            
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "border border-white/5 rounded-2xl overflow-hidden transition-all duration-500",
                      isOpen ? "bg-white/[0.05] shadow-[0_0_30px_rgba(138,43,226,0.1)]" : "bg-[#0a0a0a] hover:bg-white/[0.02]"
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                    >
                      <span className={cn(
                        "text-base md:text-lg font-semibold transition-colors duration-300 pr-4",
                        isOpen ? "text-white" : "text-gray-300"
                      )}>
                        {faq.question}
                      </span>
                      <div className={cn(
                        "w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-500",
                        isOpen ? "rotate-180 bg-[#8A2BE2]/20 border-[#8A2BE2]/50 text-[#8A2BE2]" : "text-gray-400"
                      )}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="p-5 md:p-6 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
