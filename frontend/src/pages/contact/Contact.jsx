import React from "react";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import { FiPhone, FiMail, FiMapPin, FiUser } from "react-icons/fi";
import CTATestimonial from "../shared/CTATestimonial";
import { motion } from "framer-motion";

const creators = [
  { name: "Gaurav Katiyar", role: "Team Lead / Full Stack Developer", phone: "+91 88765 43210" },
  { name: "Vamika Solanki", role: "Database Engineer", phone: "+91 87654 32109" },
  { name: "Uplaksh Rajoria", role: "Frontend Developer", phone: "+91 76543 21098" },
  { name: "Vanshika Gupta", role: "Product Designer / UI-UX", phone: "+91 65432 10987" },
];

const ContactPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto px-5 mt-25 pb-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="md:w-1/2">
            <motion.img
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full rounded-3xl shadow-2xl"
              src={images.HeroImage}
              alt="Inventory Management"
            />
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Contact Our Team</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We'd love to hear from you! If you have any questions, feedback,
                or inquiries, please feel free to reach out to our core team members directly.
              </p>

              <div className="space-y-6">
                {creators.map((creator, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <FiUser className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{creator.name}</h3>
                      <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">{creator.role}</p>
                      <div className="flex items-center text-slate-600 gap-2">
                        <FiPhone className="w-4 h-4" />
                        <span className="font-medium">{creator.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-blue-600 rounded-3xl text-white">
                <div className="flex items-center gap-4 mb-4">
                  <FiMail className="w-8 h-8" />
                  <div>
                    <h4 className="font-bold text-xl">Official Support</h4>
                    <p className="text-blue-100">support@smartsims.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiMapPin className="w-8 h-8" />
                  <div>
                    <h4 className="font-bold text-xl">Office Address</h4>
                    <p className="text-blue-100">123 Tech Park, Innovation Hub, New Delhi</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <CTATestimonial />
    </MainLayout>
  );
};

export default ContactPage;
