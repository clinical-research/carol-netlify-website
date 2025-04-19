import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

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
  // Memoize the array to prevent recreation on each render
  const pageSections = useMemo(
    () => [
      { id: "home", name: "Home" },
      { id: "about", name: "About" },
      { id: "our-vision", name: "Vision" },
      { id: "mission", name: "Mission" },
      { id: "contact", name: "Contact" },
    ],
    []
  ); // Empty dependency array means this only runs once

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine which section is currently in view
      const sections = pageSections.map((section) =>
        document.getElementById(section.id)
      );
      const validSections = sections.filter(Boolean); // Filter out any null elements

      if (validSections.length > 0) {
        const navbarHeight =
          document.querySelector("div.fixed")?.offsetHeight || 0;

        // Find the section that's currently visible in the viewport
        for (let i = validSections.length - 1; i >= 0; i--) {
          const section = validSections[i];
          const rect = section.getBoundingClientRect();

          if (rect.top <= navbarHeight + 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageSections]);

  // Add new useEffect for TOC collapse behavior
  useEffect(() => {
    // Expand TOC when section changes
    setTocCollapsed(false);

    // Create a timer to collapse TOC after 3 seconds
    const collapseTimer = setTimeout(() => {
      setTocCollapsed(true);
    }, 1000);

    // Clear the timer when component unmounts or section changes
    return () => clearTimeout(collapseTimer);
  }, [activeSection]);

  // Enhanced scrollToSection that accounts for the fixed navbar's height
  const scrollToSection = (sectionId, checkboxId = null) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsOpen(false);
      // Get the current navbar height from the fixed div
      const navbar = document.querySelector("div.fixed");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      // If a checkbox ID is provided, check that checkbox
      if (checkboxId) {
        setTimeout(() => {
          const checkbox = document.getElementById(checkboxId);
          if (checkbox) {
            checkbox.checked = true;
          }
        }, 500); // Small delay to ensure the section is loaded
      }
    }
  };

  // Add new function to handle demo button click
  const handleDemoClick = (e) => {
    e.preventDefault();
    scrollToSection("contact", "requestDemo");
  };

  return (
    <>
      <div
        className={`flex fixed top-0 z-70 w-[100%] justify-center items-center md:rounded-b-xl rounded-b-none bg-gradient-to-r from-[#0f4563] to-[#1c7bae] transition-all duration-300 ${
          scrolled ? "h-[60px]" : "h-[80px]"
        }`}
      >
        <div className="flex w-full p-2 justify-between">
          <div className="flex w-full h-full items-center px-5">
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
          <div className="hidden md:flex w-full space-x-20 justify-end items-center mr-10">
            {/* Map over navItems to create desktop navigation tabs */}
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={() => scrollToSection(item.sectionId)}
              >
                <div className="flex text-xl items-center">
                  <h1 className="text-white mx-1 font-bold whitespace-nowrap hover:text-[#83d1f2] hover:border-b-2 hover:border-white">
                    {item.name}
                  </h1>
                </div>
              </div>
            ))}

            {/* Request Demo Button */}
            <a href="/request-demo" onClick={handleDemoClick}>
              <div className="flex flex-col items-center cursor-pointer text-white bg-blue-400 hover:bg-white hover:text-[#276a87] rounded-xl xl:p-3 p-1 transition-all duration-300 hover:scale-110">
                <h1 className=" text-lg mx-1 font-bold whitespace-nowrap ">
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`flex justify-start md:hidden fixed w-full right-0 bg-opacity-70 bg-gradient-to-r from-[#0f4563] to-[#1c7bae] z-60 rounded-b-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-[-200%]"
        } ${scrolled ? "top-[50px]" : "top-[60px]"}`}
      >
        <div className="flex flex-col items-start py-4 px-5 w-full">
          {/* Map over navItems to create mobile navigation tabs */}
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

          {/* Request Demo Button in Mobile */}
          <a href="/contact" className="w-full" onClick={handleDemoClick}>
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

      {/* Table of Contents with Collapse/Expand Functionality */}
      <div
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
          <div className="bg-transparent rounded-l-lg overflow-hidden w-auto">
            <div className="flex justify-center">
              <ul className="space-y-2">
                {pageSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      title={section.name}
                      className={`flex justify-center items-center lg:w-14 lg:h-14 w-10 h-10 rounded-md transition-all duration-200 lg:text-xs text-[9px] hover:scale-105 group ${
                        activeSection === section.id
                          ? "bg-blue-100 text-[#0f4563] font-bold"
                          : "text-gray-700 hover:text-[#0f4563]"
                      }`}
                    >
                      <span className="hidden group-hover:inline">
                        {section.name}
                      </span>
                      <span className="group-hover:hidden">{section.name}</span>
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
