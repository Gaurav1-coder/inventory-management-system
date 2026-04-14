// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const faqData = [
  {
    question: "How do I get started with SmartSims?",
    answer: "Getting started is easy! Simply sign up for a free trial, and our setup wizard will guide you through importing your products, setting up your branches, and configuring your POS terminals."
  },
  {
    question: "Does it support multiple warehouse locations?",
    answer: "Yes, SmartSims is built for enterprise scalability. You can manage multiple stores and branches from a single dashboard, track inventory transfers between locations, and view location-specific analytics."
  },
  {
    question: "Can I use the POS system offline?",
    answer: "Our POS system is designed with an offline-first approach. You can continue to process sales even if your internet connection is interrupted. Once you're back online, all data will automatically sync with the cloud."
  },
  {
    question: "Is my data secure and backed up?",
    answer: "Absolutely. We use enterprise-grade encryption for all data transmissions and storage. Your inventory and sales data are backed up daily across multiple secure cloud regions."
  },
  {
    question: "What hardware is compatible with the POS?",
    answer: "SmartSims works on any modern web browser. It is compatible with standard barcode scanners, receipt printers, and cash drawers. We also offer native apps for Windows, macOS, and Android for a more integrated experience."
  }
];

const AccordionItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${
      isOpen ? "border-blue-200 bg-blue-50/30 shadow-lg shadow-blue-100/50" : "border-slate-100 bg-white"
    }`}>
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50/50"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? "text-blue-700" : "text-slate-900"}`}>
          {question}
        </span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
          isOpen ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
        }`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-blue-100/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaq = faqData.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <section className="bg-slate-50 pt-32 pb-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar / Info */}
            <div className="lg:w-1/3 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                  Help Center
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Frequently Asked <br />
                  <span className="text-blue-600">Questions</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                  Everything you need to know about SmartSims. Can't find the answer you're looking for? 
                  Our support team is here to help.
                </p>

                <div className="relative mb-10">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    We're here to help you get the most out of SmartSims. 
                    Contact our support team for any specific queries.
                  </p>
                  <Link 
                    to="/contact"
                    className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                  >
                    Contact Support
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Accordion List */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {filteredFaq.length > 0 ? (
                  filteredFaq.map((item, index) => (
                    <AccordionItem
                      key={index}
                      {...item}
                      isOpen={openIndex === index}
                      toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                    />
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">No questions found matching your search.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQPage;

