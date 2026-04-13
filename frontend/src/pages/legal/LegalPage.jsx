import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import MainLayout from "../../components/MainLayout";
import Breadcrumbs from "../../components/BreadCrumbs";

const privacySections = [
  {
    title: "1. Data Collection",
    icon: CheckCircle2,
    content: "We collect information you provide directly to us when you create an account, such as your name, business email, phone number, and store details. We also collect inventory data, transaction history, and employee logs necessary for the platform's core functionality."
  },
  {
    title: "2. User Information Usage",
    icon: Lock,
    content: "Your information is used to provide, maintain, and improve SmartSims services. This includes real-time branch synchronization, automated stock alerts, sales analytics generation, and providing customer support."
  },
  {
    title: "3. Security Practices",
    icon: Shield,
    content: "We employ industry-standard security measures including SSL/TLS encryption for all data in transit and AES-256 encryption for data at rest. Our multi-tenant architecture ensures your business data is strictly isolated from other users."
  },
  {
    title: "4. Cookies Usage",
    icon: Eye,
    content: "We use essential cookies to maintain your session and remember your preferences. Analytics cookies help us understand how users interact with our platform to improve the user experience."
  },
  {
    title: "5. Third Party Sharing",
    icon: FileText,
    content: "We do not sell your personal or business data. We only share information with trusted third-party providers (like payment processors or cloud hosting) necessary to deliver our services, under strict confidentiality agreements."
  },
  {
    title: "6. User Rights",
    icon: CheckCircle2,
    content: "You have the right to access, correct, or delete your data at any time through your dashboard. You can also export your inventory and sales data in various formats for your own records."
  },
  {
    title: "7. Contact for Privacy Concerns",
    icon: Shield,
    content: "If you have questions about this policy or how your data is handled, please reach out to our dedicated privacy team at privacy@smartsims.com."
  }
];

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    icon: CheckCircle2,
    content: "By accessing or using SmartSims, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, you are prohibited from using the platform."
  },
  {
    title: "2. User Responsibilities",
    icon: Lock,
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to use the platform only for lawful business purposes."
  },
  {
    title: "3. Payment Terms",
    icon: FileText,
    content: "Fees for our services are billed on a subscription basis. You agree to provide accurate billing information and authorize us to charge all accrued fees to your chosen payment method."
  },
  {
    title: "4. Subscription Policy",
    icon: Shield,
    content: "Subscriptions automatically renew unless cancelled. You can upgrade or downgrade your plan at any time, with price adjustments applied pro-rata to your next billing cycle."
  },
  {
    title: "5. Refund Policy",
    icon: CheckCircle2,
    content: "We offer a 14-day money-back guarantee for new subscriptions. After this period, fees are generally non-refundable, but we may consider exceptions on a case-by-case basis."
  },
  {
    title: "6. Account Suspension Rules",
    icon: Lock,
    content: "We reserve the right to suspend accounts that violate our terms, engage in fraudulent activity, or fail to settle outstanding balances after multiple notifications."
  },
  {
    title: "7. Termination Clauses",
    icon: FileText,
    content: "Either party may terminate the service at any time. Upon termination, your right to use the platform will immediately cease, and you will have 30 days to export your data."
  },
  {
    title: "8. Contact Information",
    icon: Shield,
    content: "For legal inquiries or formal notices, please contact us at legal@smartsims.com or through our registered business address."
  }
];

const LegalPage = ({ title }) => {
  const sections = title === "Privacy Policy" ? privacySections : termsSections;

  return (
    <MainLayout>
      <section className="bg-slate-50/30 pt-32 pb-40">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-24"
            >
              <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-200">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">{title}</h1>
              <div className="flex items-center justify-center gap-4 text-slate-500 font-bold">
                <span>Version 2.4</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Last updated: April 11, 2026</span>
              </div>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, i) => (
                <motion.section 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 lg:p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <section.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    {section.title}
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed pl-1">
                    {section.content}
                  </p>
                </motion.section>
              ))}

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-white mt-24 relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 max-w-2xl">
                  <h3 className="text-3xl font-black mb-6">Need a custom agreement?</h3>
                  <p className="text-xl text-slate-400 mb-10 leading-relaxed">For enterprise clients with specific compliance requirements (HIPAA, GDPR+, etc.), we offer custom Service Level Agreements.</p>
                  <div className="flex flex-wrap gap-6">
                    <button className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                      Contact Legal Team
                    </button>
                    <button className="px-10 py-5 bg-white/10 text-white rounded-[2rem] font-black text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                      Download PDF
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] -ml-32 -mb-32" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LegalPage;
