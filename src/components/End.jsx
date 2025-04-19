import React from "react";
import aboutGif from "../assets/aboutNew.gif";

const End = () => {
  return (
    <section
      id="end"
      className="flex w-full lg:flex-row flex-col items-center bg-white"
    >
      <div className="flex justify-center items-center lg:w-1/2 w-full lg:order-2 order-1">
        <div className="">
          <img
            src={aboutGif}
            alt="about animation"
            className="w-auto h-auto"
            loop={true}
            autoPlay={true}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 p-10 lg:w-1/2 w-full lg:items-start items-center justify-center lg:order-1 order-2">
        <h1 className="title  text-center">
          Carol: Transforming Healthcare 4.0
        </h1>
        <p className="text text-center">
          Carol is revolutionizing healthcare with AI-powered automation,
          voice-enabled intelligence, and real-time data integration. Our
          innovative system offers hands-free access, AI-driven documentation,
          and smart clinical decision support. Committed to reducing health
          disparities, Carol is building a fair and inclusive healthcare system
          for all
        </p>
      </div>
    </section>
  );
};

export default End;
