import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Contact from "./components/Contact";
import OurTech from "./components/OurTech";
import Footer from "./components/Footer";
import OurVision from "./components/OurVision";
import Future from "./components/Future";
import Problem from "./components/Problem";
import AnimatedComponent from "./components/AnimatedComponent";
import OurTech2 from "./components/OurTech2";
import End from "./components/End";
import Leader from "./components/Leader";
import Story from "./components/Story";
const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />
      <Homepage />
      <About />
      <OurTech2 />
      <End />
      {/* <Story /> */}
      <Contact />
      <Footer />

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 right-5 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-1000"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default App;
