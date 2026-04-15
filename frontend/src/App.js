import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AboutPage from "./pages/about/About";
import ContactPage from "./pages/contact/Contact";
import PricingPage from "./pages/pricing/Pricing";
import FAQPage from "./pages/faq/Faq";
import CreatorsPage from "./pages/creators/CreatorsPage";
import FounderProfile from "./pages/founder/FounderProfile";
import FeaturesPage from "./pages/features/FeaturesPage";
import CaseStudiesPage from "./pages/case-studies/CaseStudiesPage";
import DocumentationPage from "./pages/documentation/DocumentationPage";
import APIReferencePage from "./pages/api-reference/APIReferencePage";
import CareersPage from "./pages/careers/CareersPage";
import LegalPage from "./pages/legal/LegalPage";
import CaseStudyDetail from "./pages/case-studies/CaseStudyDetail";

// admin
import AdminLayout from "./admin/pages/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Categories from "./admin/pages/Categories";
import Users from "./admin/pages/Users";
import ActivityLog from "./admin/pages/ActivityLog";
import Suppliers from "./admin/pages/Suppliers";
import Sales from "./admin/pages/Sales";
import Orders from "./admin/pages/Orders";
import StockTransactions from "./admin/pages/StockTransactions";
import Notifications from "./admin/pages/Notifications";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/team/:id" element={<FounderProfile />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-study/:id" element={<CaseStudyDetail />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/api-reference" element={<APIReferencePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="sales" element={<Sales />} />
          <Route path="orders" element={<Orders />} />
          <Route path="stock-transactions" element={<StockTransactions />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        
        {/* Dashboard alias for backward compatibility */}
        <Route path="/dashboard" element={<AdminLayout />}>
           <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
