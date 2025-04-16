import React from "react";
import ParticleSphere from "./ParticleSphere";
import backgroundImage from "../assets/background2.jpg";
import Wheel from "./Wheel";
import Earth from "./Earth";

const Homepage = () => {
  const scrollToSection = (sectionId, params = {}) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // For the Request Demo button
      if (sectionId === "contact" && params.requestDemo) {
        // Use setTimeout to ensure the section is scrolled into view and rendered
        setTimeout(() => {
          // Directly select the checkbox and set it to checked
          const requestDemoCheckbox = document.getElementById("requestDemo");
          if (requestDemoCheckbox) {
            requestDemoCheckbox.checked = true;
          }
        }, 500); // Short delay to ensure DOM is ready
      }
    }
  };

  return (
    <section id="home" className="flex flex-col w-full min-h-screen">
      {/* Home Section */}
      <div
        className="flex lg:flex-row flex-col w-full h-full lg:p-0 p-5 justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex flex-col lg:w-1/2 w-full lg:h-screen px-5 items-center justify-center order-2 lg:order-1 ">
          <h1 className="title mb-2">A Care for All</h1>
          <p className="lg:text-xl text-lg text-gray-500 text-center lg:px-10 px-5">
            At Carol, we envision a healthcare metaverse — a fully digital
            ecosystem connecting patients, clinicians, hospitals, clinics, and
            remote settings through the novel integration of clinical world
            models. By pioneering healthcare 4.0, we strive to ensure every
            patient receives holistic, equitable, and personalized care.
          </p>
          <div className="flex gap-5 justify-center w-full">
            <button
              className="bg-blue-500 text-white border border-blue-700 hover:bg-blue-600 hover:border-blue-800 px-4 py-2 rounded-md mt-5"
              onClick={() => scrollToSection("contact", { requestDemo: true })}
            >
              Request Demo
            </button>
            <button
              className="bg-gray-50 text-blue-700 border border-blue-500 px-4 py-2 rounded-md mt-5"
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:w-[55%] w-full lg:h-[80%] items-center justify-center order-1 lg:order-2 mt-10">
          <Earth />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
