import { Facebook, Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import Ball from '../canvas/Ball';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 relative">
      <div className="w-full min-h-[60vh] md:min-h-[80vh] bg-gradient-to-r from-black to-gray-500 px-4 sm:px-6 md:px-9">
        {/* Ball 3D Component */}
        <div className="absolute inset-0 z-10">
          <Ball />
        </div>

        {/* Branding Text */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full h-full relative z-20 px-4 sm:px-8 pt-20">
          <div className="text-left text-white absolute -bottom-[49vh] left-1 md:top-2 md:left-1 lg:top-10 lg:left-10">
            <h2 className="text-xl md:text-4xl font-bold">
              QUICK<span className="text-[var(--primary-color)]">JOBS</span>
            </h2>
            <p className="text-sm sm:text-md mt-2">
              © 2025 Your Company. All rights reserved.
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 absolute bottom-6 right-4 sm:right-10 z-30">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary-color)] transition"
            aria-label="Facebook"
          >
            <Facebook size={28} color="white" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary-color)] transition"
            aria-label="Twitter"
          >
            <Twitter size={28} color="white" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary-color)] transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} color="white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
