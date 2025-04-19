import React from "react";
import mission from "../assets/mission.png";

const Mission = () => {
  return (
    <section
      id="mission"
      className="w-screen lg:h-screen h-full flex lg:flex-row flex-col bg-white py-2"
    >
      <div className="lg:w-1/2 w-full h-full relative">
        <img
          src={mission}
          alt="mission"
          className="w-full h-full object-cover relative z-10 md:rounded-l-none rounded-3xl"
        />
        <div className="absolute inset-0 bg-[#0f4563] opacity-70 mix-blend-multiply lg:rounded-l-none rounded-4xl z-20"></div>
      </div>
      <div className="flex flex-col justify-center items-center lg:w-1/2 w-full lg:h-full px-10 gap-7">
        <h1 className="title text-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl lg:mt-0 mt-10">
          Why Carol Matters
        </h1>

        <ul className="text text-xl sm:text-2xl md:text-3xl lg:text-2xl list-disc pl-5 lg:space-y-10 space-y-5 w-full marker:text-blue-500 pr-5">
          <li>Reduces burnout by handling repetitive documentation</li>
          <li>
            Improves patient safety by catching subtle patterns and changes
          </li>
          <li>
            Supports continuity of care across settings (hospital, home,
            virtual)
          </li>
          <li>Empowers clinicians to focus on patients—not paperwork</li>
        </ul>
        <p className="text text-xl sm:text-2xl md:text-3xl lg:text-2xl text-center lg:mt-10 mt-2 pr-5">
          {" "}
          At Carol, we believe in a digital healthcare world that empowers
          clinicians to deliver the highest quality care within each patient's
          unique bounds. Our innovations ensure personalized care, reduced
          biases, and improved outcomes — making healthcare smarter, safer, and
          equitable for all.
        </p>
      </div>
    </section>
  );
};

export default Mission;
