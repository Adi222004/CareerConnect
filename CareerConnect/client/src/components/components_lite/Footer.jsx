import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* Branding */}
        <h1 className="text-3xl font-extrabold">
          <span className="text-[#6B3AC2]">Career</span>
          <span className="text-[#FA4F09]">Connect</span>
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Connecting Talent with Opportunity
        </p>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 mt-5 text-sm">
          <Link
            to={"/PrivacyPolicy"}
            className="hover:text-[#FA4F09] transition-colors"
          >
            Privacy Policy
          </Link>

          <span>|</span>

          <Link
            to={"/TermsofService"}
            className="hover:text-[#FA4F09] transition-colors"
          >
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4">
          © 2025 CareerConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;