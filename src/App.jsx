import React, { useEffect, useState } from "react";
import Navbar2 from "./components/Navbar2";
import Main from "./components/Main";
import Navbar3 from "./components/Navbar3";
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
      <Navbar3 />
      <Main />

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
