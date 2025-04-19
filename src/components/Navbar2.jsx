import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import smalllogo from "../assets/slogo.png";
import { CiMail } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Navigation items data structure
  const navItems = [
    {
      name: "Home",
      icon: <IoHomeOutline className="text-white text-xl mr-2" />,
      dropdownItems: [
        { label: "Home", sectionId: "home" },
        { label: "About", sectionId: "about" },
        { label: "Services", sectionId: "services" },
        { label: "Contact", sectionId: "contact" },
      ],
    },
    {
      name: "Solutions",
      icon: <FaRegLightbulb className="text-white text-xl mr-2" />,
      dropdownItems: [
        { label: "Our Story", sectionId: "story" },
        { label: "Our Vision", sectionId: "our-vision" },
        { label: "Contact", sectionId: "contact" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dropdown function
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

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
    // If you don't have actual routing yet, prevent default navigation
    e.preventDefault();
    // You can use window.location if you want to force navigation
    // window.location.href = '/request-demo';
    console.log("Navigate to request demo page");
  };

  return (
    <>
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
            {/* Map over navItems to create desktop navigation tabs */}
            {navItems.map((item, index) => (
              <div className="relative group" key={index}>
                <div
                  className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => toggleDropdown(item.name)}
                >
                  <div className="flex text-xl items-center">
                    <h1 className="text-white mx-1 font-bold whitespace-nowrap hover:text-blue-200 hover:border-b-2 hover:border-white">
                      {item.name}
                    </h1>
                    <IoIosArrowDown className="text-white" />
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-[65px] left-1/2 -translate-x-1/2 bg-blue-400 rounded-md shadow-3xl border-2 border-blue-900 w-[500px] h-fit z-50 transition-all duration-300 ease-in-out transform origin-top ${
                    activeDropdown === item.name
                      ? "opacity-100 scale-y-100"
                      : "opacity-0 scale-y-0"
                  }`}
                >
                  {/* Dropdown Pointer */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-blue-400 shadow-lg"></div>

                  {/* Map over dropdown items */}
                  {item.dropdownItems.map((dropdownItem, dropIndex) => (
                    <div
                      key={dropIndex}
                      className="flex flex-wrap text-white text-2xl p-5 hover:bg-blue-600 w-full rounded cursor-pointer justify-center items-center"
                      onClick={() => {
                        scrollToSection(dropdownItem.sectionId);
                        setActiveDropdown(null);
                      }}
                    >
                      {dropdownItem.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Request Demo Button */}
            <a href="/request-demo" onClick={handleDemoClick}>
              <div className="flex flex-col items-center cursor-pointer bg-blue-400 rounded-2xl xl:p-2 p-1 transition-all duration-300 hover:scale-110">
                <MdOutlinePreview
                  className={`text-white text-2xl mb-1 ${
                    scrolled ? "hidden" : "show"
                  }`}
                />
                <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap hover:text-blue-200">
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
            <div className="w-full" key={index}>
              <div
                className="flex items-center justify-between my-2 cursor-pointer"
                onClick={() => toggleDropdown(item.name)}
              >
                <div className="flex items-center">
                  {item.icon}
                  <h1 className="text-white text-lg font-bold whitespace-nowrap">
                    {item.name}
                  </h1>
                </div>
                <IoIosArrowDown className="text-white" />
              </div>

              {/* Mobile Dropdown */}
              <div
                className={`pl-8 ${
                  activeDropdown === item.name ? "block" : "hidden"
                }`}
              >
                {item.dropdownItems.map((dropdownItem, dropIndex) => (
                  <div
                    key={dropIndex}
                    className="text-white py-1 hover:translate-x-2 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      scrollToSection(dropdownItem.sectionId);
                      setIsOpen(false);
                    }}
                  >
                    {dropdownItem.label}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Request Demo Button in Mobile */}
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
    </>
  );
};

export default Navbar2;
