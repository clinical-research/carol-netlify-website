// Navbar3.jsx

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import logo from "../assets/logo.png";
import smalllogo from "../assets/slogo.png";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { FiList } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";

const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const tocRef = useRef(null);

  // Simplified navigation items without dropdown structure
  const navItems = [
    {
      name: "Home",
      icon: <IoHomeOutline className="text-white text-xl mr-2" />,
      sectionId: "home",
    },
    {
      name: "Solutions",
      icon: <FaRegLightbulb className="text-white text-xl mr-2" />,
      sectionId: "solutions",
    },
  ];

  // Define all page sections for the table of contents
  const pageSections = useMemo(
    () => [
      { id: "home", name: "Home" },
      { id: "about", name: "About" },
      { id: "our-vision", name: "Vision" },
      { id: "contact", name: "Contact" },
    ],
    []
  );

  // Shrink navbar & detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const secs = pageSections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean);
      const navH = document.querySelector("div.fixed")?.offsetHeight || 0;
      for (let i = secs.length - 1; i >= 0; i--) {
        if (secs[i].getBoundingClientRect().top <= navH + 100) {
          setActiveSection(secs[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageSections]);

  // Auto‑collapse TOC 1s after section change
  useEffect(() => {
    setTocCollapsed(false);
    const t = setTimeout(() => setTocCollapsed(true), 1000);
    return () => clearTimeout(t);
  }, [activeSection]);

  // GSAP animates exactly between your two Tailwind states
  useEffect(() => {
    const el = tocRef.current;
    if (!el) return;

    if (tocCollapsed) {
      // collapse back to the small circle
      gsap.to(el, {
        width: 40,
        height: 40,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // expand to fit the inner list
      gsap.fromTo(
        el,
        { width: 40, height: 40 },
        {
          width: el.scrollWidth,
          height: el.scrollHeight,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );
    }
  }, [tocCollapsed]);

  const scrollToSection = (sectionId, checkboxId = null) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    setIsOpen(false);
    const navH = document.querySelector("div.fixed")?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navH;
    window.scrollTo({ top, behavior: "smooth" });
    if (checkboxId) {
      setTimeout(() => {
        const cb = document.getElementById(checkboxId);
        if (cb) cb.checked = true;
      }, 500);
    }
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    // wire up later
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`flex fixed top-0 z-70 w-[100%] justify-center items-center md:rounded-b-xl rounded-b-none bg-gradient-to-r from-[#0f4563] to-[#1c7bae] transition-all duration-300 ${
          scrolled ? "h-[60px]" : "h-[80px]"
        }`}
      >
        <div className="flex w-full p-2 justify-between">
          <div className="flex w-full h-full items-center lg:px-7 px-5">
            <a href="/">
              {scrolled ? (
                <img
                  src={smalllogo}
                  alt="logo"
                  className="lg:w-[65px] w-[65px] transition-all duration-300 ease-in-out mb-4 p-1"
                />
              ) : (
                <img
                  src={logo}
                  alt="logo"
                  className="lg:w-[100px] w-[100px] transition-all duration-300 ease-in-out"
                />
              )}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex w-full justify-evenly items-center gap-10">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={() => scrollToSection(item.sectionId)}
              >
                <h1 className="text-white text-xl mx-1 font-bold whitespace-nowrap hover:text-yellow-200 hover:border-b-2 hover:border-white">
                  {item.name}
                </h1>
              </div>
            ))}

            <a href="/request-demo" onClick={handleDemoClick}>
              <div className="flex flex-col items-center cursor-pointer bg-blue-400 rounded-xl xl:p-2 p-1 transition-all duration-300 hover:scale-110">
                <h1 className="text-white text-lg mx-1 font-bold whitespace-nowrap hover:text-yellow-200">
                  Request A Demo
                </h1>
              </div>
            </a>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center pr-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <FiList className="w-6 h-6" />
              ) : (
                <BiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`flex justify-start md:hidden fixed w-full right-0 bg-opacity-70 bg-gradient-to-r from-[#0f4563] to-[#1c7bae] z-60 rounded-b-xl transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? (scrolled ? "top-[50px]" : "top-[60px]") + " translate-y-0"
            : "translate-y-[-200%]"
        }`}
      >
        <div className="flex flex-col items-start py-4 px-5 w-full">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="w-full"
              onClick={() => {
                scrollToSection(item.sectionId);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center my-2 cursor-pointer">
                {item.icon}
                <h1 className="text-white text-lg font-bold whitespace-nowrap">
                  {item.name}
                </h1>
              </div>
            </div>
          ))}

          <a href="/request-demo" className="w-full" onClick={handleDemoClick}>
            <div
              className="flex items-center bg-blue-400 rounded-xl px-2 my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlinePreview className="text-white text-xl mr-2" />
              <h1 className="text-white text-lg font-bold whitespace-nowrap">
                Request A Demo
              </h1>
            </div>
          </a>
        </div>
      </div>

      {/* Table of Contents with GSAP-enhanced animation */}
      <div
        ref={tocRef}
        className={`fixed right-[12px] top-[55%] transform -translate-y-1/2 z-50 ${
          tocCollapsed
            ? "bg-white rounded-full w-[40px] h-[40px]"
            : "justify-center items-center bg-white rounded-full"
        } overflow-hidden shadow-lg transition-all duration-300`}
      >
        {tocCollapsed ? (
          <button
            onClick={() => setTocCollapsed(false)}
            className="w-full h-full flex items-center justify-center text-[#0f4563] hover:bg-blue-50 transition-all"
          >
            <BiMenu className="text-xl" />
          </button>
        ) : (
          <div className="bg-transparent rounded-l-lg overflow-hidden w-auto toc-inner">
            <div className="flex justify-center">
              <ul className="space-y-2">
                {pageSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      title={section.name}
                      className={`flex justify-center items-center w-15 h-15 rounded-md transition-all duration-200 text-xs hover:scale-105 group ${
                        activeSection === section.id
                          ? "bg-blue-100 text-[#0f4563] font-bold"
                          : "text-gray-700 hover:text-[#0f4563]"
                      }`}
                    >
                      <span className="hidden group-hover:inline">
                        {section.name}
                      </span>
                      <span className="group-hover:hidden">
                        {activeSection === section.id ? section.name : "•"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar3;
