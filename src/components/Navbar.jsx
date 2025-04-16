import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import smalllogo from "../assets/slogo.png";
import { CiMail } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <div
        className={`flex fixed top-0 z-70 w-[100%] justify-center items-center md:rounded-b-xl rounded-b-none bg-gradient-to-r from-[#0f4563] to-[#1c7bae] transition-all duration-300 ${
          scrolled ? "h-[60px]" : "h-[80px]"
        }`}
      >
        <div className="flex w-full p-2 justify-between">
          <div className="flex w-full h-full items-center lg:px-7 px-5">
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
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex w-full justify-evenly items-center gap-10">
            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => scrollToSection("home")}
            >
              <IoHomeOutline
                className={`text-white text-2xl mb-1 ${
                  scrolled ? "hidden" : "show"
                }`}
              />
              <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap group-hover:text-blue-200 hover:text-blue-200 hover:border-b-2 hover:border-white">
                Home
              </h1>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => scrollToSection("about")}
            >
              <CiCircleInfo
                className={`text-white text-2xl mb-1 ${
                  scrolled ? "hidden" : "show"
                }`}
              />
              <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap group-hover:text-blue-200 hover:text-blue-200 hover:border-b-2 hover:border-white">
                About
              </h1>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => scrollToSection("story")}
            >
              <RiBookLine
                className={`text-white text-2xl mb-1 ${
                  scrolled ? "hidden" : "show"
                }`}
              />
              <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap group-hover:text-blue-200 hover:text-blue-200 hover:border-b-2 hover:border-white">
                Our Story
              </h1>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => scrollToSection("our-vision")}
            >
              <FaRegLightbulb
                className={`text-white text-2xl mb-1 ${
                  scrolled ? "hidden" : "show"
                }`}
              />
              <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap group-hover:text-blue-200 hover:text-blue-200 hover:border-b-2 hover:border-white">
                Our Vision
              </h1>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => scrollToSection("contact")}
            >
              <CiMail
                className={`text-white text-2xl mb-1 ${
                  scrolled ? "hidden" : "show"
                }`}
              />
              <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap group-hover:text-blue-200 hover:text-blue-200 hover:border-b-2 hover:border-white">
                Contact
              </h1>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer bg-blue-400 rounded-2xl xl:p-2 p-1transition-all duration-300 hover:scale-110"
              onClick={() => scrollToSection("contact", "requestDemo")}
            >
              <MdOutlinePreview
                className={`text-white text-2xl mb-1 ${
                  scrolled ? "hidden" : "show"
                }`}
              />
              <h1 className="text-white xl:text-sm text-xs mx-1 font-bold whitespace-nowrap group-hover:text-blue-200 hover:text-blue-200 hover:border-b-2 hover:border-white">
                Request A Demo
              </h1>
            </div>
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
        <div className="flex flex-col items-start py-4 px-5 w-50">
          <div
            className="flex items-center my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
            onClick={() => scrollToSection("home")}
          >
            <IoHomeOutline className="text-white text-xl mr-2" />
            <h1 className="text-white text-lg font-bold whitespace-nowrap hover:text-blue-200">
              Home
            </h1>
          </div>
          <div
            className="flex items-center my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
            onClick={() => scrollToSection("about")}
          >
            <CiCircleInfo className="text-white text-xl mr-2" />
            <h1 className="text-white text-lg font-bold whitespace-nowrap hover:text-blue-200">
              About
            </h1>
          </div>
          <div
            className="flex items-center my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
            onClick={() => scrollToSection("our-story")}
          >
            <RiBookLine className="text-white text-xl mr-2" />
            <h1 className="text-white text-lg font-bold whitespace-nowrap hover:text-blue-200">
              Our Story
            </h1>
          </div>
          <div
            className="flex items-center my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
            onClick={() => scrollToSection("our-vision")}
          >
            <FaRegLightbulb className="text-white text-xl mr-2" />
            <h1 className="text-white text-lg font-bold whitespace-nowrap hover:text-blue-200">
              Our Vision
            </h1>
          </div>
          <div
            className="flex items-center my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
            onClick={() => scrollToSection("contact")}
          >
            <CiMail className="text-white text-xl mr-2" />
            <h1 className="text-white text-lg font-bold whitespace-nowrap hover:text-blue-200">
              Contact
            </h1>
          </div>
          <div
            className="flex items-center bg-blue-400 rounded-xl px-2 my-2 cursor-pointer transition-all duration-300 hover:translate-x-2"
            onClick={() => scrollToSection("contact", "requestDemo")}
          >
            <MdOutlinePreview className="text-white text-xl mr-2" />
            <h1 className="text-white text-lg font-bold whitespace-nowrap hover:text-gray-200">
              Request A Demo
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
