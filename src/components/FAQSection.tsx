import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "What makes ParityBit different from other security firms?",
    answer: "We blend elite, CREST-certified human intelligence with autonomous AI orchestration. Unlike traditional firms that hand you a PDF report and leave, we provide continuous monitoring, actionable remediation, and guaranteed threat isolation.",
  },
  {
    question: "Do you provide emergency incident response services?",
    answer: "Yes, our Zero-Day Response Team is available 24/7/365. For critical breaches, we guarantee a 15-minute SLA to engage and begin containment procedures, regardless of your time zone or location.",
  },
  {
    question: "How does the VECTOR SIEM deployment work?",
    answer: "Our deployment is seamless and non-disruptive. We use lightweight, intelligent agents to aggregate logs across your on-premise and cloud environments. Typical deployment takes less than 48 hours, providing immediate visibility.",
  },
  {
    question: "Can you help us achieve SOC 2 or ISO 27001 compliance?",
    answer: "Absolutely. Our Compliance & Risk module is designed specifically for this. We guide you through gap analysis, policy creation, control implementation, and final audit preparation, cutting the certification timeline by up to 50%.",
  },
  {
    question: "What is the pricing model for your services?",
    answer: "We offer tailored, transparent pricing. Depending on your needs, you can opt for project-based engagements (like a single VAPT audit) or our comprehensive Retained Security Services model for continuous, all-inclusive protection.",
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 bg-transparent border-t border-white/5">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">Knowledge Base</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Frequently Asked <span className="text-gray-600">Questions</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
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
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={cn(
                    "text-lg md:text-xl font-semibold transition-colors duration-300",
                    isOpen ? "text-white" : "text-gray-300"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-500",
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
                  <div className="p-6 md:p-8 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
