import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex h-fit w-full bg-gradient-to-r from-[#0f4563] to-[#1c7bae] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Carol</h3>
            <p className="text-blue-100 mb-4">
              Advanced Healthcare 4.0 with AI and Automation
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-blue-100">
              {/* <p>123 Main Street</p>
              <p>City, State 12345</p> */}
              <p>Email: info@carol.com</p>
              {/* <p>Phone: (123) 456-7890</p> */}
            </address>
          </div>

          {/* Social Media */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div> */}
        {/* About and Legal */}
        <div>
          <ul className="text-blue-100 space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/legal" className="hover:underline">
                Legal
              </a>
            </li>
          </ul>
        </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-50 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Carol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
